const bcrypt = require('bcryptjs')
const { combineResolvers } = require('graphql-resolvers')
const md5 = require('md5')
const signToken = require('../utils/signToken')
const createCookie = require('../utils/createCookie')
const validateSignup = require('../utils/validateSignup')
const lastDayOfMonth = require('../utils/lastDayOfMonth')
const stripe = require('../services/stripe')
const { isAuthenticated, isAdmin } = require('../middleware/permissions')
const { createChannel, postMessage } = require('../services/slack')
const ChatWithUsers = require('./fragments/ChatWithUsers')
const { getSignedUrl } = require('../services/aws')
const logger = require('../utils/logger')

module.exports = {
  signup: async (_, args, ctx, info) => {
    // 1. Validate user inputs - name,pass,email
    validateSignup(args)
    // 2. Hash password before storing in db
    const hashedPassword = await bcrypt.hash(args.password, 10)
    // 3. Create channel in Slack for user convo
    const slackId = await createChannel(args.name)
    // 4. Check if user has registered Gravatar
    // Gravatar offers various placeholders using d=? or insert custom url
    const email = args.email.trim().toLowerCase()
    const hashedEmail = md5(email)
    const placeholder = bool =>
      bool
        ? encodeURIComponent(`https://api.adorable.io/avatars/64/${args.name}@adorable.png'`)
        : 'mp'
    const image = `https://www.gravatar.com/avatar/${hashedEmail}?d=${placeholder(false)}`

    // 5. Create user and with chat
    const user = await ctx.prisma.createUser({
      name: args.name,
      email,
      password: hashedPassword,
      image,
      chat: { create: { slackId } }
    })
    // 6. Create jwt token
    const token = signToken(user.id)
    // 7. Put token into a cookie
    createCookie(ctx.res, token)
    // 8. Return User
    return user
  },

  signin: async (_, args, ctx, info) => {
    const user = await ctx.prisma.user({ email: args.email.toLowerCase() })
    if (!user) throw new Error(`Error. No user for ${args.email}`)
    const isMatch = await bcrypt.compare(args.password, user.password)
    if (!isMatch) throw new Error('Error. Password does not match.')
    const token = signToken(user.id)
    createCookie(ctx.res, token)
    return user
  },

  signout: async (_, args, ctx, info) => {
    ctx.res.clearCookie(process.env.COOKIE)
    return { success: true, message: 'User signed out.' }
  },

  createChat: async (_, args, ctx, info) => {
    const chat = await ctx.prisma.createChat({
      user: { connect: { id: ctx.userId } }
    })
    return chat
  },

  createMessage: async (_, args, ctx, info) => {
    const message = await ctx.prisma.createMessage({
      text: args.text,
      style: args.style ? args.style : 'TEXT',
      chat: { connect: { id: args.id } },
      user: { connect: { id: ctx.userId } }
    })
    const chat = await ctx.prisma.chat({ id: args.id }).$fragment(ChatWithUsers)
    await postMessage(chat.slackId, args.text, args.style, ctx.user)
    return message
  },

  createPurchase: async (_, args, ctx, info) => {
    try {
      const course = await ctx.prisma.course({ id: args.id })
      const charge = await stripe.charges.create({
        amount: course.price,
        currency: 'usd',
        source: args.token,
        description: course.title,
        metadata: { user: ctx.userId, course: args.id }
      })
      await ctx.prisma.createPurchase({
        charge: charge.id,
        total: charge.amount,
        course: { connect: { id: args.id } },
        user: { connect: { id: ctx.userId } }
      })
      await ctx.prisma.updateUser({
        where: { id: ctx.userId },
        data: { courses: { connect: { id: args.id } } }
      })
      return {
        success: true,
        message: `${course.title} purchased successfully 👍`
      }
    } catch (error) {
      logger.error(`😈 Error: Mutation.createPurchase`, error)
      throw new Error('Error: Could not purchase Course')
    }
  },

  signS3: async (_, args, ctx, info) => {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: args.filename,
      Expires: 60,
      ContentType: args.filetype,
      ACL: 'public-read'
    }
    try {
      const requestUrl = await getSignedUrl('putObject', params)
      const fileUrl = `https://js-universe.s3.amazonaws.com/${args.filename}`
      return { requestUrl, fileUrl }
    } catch (error) {
      logger.error(error)
    }
  }
}
