import React from 'react'
import styled, { keyframes } from 'styled-components'
import Title from './Title'
import Time from './Time'
import Purchase from './Purchase'
import Difficulty from './Difficulty'
import Tags from './Tags'
import Docs from './Docs'
import DocsButton from './DocsButton'
import VideoList from './VideoList'
import Media from '../styles/Media'

const slide = animate => {
  if (animate === 'left') {
    return keyframes`from {margin-left: -100vw} to{margin-left: 0vw}`
  } else if (animate === 'right') {
    return keyframes`from {margin-right: -100vw} to{margin-right: 0vw}`
  }
}

const Card = styled.div`
  max-height: 60rem;
  background: ${props => props.theme.grey[0]};
  border: 1px solid ${props => props.theme.grey[1]};
  transition: all 1s;
  margin-top: 3rem;
  animation: ${props => slide(props.animate)} 1s;
  img {
    width: 35rem;
    height: 17.5rem;
  }
  ${Media.desktop`
    margin-top: 8rem;
  `}
  .detail {
    display: grid;
    grid-template-columns: 3fr 1.25fr;
    padding: 0 0.5rem;
  }
`

export default class Catalog extends React.Component {
  state = {
    moneyFace: false
  }

  onMouseOver = () => this.setState({ moneyFace: true })

  onMouseOut = () => this.setState({ moneyFace: false })

  isOwned = id => {
    if (!this.props.user) return false
    const ids = this.props.user.courses.map(c => c.id)
    return ids.includes(id)
  }

  render() {
    const { index, animate, courses, showDetail } = this.props
    return (
      <React.Fragment>
        {courses.map((course, i) => {
          if (index === i) {
            return (
              <Card key={course.id} animate={animate}>
                <img src={course.image} />
                <div className="detail">
                  <Title course={course} />
                  <Time course={course} />
                </div>
                <Purchase
                  isOwned={this.isOwned(course.id)}
                  course={course}
                  moneyFace={this.state.moneyFace}
                  onMouseOver={this.onMouseOver}
                  onMouseOut={this.onMouseOut}
                />
                <DocsButton showDetail={showDetail} toggleDetail={this.props.toggleDetail} />
                <Difficulty difficulty={course.difficulty} />
                <Tags tags={course.tags} />
              </Card>
            )
          } else return null
        })}
        {this.props.showDetail
          ? this.props.courses.map((c, i) => {
              if (index === i) {
                if (this.props.showVideos) {
                  return (
                    <VideoList
                      key={c.id}
                      videos={c.videos}
                      toggleDetail={this.props.toggleDetail}
                      toggleVideos={this.props.toggleVideos}
                    />
                  )
                } else {
                  return (
                    <Docs
                      key={c.id}
                      description={c.description}
                      index={index}
                      toggleVideos={this.props.toggleVideos}
                      toggleDetail={this.props.toggleDetail}
                    />
                  )
                }
              } else {
                return null
              }
            })
          : null}
      </React.Fragment>
    )
  }
}
