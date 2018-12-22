const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy
const { prisma } = require('../generated')
const uuid = require('uuid/v4')
const bcrypt = require('bcryptjs')
const createCookie = require('../utils/createCookie')
const signToken = require('../utils/signToken')
const { createChannel } = require('./slack')
const logger = require('../utils/logger')

let token
const frontend =
  process.env.NODE_ENV === 'development' ? process.env.FRONTEND_DEV : process.env.FRONTEND_PROD
const backend =
  process.env.NODE_ENV === 'development' ? process.env.BACKEND_DEV : process.env.BACKEND_PROD

const githubOAuth = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: `${backend}/github/callback`
  },
  async (accessToken, refreshToken, profile, cb) => {
    const githubId = profile.id
    try {
      const user = await prisma.user({ githubId })
      if (!user) {
        const name = profile.username ? profile.username : githubId
        const pwd = uuid()
          .slice(0, 10)
          .replace(/-/g, '')
        const hashed = await bcrypt.hash(pwd, 10)
        const slackId = await createChannel(name)
        const newUser = await prisma.createUser({
          githubId,
          name,
          email: profile.emails ? profile.emails[0].verified : '',
          image: profile.photos ? profile.photos[0].value : '',
          password: hashed,
          chat: { create: { slackId } }
        })
        token = signToken(newUser.id)
        logger.info(`👶 New user created from Github - ${newUser.id}`)
        return cb(null, {})
      } else {
        token = signToken(user.id)
        logger.info(`👤 User sign in with Github - ${user.id}`)
        return cb(null, {})
      }
    } catch (error) {}
  }
)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

const githubScope = passport.authenticate('github')

const githubCallback = passport.authenticate('github', { failureRedirect: `${frontend}/signup` })

const githubRedirect = (req, res) => {
  createCookie(res, token)
  res.redirect(frontend)
}

module.exports = {
  githubOAuth,
  githubScope,
  githubCallback,
  githubRedirect
}
