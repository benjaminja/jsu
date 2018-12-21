require('dotenv').config()
const axios = require('axios')
const bcrypt = require('bcryptjs')
const uuid = require('uuid/v4')

const date = new Date().toISOString()
// create admin
const adminId = createRandomId()
const admin = {
  _typeName: 'User',
  id: adminId,
  name: 'Benjaminadk',
  email: 'benjaminadk@gmail.com',
  password: '',
  image:
    'https://lh4.googleusercontent.com/-9Q_OGPy0Reg/AAAAAAAAAAI/AAAAAAAAADw/_7zKKUkqOlQ/photo.jpg?sz=50',
  stripeId: '',
  githubId: '',
  isSubscribed: false,
  role: 'ADMIN',
  createdAt: date
}

// create user
const userId = createRandomId()
const user = {
  _typeName: 'User',
  id: userId,
  name: 'John',
  email: 'john@gmail.com',
  password: '',
  image: 'http://sharethingz.com/wp-content/uploads/2014/08/avatar.png',
  stripeId: '',
  githubId: '',
  isSubscribed: false,
  role: 'USER',
  createdAt: date
}

const chatId = createRandomId()
const chat = {
  id: chatId,
  createdAt: date
}

const course = {
  title: 'React Fullstack',
  description: `Build a person blog using React, Apollo & Markdown.  Your backend will be built with Node.js, Express and a Prisma database.  This course features the cutting edge of the JavaScript ecosystem. So don't fall behind the times, subscribe today and get access to this course plus much, much more.`,
  image: 'https://s3-us-west-1.amazonaws.com/js-universe/courses/react-fullstack.svg',
  difficulty: 'HARD'
}

const tags = ['react', 'apollo', 'graphql', 'markdown', 'node', 'express', 'prisma']

const adminList = {
  _typeName: 'User',
  id: adminId,
  messages: []
}

const userList = {
  _typeName: 'User',
  id: userId,
  messages: []
}

const chatList = {
  _typeName: 'Chat',
  id: chatId,
  messages: []
}

const lists = []
lists.push(adminList, userList, chatList)

module.exports = async () => {
  const password = await bcrypt.hash('password', 10)
  admin.password = password
  user.password = password

  const nodes = []
  nodes.push(admin, user, chat)

  const relations = []
  const r1 = { _typeName: 'User', id: userId, fieldName: 'chat' }
  const r2 = { _typeName: 'Chat', id: chatId, fieldName: 'user' }
  const a1 = [r1, r2]
  relations.push(a1)

  const NODES = { valueType: 'nodes', values: nodes }
  const LISTS = { valueType: 'lists', values: lists }
  const RELATIONS = { valueType: 'relations', values: relations }

  try {
    await sendData(NODES)
    await sendData(LISTS)
    await sendData(RELATIONS)
  } catch (error) {
    console.error('Error importing data to prisma: ', error)
  } finally {
    console.log('Prisma database seeded')
  }
}

async function sendData(data) {
  await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PRISMA_TOKEN}`
    },
    url: `${process.env.PRISMA_ENDPOINT}/import`,
    data
  })
}

function createRandomId() {
  return uuid()
    .replace(/-/g, '')
    .slice(0, 10)
}
