const axios = require('axios')

const rootURL = 'https://slack.com/api/'
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.SLACK_TOKEN}`
}

const createChannel = async name => {
  const res = await axios({
    method: 'POST',
    url: `${rootURL}conversations.create`,
    headers,
    data: {
      name: name
        .toLowerCase()
        .replace(/\s/g, '-')
        .slice(0, 21)
    }
  })
  if (!res.data.ok) {
    throw new Error('Sorry. Name already taken!')
  } else {
    return res.data.channel.id
  }
}

const postMessage = async (channel, text, style, user) => {
  const formattedText = style === 'CODE' ? `\`\`\`${text}\`\`\`` : text
  const res = await axios({
    method: 'POST',
    url: `${rootURL}/chat.postMessage`,
    headers,
    data: {
      channel,
      text: formattedText,
      as_user: false,
      username: user.name,
      icon_url: user.image ? user.image : null
    }
  })
  return res.data
}

module.exports.createChannel = createChannel
module.exports.postMessage = postMessage
