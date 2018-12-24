import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: space-between;
  background: ${props => props.theme.offWhite};
  color: ${props => props.theme.black};
  border-bottom: 1px solid ${props => props.theme.grey[1]};
  font-family: 'Display', Arial, Helvetica, sans-serif;
  .title {
    font-size: 2.5rem;
    padding: 1rem;
    margin: 0;
    line-height: 1;
    justify-self: start;
  }
  a {
    font-size: 2rem;
    justify-self: end;
    margin-right: 2rem;
  }
`

export default props => (
  <Container>
    <Link href="/">
      <a className="title">🌌 JavaScript Universe</a>
    </Link>
    <Link href="/catalog">
      <a>Catalog 🐱‍🚀</a>
    </Link>
  </Container>
)
