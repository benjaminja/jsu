module.exports = (res, token) => {
  res.cookie(process.env.COOKIE, token, {
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 24 * 30
  })
}
