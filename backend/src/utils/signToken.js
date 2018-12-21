module.exports = userId => require('jsonwebtoken').sign({ userId }, process.env.JWT_SECRET)
