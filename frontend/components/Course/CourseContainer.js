import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { adopt } from 'react-adopt'
import styled from 'styled-components'
import { CloudDownload } from 'styled-icons/material'
import groupBy from 'lodash.groupby'
import User from '../User/User'
import formatTime from '../../lib/formatTime'

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

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
`

const VideoList = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(3rem, 1fr));
  .top {
    background: ${props => props.theme.black};
    color: ${props => props.theme.white};
    p {
      display: grid;
      grid-template-columns: 8rem 1fr;
      grid-gap: 0.75rem;
      font-size: 1.75rem;
      margin: 0;
      span {
        display: grid;
        grid-template-columns: auto auto;
        align-items: center;
        text-align: center;
        background: ${props => props.theme.primary.dark};
        color: white;
        .emoji {
          font-size: 1.5rem;
        }
        .label {
          font-size: 1.5rem;
        }
      }
    }
  }
`

const SectionHeader = styled.div`
  background: ${props => props.theme.black};
  color: ${props => props.theme.white};
  p {
    display: grid;
    grid-template-columns: 8rem 1fr;
    grid-gap: 0.75rem;
    font-size: 1.75rem;
    margin: 0;
    span {
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      text-align: center;
      background: ${props => props.theme.tertiary.dark};
      color: white;
      .emoji {
        font-size: 1.5rem;
      }
      .label {
        font-size: 1.5rem;
      }
    }
  }
`

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 1fr;
  background: ${props => props.theme.black};
  color: ${props => props.theme.white};
  justify-items: center;
`

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 1fr;
  border: 1px solid ${props => props.theme.grey[0]};
  border-bottom: 0;
`

export default class CourseContainer extends React.Component {
  state = {
    videoIndex: 0
  }
  render() {
    return (
      <Composed id={this.props.id}>
        {({ userQuery, courseQuery }) => {
          if (userQuery.loading || courseQuery.loading) return <p>Loading...</p>
          const user = userQuery.data.me
          const course = courseQuery.data.course
          const sections = Object.entries(groupBy(course.videos, 'section'))
          const video = course.videos[this.state.videoIndex]
          return (
            <Container>
              <div>Video Player</div>
              <VideoList>
                <div className="top">
                  <p>
                    <span>
                      <span className="emoji">📼</span>
                      <span className="label">Playing</span>
                    </span>
                    #{video.number} {video.title}
                  </p>
                </div>
                <Header>
                  <div>#</div>
                  <div>Title</div>
                  <div>Time</div>
                  <div>
                    <CloudDownload size={20} color="#FFFFFF" />
                  </div>
                </Header>
                {sections.map((s, i) => (
                  <div key={s[0]}>
                    <SectionHeader>
                      <p>
                        <span>
                          <span className="emoji">📦</span>
                          <span className="label">Section #{i + 1}</span>
                        </span>
                        {s[0]}
                      </p>
                    </SectionHeader>
                    {s[1].map((v, j) => (
                      <ListItem key={v.id}>
                        <div>{v.number}</div>
                        <div>{v.title}</div>
                        <div>{formatTime(v.time)}</div>
                        <div>
                          <CloudDownload size={20} color="#333333" />
                        </div>
                      </ListItem>
                    ))}
                  </div>
                ))}
              </VideoList>
            </Container>
          )
        }}
      </Composed>
    )
  }
}
