import React from 'react'
import styled from 'styled-components'
import { Close } from 'styled-icons/material'

const ImageModalStyles = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  .close {
    position: absolute;
    top: 0;
    right: 0;
    background: transparent;
    border: 0;
    outline: 0;
  }
  img {
    width: 500px;
    padding: 0.5rem;
  }
`

export default props => (
  <ImageModalStyles>
    <button className="close" onClick={props.onClose}>
      <Close size={20} color="#333333" />
    </button>
    <img src={props.image} />
  </ImageModalStyles>
)
