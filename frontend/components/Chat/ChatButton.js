import styled from 'styled-components'
import { darken } from 'polished'
import Media from '../styles/Media'

const ChatButton = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  z-index: 2;
  width: 6.5rem;
  height: 6.5rem;
  display: grid;
  justify-items: center;
  align-items: center;
  background: ${props => props.theme.secondary.dark};
  color: ${props => props.theme.black};
  border-radius: 50%;
  box-shadow: ${props => props.theme.shadows[10]};
  cursor: pointer;
  transition: all 0.25s, transform 0.5s;
  transform: rotate(${props => (props.open ? '45deg' : '0')});
  &:hover {
    background: ${props => darken(0.05, props.theme.secondary.dark)};
  }
  ${Media.desktop`
    display: none;
  `}
  & > * {
    height: 100%;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    font-size: ${props => (props.open ? '2rem' : '2.5rem')};
    margin-top: 0.5rem;
  }
`

export default props => (
  <ChatButton open={props.open} onClick={props.onClick}>
    {props.open ? <span>➕</span> : <span>🦜</span>}
  </ChatButton>
)
