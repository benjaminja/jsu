require('dotenv').config()
const http = require('http')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const logger = require('./utils/logger')
const passport = require('passport')
const { importSchema } = require('graphql-import')
const { prisma } = require('./generated')
const resolvers = require('./resolvers')
const cookieParser = require('cookie-parser')
const isUserLoggedIn = require('./middleware/isUserLoggedIn')
const addUserToRequest = require('./middleware/addUserToRequest')
const userOnConnect = require('./middleware/userOnConnect')
const stripeRouter = require('./routers/stripeRouter')
const slackRouter = require('./routers/slackRouter')
const { githubOAuth, githubScope, githubCallback, githubRedirect } = require('./services/passport')

const path = '/graphql'
const PORT = process.env.PORT
const cors = {
  origin: process.env.NODE_ENV !== 'production' ? process.env.FRONTEND_DEV : '',
  credentials: true
}

const app = express()
app.use(passport.initialize())
passport.use(githubOAuth)
app.get('/github/auth', githubScope)
app.get('/github/callback', githubCallback, githubRedirect)

app.post('/stripe', express.urlencoded({ extended: true, type: 'json' }), stripeRouter)

app.post('/slack', express.json(), slackRouter)

app.use('*', cookieParser(), isUserLoggedIn, addUserToRequest)

const server = new ApolloServer({
  typeDefs: importSchema('./src/schema.graphql'),
  resolvers,
  subscriptions: {
    onConnect: async (connectionParams, webSocket) => {
      const cookie = webSocket.upgradeReq.headers.cookie
      const user = await userOnConnect(cookie)
      return {
        user
      }
    }
  },
  context: ({ req, res, connection }) => {
    if (connection) {
      return connection.context
    } else {
      return {
        userId: req.userId,
        user: req.user,
        prisma,
        res
      }
    }
  }
})

server.applyMiddleware({ app, path, server, cors })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
  logger.info(`🚀  Server @ http://localhost:${PORT}${server.graphqlPath}`)
  logger.info(`🙈  Subscriptions @ ws://localhost:${PORT}${server.subscriptionsPath}`)
})
