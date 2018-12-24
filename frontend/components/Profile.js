import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import Signout from './Signout'
import User from './User/User'

const Container = styled.div`
  height: 90vh;
  padding: 1rem;
  .courses {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .card {
    width: 15rem;
    height: 7.5rem;
    display: grid;
    grid-template-rows: 1fr 1fr;
    img {
      width: 15rem;
      height: 7.5rem;
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
  }
`

export default class Profile extends React.Component {
  state = {}

  onMouseOver = x => this.setState({ [`show-${x}`]: true })

  onMouseOut = x => this.setState({ [`show-${x}`]: false })

  render() {
    return (
      <User>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>
          const user = data.me
          if (!user) return null
          return (
            <Container>
              <Signout />
              <div className="courses">
                {user.courses.map((course, i) => (
                  <div key={course.id} className="card">
                    <img src={course.image} />
                    <div className="actions">
                      <div
                        onMouseOver={() => this.onMouseOver(`${i}-0`)}
                        onMouseOut={() => this.onMouseOut(`${i}-0`)}
                        onClick={() =>
                          Router.push({ pathname: '/course', query: { id: course.id } })
                        }
                      >
                        <span
                          className="initial"
                          style={{
                            transform: `${this.state[`show-${i}-0`] ? 'translateX(7rem)' : 'none'}`
                          }}
                        >
                          📼
                        </span>
                        <span
                          className="hover"
                          style={{
                            transform: `${this.state[`show-${i}-0`] ? 'translateY(-3rem)' : 'none'}`
                          }}
                        >
                          Videos
                        </span>
                      </div>
                      <div
                        onMouseOver={() => this.onMouseOver(`${i}-1`)}
                        onMouseOut={() => this.onMouseOut(`${i}-1`)}
                      >
                        <span
                          className="initial"
                          style={{
                            transform: `${this.state[`show-${i}-1`] ? 'translateX(-7rem)' : 'none'}`
                          }}
                        >
                          📂
                        </span>
                        <span
                          className="hover"
                          style={{
                            transform: `${this.state[`show-${i}-1`] ? 'translateY(-3rem)' : 'none'}`
                          }}
                        >
                          Files
                        </span>
                      </div>
                      <div
                        onMouseOver={() => this.onMouseOver(`${i}-2`)}
                        onMouseOut={() => this.onMouseOut(`${i}-2`)}
                      >
                        <span
                          className="initial"
                          style={{
                            transform: `${this.state[`show-${i}-2`] ? 'scale(0)' : 'none'}`
                          }}
                        >
                          🧙‍
                        </span>
                        <span
                          className="hover"
                          style={{
                            transform: `${this.state[`show-${i}-2`] ? 'translateY(-3rem)' : 'none'}`
                          }}
                        >
                          Help
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          )
        }}
      </User>
    )
  }
}
