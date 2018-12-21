const { prisma } = require('../generated')

module.exports = async (req, res) => {
  const { type, data } = req.body
  if (type === 'invoice.payment_failed') {
    const { amount_due, customer, hosted_invoice_url } = data.object
    const user = await prisma.users({ where: { stripeId: customer } })
    console.log({ user })
    res.status(200)
  }
}
