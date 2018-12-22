import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import CourseCard from './CourseCard'

const COURSES_QUERY = gql`
  query COURSES_QUERY {
    courses {
      id
      title
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
  }
`

const Courses = styled.div`
  height: 90vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  justify-items: center;
  padding-top: 1rem;
  overflow-y: auto;
`

export default props => (
  <Query query={COURSES_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading</p>
      const courses = data.courses
      return (
        <Courses>
          {courses.map(c => (
            <CourseCard key={c.id} course={c} />
          ))}
        </Courses>
      )
    }}
  </Query>
)
