const { prisma } = require('../generated')
const MessageWithUser = require('./fragments/MessageWithUser')
const ChatWithUsers = require('./fragments/ChatWithUsers')

module.exports = {
  chat: {
    subscribe: async (_, args, ctx, info) => {
      return await prisma.$subscribe
        .message({
          mutation_in: ['CREATED'],
          node: { chat: { id: args.id } }
        })
        .node()
        .$fragment(MessageWithUser)
    },
    resolve: payload => {
      return prisma.chat({ id: payload.chat.id }).$fragment(ChatWithUsers)
    }
  }
}
