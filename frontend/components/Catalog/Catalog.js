import React from 'react'
import styled from 'styled-components'
import Media from '../styles/Media'
import Title from './Title'
import Time from './Time'
import Purchase from './Purchase'
import Difficulty from './Difficulty'
import Tags from './Tags'
import Docs from './Docs'
import DocsButton from './DocsButton'
import VideoList from './VideoList'

const Card = styled.div`
  max-height: 60rem;
  background: ${props => props.theme.grey[0]};
  border: 1px solid ${props => props.theme.grey[1]};
  transition: all 1s;
  img {
    width: 35rem;
    height: 17.5rem;
  }
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

  render() {
    const { index, courses, showDetail } = this.props
    return (
      <React.Fragment>
        {courses.map((course, i) => {
          if (index === i) {
            return (
              <Card key={course.id}>
                <img src={course.image} />
                <div className="detail">
                  <Title course={course} />
                  <Time course={course} />
                </div>
                <Purchase
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
