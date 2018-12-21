module.exports = `
  fragment MessageWithUser on Message {
    id
    text
    createdAt
    __typename
    user {
      id
      name
      image
      __typename
    }
    chat {
      id
      __typename
    }
  }
`
