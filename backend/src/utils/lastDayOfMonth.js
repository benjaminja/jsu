const { endOfMonth } = require('date-fns')

module.exports = () => Math.round(endOfMonth(Date.now()).getTime() / 1000)
