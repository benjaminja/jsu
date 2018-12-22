import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  .title {
    font-family: 'Display', Arial, Helvetica, sans-serif;
    font-size: 3rem;
    padding: 1rem;
    margin: 0;
    line-height: 1;
    background: ${props => props.theme.offWhite};
    color: ${props => props.theme.black};
    border-bottom: 1px solid ${props => props.theme.grey[1]};
  }
`

export default props => (
  <Container>
    <p className="title">🌌 JavaScript Universe</p>
  </Container>
)
