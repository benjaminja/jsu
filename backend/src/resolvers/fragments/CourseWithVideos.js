module.exports = `
  fragment CourseWithVideos on Course {
    id
    title
    summary
    description
    image
    tags
    difficulty
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
