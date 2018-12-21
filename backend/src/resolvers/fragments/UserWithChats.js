module.exports = `
  fragment UserWithChats on User {
      id
      name
      email
      image
      role
      stripeId
      isSubscribed
      createdAt
      chat {
        id
        messages {
          id 
          text
          createdAt
          user {
            id
          }
        }
      }
    }
`
