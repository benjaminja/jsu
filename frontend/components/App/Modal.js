import React from 'react'
import styled from 'styled-components'

const ModalWindow = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`

const ModalMain = styled.div`
  position: fixed;
  background: white;
  width: 50%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
`

export default ({ show, children }) => (
  <ModalWindow show={show}>
    <ModalMain>{children}</ModalMain>
  </ModalWindow>
)
