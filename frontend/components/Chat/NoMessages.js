import styled from 'styled-components'

const NoMessages = styled.div`
  padding: 0 1rem;
  text-align: center;
  font-size: 2rem;
  line-height: 1.5;
  margin: 0;
  background: ${props => props.theme.white};
  box-shadow: ${props => props.theme.shadows[1]};
`

export default props => (
  <NoMessages>
    <p>
      Hey {props.user.name}, ask a ❓ or dish out some feedback. I'd like to know whats on your 🧠
    </p>
  </NoMessages>
)
