const bcrypt = require('bcryptjs')
const { combineResolvers } = require('graphql-resolvers')
const signToken = require('../utils/signToken')
const createCookie = require('../utils/createCookie')
const validateSignup = require('../utils/validateSignup')
const lastDayOfMonth = require('../utils/lastDayOfMonth')
const stripe = require('../services/stripe')
const { isAuthenticated, isAdmin, isSubscribed } = require('../middleware/permissions')
const { createChannel, postMessage } = require('../services/slack')
const ChatWithUsers = require('./fragments/ChatWithUsers')

module.exports = {
  signup: async (_, args, ctx, info) => {
    // 1. Validate user inputs - name,pass,email
    validateSignup(args)
    // 2. Hash password before storing in db
    const hashedPassword = await bcrypt.hash(args.password, 10)
    // 3. Create channel in Slack for user convo
    const slackId = await createChannel(args.name)
    // 4. Create user and with chat
    const user = await ctx.prisma.createUser({
      name: args.name,
      email: args.email.toLowerCase(),
      password: hashedPassword,
      chat: { create: { slackId } }
    })
    // 5. Create jwt token
    const token = signToken(user.id)
    // 6. Put token into a cookie
    createCookie(ctx.res, token)
    // 7. Return User
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

  createCustomer: async (_, args, ctx, info) => {
    try {
      // 1. Create stripe customer
      const customer = await stripe.customers.create({
        email: ctx.user.email,
        source: args.source
      })
      // 2. Create monthly subscription, renews 1st of every month, prorated for this month
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ plan: process.env.STRIPE_PLAN }],
        billing_cycle_anchor: lastDayOfMonth(),
        prorate: true
      })
      // 3. Update user, save stripe id and turn their subscription on
      await ctx.prisma.updateUser({
        where: { id: ctx.userId },
        data: { stripeId: customer.id, isSubscribed: true }
      })
      // 4. Return success message
      return { success: true, message: 'User signed up for JSU!' }
    } catch (error) {
      // 5. If error throw
      throw new Error(error)
    }
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
  }
}
