import styled from 'styled-components'

const ChatTop = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  background: ${props =>
    `linear-gradient(-45deg, ${props.theme.secondary.dark} 10%,${props.theme.secondary.main})`};
  color: ${props => props.theme.black};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 1px solid ${props => props.theme.secondary.dark};
  font-family: 'Display';
  .greeting {
    font-size: 2rem;
  }
`

export default props => (
  <ChatTop>
    <div className="greeting">🌌 JavaScript Universe</div>
  </ChatTop>
)
