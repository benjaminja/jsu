import styled from 'styled-components'
import { Chat, Add } from 'styled-icons/material'
import { darken } from 'polished'

const ChatButton = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  z-index: 2;
  width: 65px;
  height: 65px;
  display: grid;
  justify-items: center;
  align-items: center;
  background: ${props => props.theme.secondary.dark};
  color: ${props => props.theme.white};
  border-radius: 50%;
  box-shadow: ${props => props.theme.shadows[2]};
  cursor: pointer;
  transition: all 0.25s, transform 0.5s;
  transform: rotate(${props => (props.open ? '45deg' : '0')});
  &:hover {
    background: ${props => darken(0.025, props.theme.secondary.dark)};
  }
`

export default props => (
  <ChatButton open={props.open} onClick={props.onClick}>
    {props.open ? <Add size={20} color="inherit" /> : <Chat size={20} color="inherit" />}
  </ChatButton>
)
