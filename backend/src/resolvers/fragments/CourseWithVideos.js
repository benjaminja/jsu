module.exports = `
  fragment CourseWithVideos on Course {
    id
    title
    summary
    description
    image
    tags
    difficulty
    price
    createdAt
    videos {
      id
      title
      description
      url
      number
      time
      createdAt
    }
  }
`
