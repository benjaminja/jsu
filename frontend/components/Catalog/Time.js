import styled, { keyframes } from 'styled-components'
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
  grid-template-rows: 2fr 1fr;
  justify-items: center;
  background: ${props => props.theme.offWhite};
  color: ${props => props.theme.black};
  border: 1px solid ${props => props.theme.grey[1]};
  padding: 0.5rem;
  margin: 0.5rem;
  & > :first-child {
    align-self: center;
    font-size: 3rem;
    line-height: 1;
    margin: 0;
    animation: ${spin} 60s linear infinite;
  }
  & > :last-child {
    font-size: 1.75rem;
    line-height: 1;
    margin-top: 0.25rem;
  }
`

export default ({ course }) => (
  <Time>
    <span>🕛</span>
    <span>{totalTime(course.videos)}</span>
  </Time>
)
