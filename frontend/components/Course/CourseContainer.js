import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { adopt } from 'react-adopt'
import User from '../User/User'
import Course from './Course'

const COURSE_QUERY = gql`
  query COURSE_QUERY($id: ID!) {
    course(id: $id) {
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
        section
        time
        createdAt
      }
    }
  }
`

const Composed = adopt({
  userQuery: ({ render }) => <User>{render}</User>,
  courseQuery: ({ render, id }) => (
    <Query query={COURSE_QUERY} variables={{ id }}>
      {render}
    </Query>
  )
})

export default class CourseContainer extends React.Component {
  render() {
    return (
      <Composed id={this.props.id}>
        {({ userQuery, courseQuery }) => {
          if (userQuery.loading || courseQuery.loading) return <p>Loading...</p>
          const user = userQuery.data.me
          const course = courseQuery.data.course
          return <Course user={user} course={course} />
        }}
      </Composed>
    )
  }
}
