module.exports = `
  fragment UserWithChats on User {
      id
      name
      email
      image
      role
      createdAt
      courses {
        id
      }
      purchases {
        id
      }
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
