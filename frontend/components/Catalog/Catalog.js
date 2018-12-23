import React from 'react'
import styled from 'styled-components'
import { Close } from 'styled-icons/material'
import Media from '../styles/Media'
import totalTime from '../../lib/totalTime'
import Prereqs from './Prereqs'

const Card = styled.div`
  background: ${props => props.theme.grey[0]};
  border: 1px solid ${props => props.theme.grey[1]};
  transition: all 1s;
  img {
    width: 350px;
    height: 175px;
  }
  .detail {
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 0 0.5rem;
  }
  .words {
    display: grid;
    align-items: center;
  }
  .title {
    text-align: justify;
    font-family: 'Regular', Arial, Helvetica, sans-serif;
    font-size: 4rem;
    margin: 0;
    line-height: 1;
    color: ${props => props.theme.black};
  }
  .summary {
    font-size: 2rem;
    margin: 0;
    color: ${props => props.theme.black};
  }
  .action {
    display: grid;
    justify-items: center;
    margin: 2rem auto;
    button {
      padding: 0.25rem 0.5rem;
      font-family: 'Regular', Arial, Helvetica, sans-serif;
      color: ${props => props.theme.black};
      background: ${props => props.theme.offWhite};
      border: 1px solid ${props => props.theme.grey[1]};
      cursor: pointer;
      outline: 0;
      &:hover {
        background: ${props => props.theme.white};
      }
    }
  }
  .time {
    display: grid;
    grid-auto-rows: 1fr 1fr;
    justify-items: center;
    & > :first-child {
      align-self: flex-end;
      font-size: 3rem;
      line-height: 1;
      margin: 0;
      transform: ${props => (props.flip ? 'rotate(180deg)' : 'rotate(-360deg)')};
      transition: all 2s;
    }
    & > :last-child {
      align-self: center;
      font-size: 1.5rem;
      line-height: 1;
      margin: 0;
    }
  }
  .learn {
    display: grid;
    grid-template-rows: auto auto auto;
    justify-items: center;
    margin: 0.5rem auto;
    .difficulty {
      font-size: 1.75rem;
      color: ${props => props.theme.black};
      background: ${props => props.theme.secondary.main};
      border: 1px solid ${props => props.theme.secondary.dark};
      padding: 0 0.5rem;
    }
    input {
      width: 75%;
    }
    .levels {
      width: 75%;
      display: flex;
      justify-content: space-between;
    }
  }
  .tags {
    width: 350px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1rem;
    padding: 1rem;
    .tag {
      text-align: center;
      color: ${props => props.theme.black};
      background: ${props => props.theme.secondary.main};
      font-size: 1.75rem;
      padding: 0 0.5rem;
      border: 1px solid ${props => props.theme.secondary.dark};
    }
  }
`

const Detail = styled.div`
  position: relative;
  width: 350px;
  background: ${props => props.theme.grey[0]};
  border: 1px solid ${props => props.theme.grey[1]};
  color: ${props => props.theme.black};
  font-family: 'Text', Arial, Helvetica, sans-serif;
  padding: 0.5rem;
  .title {
    font-size: 2rem;
    text-align: center;
    margin: 0;
    background: ${props => props.theme.white};
    border: 1px solid ${props => props.theme.grey[1]};
  }
  .description {
    font-size: 1.25rem;
    text-align: justify;
    line-height: 1.75;
    margin: 0.5rem;
  }
  .close {
    position: absolute;
    bottom: 0;
    right: 0;
    background: transparent;
    border: 0;
    cursor: pointer;
  }
`

export default class Catalog extends React.Component {
  state = {
    flip: false
  }

  componentDidMount() {
    this.flipper = setInterval(() => this.setState({ flip: !this.state.flip }), 20000)
  }

  componentWillUnmount() {
    clearInterval(this.flipper)
  }

  render() {
    const { index, courses, showDetail } = this.props
    return (
      <React.Fragment>
        {courses.map((course, i) => {
          if (index === i) {
            return (
              <Card key={course.id} flip={this.state.flip}>
                <img src={course.image} />
                <div className="detail">
                  <div className="words">
                    <p className="title">{course.title}</p>
                    <div className="summary">{course.summary}</div>
                  </div>
                  <div className="time">
                    <span>⌛</span>
                    <span>{totalTime(course.videos)}</span>
                  </div>
                </div>
                <div className="action">
                  <button onClick={this.props.toggleDetail}>
                    {showDetail ? '📖' : '📓'} Learn the knitty gritty about this tutorial
                  </button>
                </div>
                <div className="learn">
                  <span className="difficulty">Difficulty Level</span>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={1}
                    readOnly
                    defaultValue={
                      course.difficulty === 'BEGINNER'
                        ? 1
                        : course.difficulty === 'INTERMEDIATE'
                        ? 2
                        : 3
                    }
                  />
                  <div className="levels">
                    <span
                      style={{ fontSize: course.difficulty === 'BEGINNER' ? '2.5rem' : '1.25rem' }}
                    >
                      🐣
                    </span>
                    <span
                      style={{
                        fontSize: course.difficulty === 'INTERMEDIATE' ? '2.5rem' : '1.25rem'
                      }}
                    >
                      🎓
                    </span>
                    <span
                      style={{ fontSize: course.difficulty === 'ADVANCED' ? '2.5rem' : '1.25rem' }}
                    >
                      🧠‍
                    </span>
                  </div>
                </div>

                <div className="tags">
                  {course.tags.map(t => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            )
          } else return null
        })}
        {this.props.showDetail
          ? this.props.courses.map((c, i) => {
              if (index === i) {
                return (
                  <Detail key={c.id}>
                    <p className="title">👩‍💻👨‍💻 The Developer is in the Details</p>
                    <p className="description">{c.description}</p>
                    <p className="title">🕵️‍♀️Prerequisites</p>
                    <p className="description">
                      This is not a beginner's course, I want to be straight up about that. To
                      maximize the value of this course take a look at the crieria below to see if
                      this course is for you.
                    </p>
                    <Prereqs index={index} />
                    <button className="close">
                      <Close size={20} color="#333333" />
                    </button>
                  </Detail>
                )
              } else {
                return null
              }
            })
          : null}
      </React.Fragment>
    )
  }
}
