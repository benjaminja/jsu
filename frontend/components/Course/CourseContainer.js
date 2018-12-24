import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { adopt } from 'react-adopt'
import styled from 'styled-components'
import User from '../User/User'

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
        time
        createdAt
      }
    }
  }
`

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  course: ({ render, id }) => (
    <Query query={COURSE_QUERY} variables={{ id }}>
      {render}
    </Query>
  )
})

export default class CourseContainer extends React.Component {
  render() {
    return (
      <Composed id={this.props.id}>
        {({ user, course }) => {
          if (user.loading || course.loading) return <p>Loading...</p>
          const me = user.data.me
          const myCourse = course.data.course
          return (
            <div>
              <p>{me.name}</p>
              <p>{myCourse.title}</p>
            </div>
          )
        }}
      </Composed>
    )
  }
}
