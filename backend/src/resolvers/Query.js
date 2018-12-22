const ChatWithUsers = require('./fragments/ChatWithUsers')
const CourseWithVideos = require('./fragments/CourseWithVideos')

module.exports = {
  me: async (_, args, ctx, info) => ctx.user,
  users: async (_, args, ctx, info) => await ctx.prisma.users(),
  courses: async (_, args, ctx, info) => await ctx.prisma.courses().$fragment(CourseWithVideos),
  chat: async (_, args, ctx, info) => {
    if (!ctx.userId) return null
    const chats = await ctx.prisma
      .chats({ where: { user: { id: ctx.userId } } })
      .$fragment(ChatWithUsers)
    return chats[0]
  }
}
