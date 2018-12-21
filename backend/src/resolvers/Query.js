const ChatWithUsers = require('./fragments/ChatWithUsers')
const MessageWithUser = require('./fragments/MessageWithUser')

module.exports = {
  me: async (_, args, ctx, info) => ctx.user,
  users: async (_, args, ctx, info) => await ctx.prisma.users(),
  courses: async (_, args, ctx, info) => await ctx.prisma.courses(),
  chat: async (_, args, ctx, info) => {
    if (!ctx.userId) return null
    const chats = await ctx.prisma
      .chats({ where: { user: { id: ctx.userId } } })
      .$fragment(ChatWithUsers)
    return chats[0]
  },
  messages: async (_, args, ctx, info) => {
    const messages = await ctx.prisma
      .messages({ where: { chat: { id: args.id } } })
      .$fragment(MessageWithUser)
    return messages
  }
}
