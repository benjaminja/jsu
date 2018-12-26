import React from 'react'
import styled from 'styled-components'
import CourseCard from './CourseCard'

export const Row = styled.div`
  height: 50%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;
`

export const Header = styled.div`
  width: 15rem;
  height: 7.5rem;
  text-align: center;
  font-size: 3rem;
  padding: 1rem 2rem;
  color: ${props => props.theme.white};
  background: ${props => props.theme.black};
`

const COURSES = [
  {
    id: '2162ccc209',
    image: 'https://s3-us-west-1.amazonaws.com/jsu-resources/courses/full-stack-react/course-1.svg',
    title: 'Full Stack React'
  },
  { id: '', title: '⚡ Electron' },
  { id: '', title: '📱 React Native' }
]

export default class Courses extends React.Component {
  state = {}

  onMouseOver = x => this.setState({ [`show-${x}`]: true })

  onMouseOut = x => this.setState({ [`show-${x}`]: false })

  render() {
    const {
      props: { user }
    } = this
    return (
      <Row>
        <Header>Courses</Header>
        {COURSES.map((c, i) => (
          <CourseCard key={i} course={c} courses={user.courses} />
        ))}
      </Row>
    )
  }
}
