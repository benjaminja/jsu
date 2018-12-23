import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { ChevronLeft, ChevronRight } from 'styled-icons/material'
import Catalog from './Catalog'

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
  .arrow-left {
    position: absolute;
    top: 50%;
    left: 0;
    background: transparent;
    border: 0;
    color: ${props => props.theme.black};
    outline: 0;
    cursor: pointer;
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
  }
`

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
      <Query query={COURSES_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading</p>
          const courses = data.courses
          return (
            <Container showDetail={this.state.showDetail}>
              <Catalog
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
      </Query>
    )
  }
}
