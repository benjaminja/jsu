import styled from 'styled-components'
import Link from 'next/link'
import Router from 'next/router'
import { darken } from 'polished'
import User from './User'

const Avatar = styled.div`
  width: 4rem;
  height: 4rem;
  display: grid;
  justify-items: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  background: ${props => props.theme.black};
  img {
    width: 4rem;
    height: 4rem;
  }
`

const UserButton = styled.div`
  width: ${props => (props.user ? '4rem' : '6rem')};
  height: 4rem;
  display: grid;
  justify-items: center;
  align-items: center;
  background: ${props => (props.user ? 'transparent' : props.theme.primary.main)};
  border-radius: ${props => (props.user ? '50%' : '5px')};
  margin-right: 2rem;
  &:hover {
    background: ${props => (props.user ? 'transparent' : darken(0.05, props.theme.primary.main))};
  }
  &:focus {
    outline: none;
  }
  a {
    width: 6rem;
    color: ${p => p.theme.offWhite};
    font-size: 1.25rem;
    text-align: center;
  }
`

export default () => (
  <User>
    {({ data, loading, error }) => {
      if (loading) return null
      const user = data.me
      return (
        <UserButton user={data.me}>
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
