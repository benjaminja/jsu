import styled, { keyframes, css } from 'styled-components'
import totalTime from '../../lib/totalTime'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Time = styled.div`
  display: grid;
  grid-auto-rows: 1fr 1fr;
  justify-items: center;
  & > :first-child {
    align-self: flex-end;
    font-size: 3rem;
    line-height: 1;
    margin: 0;
    animation: ${spin} 60s linear infinite;
  }
  & > :last-child {
    align-self: center;
    font-size: 1.5rem;
    line-height: 1;
    margin: 0;
  }
`

export default ({ course }) => (
  <Time>
    <span>🕛</span>
    <span>{totalTime(course.videos)}</span>
  </Time>
)
