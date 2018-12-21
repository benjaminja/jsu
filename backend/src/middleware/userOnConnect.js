const jwt = require('jsonwebtoken')
const { prisma } = require('../generated')
const UserWithChats = require('../resolvers/fragments/UserWithChats')

module.exports = async rawCookie => {
  const cookie = rawCookie.replace(`${process.env.COOKIE}=`, '')
  const { userId } = jwt.verify(cookie, process.env.JWT_SECRET)
  const user = await prisma.user({ id: userId }).$fragment(UserWithChats)
  return user
}
