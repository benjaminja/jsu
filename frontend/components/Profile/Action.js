import React from 'react'
import styled from 'styled-components'

const Action = styled.div`
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
`

export default ({ onMouseOver, onMouseOut, onClick, show, icon, transform, label }) => (
  <Action onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={onClick}>
    <span
      className="initial"
      style={{
        transform: `${show ? transform : 'none'}`
      }}
    >
      {icon}
    </span>
    <span
      className="hover"
      style={{
        transform: `${show ? 'translateY(-3rem)' : 'none'}`
      }}
    >
      {label}
    </span>
  </Action>
)
