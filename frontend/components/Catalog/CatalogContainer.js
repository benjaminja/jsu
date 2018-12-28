import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { adopt } from 'react-adopt'
import gql from 'graphql-tag'
import { ChevronLeft, ChevronRight } from 'styled-icons/material'
import Catalog from './Catalog'
import User from '../User/User'
import Media from '../styles/Media'

const COURSES_QUERY = gql`
  query COURSES_QUERY {
    courses {
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

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: ${props => (props.showDetail ? '1fr 1fr' : '1fr')};
  justify-items: center;
  overflow-y: auto;
  padding: 1rem;
  transition: all 1s;
  ${Media.desktop`
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 5rem;
    padding: 0;
  `}
  .arrow-left {
    position: absolute;
    top: 50%;
    left: 0;
    background: transparent;
    border: 0;
    color: ${props => props.theme.black};
    outline: 0;
    cursor: pointer;
    ${Media.desktop`
      top: 0;
    `}
  }
  .arrow-right {
    position: absolute;
    top: 50%;
    right: 0;
    background: transparent;
    border: 0;
    color: ${props => props.theme.black};
    outline: 0;
    cursor: pointer;
    ${Media.desktop`
      top: 0;
    `}
  }
`

const Combined = adopt({
  userQuery: ({ render }) => <User>{render}</User>,
  coursesQuery: ({ render }) => <Query query={COURSES_QUERY}>{render}</Query>
})

export default class CourseContainer extends React.Component {
  state = {
    index: 0,
    showDetail: true,
    showVideos: true
  }

  toggleDetail = () => this.setState({ showDetail: !this.state.showDetail })

  toggleVideos = () => this.setState({ showVideos: !this.state.showVideos })

  handleIndex = next => {
    let total = 2
    let index = this.state.index
    if (next) {
      if (index === total - 1) {
        return this.setState({ index: 0, showDetail: false })
      } else {
        return this.setState({ index: index + 1, showDetail: false })
      }
    } else {
      if (index === 0) {
        return this.setState({ index: total - 1, showDetail: false })
      } else {
        return this.setState({ index: index - 1, showDetail: false })
      }
    }
  }

  render() {
    return (
      <Combined>
        {({ userQuery, coursesQuery }) => {
          if (userQuery.loading || coursesQuery.loading) return <p>Loading...</p>
          const user = userQuery.data.me
          const courses = coursesQuery.data.courses
          return (
            <Container showDetail={this.state.showDetail}>
              <Catalog
                user={user}
                courses={courses}
                index={this.state.index}
                showDetail={this.state.showDetail}
                showVideos={this.state.showVideos}
                toggleDetail={this.toggleDetail}
                toggleVideos={this.toggleVideos}
              />
              <button className="arrow-left" onClick={() => this.handleIndex(false)}>
                <ChevronLeft size={50} color="inherit" />
              </button>
              <button className="arrow-right" onClick={() => this.handleIndex(true)}>
                <ChevronRight size={50} color="inherit" />
              </button>
            </Container>
          )
        }}
      </Combined>
    )
  }
}
