import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import UserButton from '../User/UserButton'

const Container = styled.div`
  height: 45px;
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
  .catalog {
    font-size: 2rem;
    justify-self: end;
    margin-right: 2rem;
  }
  .right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`

export default props => (
  <Container>
    <Link href="/">
      <a className="title">🌌 JavaScript Universe</a>
    </Link>
    <div className="right">
      <Link href="/catalog">
        <a className="catalog">Catalog 🐱‍🚀</a>
      </Link>
      <UserButton />
    </div>
  </Container>
)
