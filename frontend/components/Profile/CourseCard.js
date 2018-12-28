import React from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import Action from './Action'
import Media from '../styles/Media'

const Card = styled.div`
  width: 15rem;
  display: grid;
  grid-template-rows: 7.5rem 1fr;
  ${Media.tablet`
    width: 34rem;
    grid-template-rows: 17rem 1fr;
  `}
  img {
    width: 15rem;
    height: 7.5rem;
    ${Media.tablet`
      width: 34rem
      height: 17rem;
    `}
  }
  .actions {
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-gap: 1rem;
    justify-items: center;
    background: ${props => props.theme.grey[0]};
    border: 1px solid ${props => props.theme.grey[1]};
    padding: 1rem;
    & > * {
      width: 85%;
      height: 3rem;
      overflow: hidden;
      display: grid;
      justify-items: center;
      font-size: 2rem;
      background: ${props => props.theme.secondary.main};
      border: 1px solid ${props => props.theme.secondary.dark};
      line-height: 1.5;
      cursor: pointer;
      user-select: none;
      &:active {
        box-shadow: ${props => props.theme.shadows[2]};
      }
    }
    .initial {
      width: 100%;
      height: 3rem;
      text-align: center;
      transition: all 0.5s;
    }
    .hover {
      width: 100%;
      height: 3rem;
      text-align: center;
      transition: all 0.5s;
    }
  }
  .display {
    height: 13rem;
    display: grid;
    grid-template-rows: 2fr 1fr;
    justify-items: center;
    align-items: center;
    text-align: center;
    background: ${props => props.theme.grey[0]};
    border: 1px solid ${props => props.theme.grey[1]};
    font-size: 1.75rem;
    padding: 0.5rem;
    ${Media.tablet`
      font-size: 2.5rem;
    `}
    & > :last-child {
      font-size: 1.5rem;
      ${Media.tablet`
      font-size: 1.75rem;
    `}
    }
  }
`

export default class CourseCard extends React.Component {
  state = {
    show0: false,
    show1: false,
    show2: false
  }

  onMouseOver = x => this.setState({ [`show${x}`]: true })

  onMouseOut = x => this.setState({ [`show${x}`]: false })

  renderCard = () => {
    const {
      props: { course, courses }
    } = this
    const ids = courses.map(c => c.id)
    if (ids.includes(course.id)) {
      return (
        <React.Fragment>
          <img src={course.image} />
          <div className="actions">
            <Action
              show={this.state.show0}
              icon="📼"
              label="Videos"
              transform="translateX(15rem)"
              onMouseOver={() => this.onMouseOver(0)}
              onMouseOut={() => this.onMouseOut(0)}
              onClick={() => Router.push({ pathname: '/course', query: { id: course.id } })}
            />
            <Action
              show={this.state.show1}
              icon="📂"
              label="Files"
              transform="translateX(-15rem)"
              onMouseOver={() => this.onMouseOver(1)}
              onMouseOut={() => this.onMouseOut(1)}
              onClick={() => {}}
            />
            <Action
              show={this.state.show2}
              icon="🧙‍"
              label="Help"
              transform="scale(0)"
              onMouseOver={() => this.onMouseOver(2)}
              onMouseOut={() => this.onMouseOut(2)}
              onClick={() => {}}
            />
          </div>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <img src={course.image} style={{ background: '#FFDA1F' }} />
          <div className="display">
            <span>{course.title}</span>
            <span>{course.message}</span>
          </div>
        </React.Fragment>
      )
    }
  }

  render() {
    return <Card>{this.renderCard()}</Card>
  }
}
