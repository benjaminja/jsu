require('dotenv').config()
const axios = require('axios')
const bcrypt = require('bcryptjs')
const uuid = require('uuid/v1')
const logger = require('../src/utils/logger')

module.exports = async (videos, courses) => {
  const lists = []
  const relations = []
  const date = new Date().toISOString()

  const adminId = createRandomId()
  const admin = {
    _typeName: 'User',
    id: adminId,
    name: 'Admin',
    password: await bcrypt.hash('password', 10),
    email: 'admin@gmail.com',
    image:
      'https://lh4.googleusercontent.com/-9Q_OGPy0Reg/AAAAAAAAAAI/AAAAAAAAADw/_7zKKUkqOlQ/photo.jpg?sz=50',
    githubId: '',
    role: 'ADMIN',
    createdAt: date
  }

  const videoNodes = videos.map((r, i) => {
    const videoId = createRandomId()
    const node = {
      _typeName: 'Video',
      id: videoId,
      title: r[0],
      description: r[1],
      url: r[2],
      number: Number(r[3]),
      section: r[4],
      time: Number(r[5]),
      createdAt: date
    }
    return node
  })

  const courseNodes = courses.map((c, i) => {
    const courseId = createRandomId()
    const node = {
      _typeName: 'Course',
      id: courseId,
      title: c[0],
      description: c[1],
      summary: c[2],
      image: c[3],
      difficulty: c[5],
      price: Number(c[6]),
      createdAt: date
    }
    return node
  })

  courseNodes.forEach((c, i) => {
    const list = {
      _typeName: 'Course',
      id: c.id,
      tags: courses[i][4].split(',')
    }
    lists.push(list)
  })

  videoNodes.forEach((v, i) => {
    const courseId = courseNodes[Number(videos[i][6])].id
    const r1 = { _typeName: 'Course', id: courseId, fieldName: 'videos' }
    const r2 = { _typeName: 'Video', id: v.id, fieldName: 'course' }
    const rel = [r1, r2]
    relations.push(rel)
  })

  const nodes = [admin, ...courseNodes, ...videoNodes]
  const NODES = { valueType: 'nodes', values: nodes }
  const LISTS = { valueType: 'lists', values: lists }
  const RELATIONS = { valueType: 'relations', values: relations }

  try {
    await sendData(NODES)
    await sendData(LISTS)
    await sendData(RELATIONS)
  } catch (error) {
    logger.error(`🌋 ${error[0]}`)
  } finally {
    logger.info('🗃 Database seeded')
  }
}

async function sendData(data) {
  const res = await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PRISMA_TOKEN}`
    },
    url: `${process.env.PRISMA_ENDPOINT}/import`,
    data
  })
  console.log(res.data)
}

function createRandomId() {
  return uuid()
    .replace(/-/g, '')
    .slice(0, 10)
}
