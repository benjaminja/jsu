import styled from 'styled-components'
import Link from 'next/link'
import Router from 'next/router'
import { darken } from 'polished'
import User from './User'

const Avatar = styled.div`
  width: 6.5rem;
  height: 6.5rem;
  display: grid;
  justify-items: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows[2]};
  img {
    width: 6.5rem;
    height: 6.5rem;
  }
  &:active {
    box-shadow: ${props => props.theme.shadows[4]};
  }
`

const UserButton = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 12rem;
  width: 6.5rem;
  height: 6.5rem;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 2rem;
  background: ${props => props.theme.primary.main};
  border-radius: 50%;
  box-shadow: ${props => props.theme.shadows[2]};
  &:hover {
    background: ${props => darken(0.05, props.theme.primary.main)};
  }
  &:focus {
    outline: none;
    box-shadow: ${props => props.theme.shadows[4]};
  }
  a {
    color: ${p => p.theme.offWhite};
  }
`

export default () => (
  <User>
    {({ data, loading, error }) => {
      if (loading) return null
      const user = data.me
      return (
        <UserButton>
          {user ? (
            <Avatar onClick={() => Router.push('/profile')}>
              <img src={user.image} />
            </Avatar>
          ) : (
            <Link href="/signup" prefetch>
              <a>Sign Up</a>
            </Link>
          )}
        </UserButton>
      )
    }}
  </User>
)
