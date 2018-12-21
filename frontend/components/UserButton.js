import styled from 'styled-components'
import Link from 'next/link'
import Router from 'next/router'

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 2.5rem;
  margin-right: 2rem;
  background: ${props => props.theme.black};
  color: ${props => props.theme.grey[0]};
  overflow: hidden;
  cursor: pointer;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const UserButtonStyles = styled.div`
  a {
    background: ${props => props.theme.grey[2]};
    padding: 1rem 0;
  }
`

const UserButton = ({ user }) => (
  <UserButtonStyles>
    {user ? (
      <Avatar onClick={() => Router.push('/profile')}>
        {user.image ? (
          <img src={user.image} width="40" />
        ) : (
          <span>{user.name[0].toUpperCase()}</span>
        )}
      </Avatar>
    ) : (
      <Link href="/signup" prefetch>
        <a>Sign Up</a>
      </Link>
    )}
  </UserButtonStyles>
)

export default UserButton
