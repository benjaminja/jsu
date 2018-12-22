import React from 'react'
import styled from 'styled-components'
import { endOfMonth, format } from 'date-fns'
import media from './styles/Media'
import Subscribe from './Subscribe'

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

export default class Home extends React.Component {
  render() {
    return (
      <Container>
        <p className="title">🌌 JavaScript Universe</p>
      </Container>
    )
  }
}
