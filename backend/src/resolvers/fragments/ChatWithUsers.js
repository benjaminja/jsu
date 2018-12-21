module.exports = `
  fragment ChatWithUsers on Chat {
    __typename
    id
    slackId
    createdAt
    user {
      __typename
      id
      name
    }
    messages {
       __typename
      id
      text
      style
      createdAt
      user {
         __typename
        id
        name
        image
      }
    }
  }
`
