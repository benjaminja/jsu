const { prisma } = require('../generated')

module.exports = async (req, res) => {
  try {
    const { channel, text } = req.body
    await prisma.createMessage({
      text,
      chat: { connect: { slackId: channel } },
      user: { connect: { id: process.env.ADMIN_ID } }
    })
    res.sendStatus(200)
  } catch (error) {}
}
