import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import User, { ME_QUERY } from './User'
import UserButton from './UserButton'

const Bar = styled.header`
  .bar {
    position: fixed;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    z-index: 2;
    background: ${props => props.theme.primary.main};
  }
`

const Logo = styled.div`
  width: 60px;
  height: 60px;
  margin-left: 2rem;
  cursor: pointer;
`

export default class Header extends React.Component {
  render() {
    return (
      <User>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>
          const user = data.me
          return (
            <Bar>
              <div className="bar">
                <Logo>
                  <Link href="/">
                    <a>Logo</a>
                  </Link>
                </Logo>
                <UserButton user={user} />
              </div>
            </Bar>
          )
        }}
      </User>
    )
  }
}
