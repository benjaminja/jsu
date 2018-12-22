import styled from 'styled-components'
import Link from 'next/link'
import Router from 'next/router'
import { darken } from 'polished'
import User from './User'

const Avatar = styled.div`
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 50%;
  font-size: 2.5rem;
  background: ${props => props.theme.black};
  color: ${props => props.theme.grey[0]};
  overflow: hidden;
  cursor: pointer;
  img {
    width: 6.5rem;
    height: 6.5rem;
    border-radius: 50%;
  }
  span {
    height: 100%;
    width: 100%;
    display: grid;
    justify-items: center;
    text-align: center;
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
              {user.image ? <img src={user.image} /> : <span>{user.name[0].toUpperCase()}</span>}
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
