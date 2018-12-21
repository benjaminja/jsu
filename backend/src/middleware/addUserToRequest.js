const { prisma } = require('../generated')
const UserWithChats = require('../resolvers/fragments/UserWithChats')

module.exports = async (req, res, next) => {
  if (!req.userId) return next()
  const user = await prisma.user({ id: req.userId }).$fragment(UserWithChats)
  req.user = user
  next()
}
