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
        title
        summary
        description
        image
        difficulty
        price
        createdAt
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
