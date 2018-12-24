const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isAdmin } = require('../middleware/permissions')
const ChatWithUsers = require('./fragments/ChatWithUsers')
const CourseWithVideos = require('./fragments/CourseWithVideos')

module.exports = {
  me: async (_, args, ctx, info) => ctx.user,

  users: async (_, args, ctx, info) => await ctx.prisma.users(),

  course: combineResolvers(isAuthenticated, async (_, args, ctx, info) => {
    const ownsCourse = ctx.user.courses.find(course => course.id === args.id)
    if (!ownsCourse) {
      throw new Error('Not Authorized: Please purchase course to view this file.')
    } else {
      return await ctx.prisma.course({ id: args.id }).$fragment(CourseWithVideos)
    }
  }),

  courses: async (_, args, ctx, info) => await ctx.prisma.courses().$fragment(CourseWithVideos),

  chat: async (_, args, ctx, info) => {
    if (!ctx.userId) return null
    const chats = await ctx.prisma
      .chats({ where: { user: { id: ctx.userId } } })
      .$fragment(ChatWithUsers)
    return chats[0]
  }
}
