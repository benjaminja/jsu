import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Error from '../App/Error'
import Media from '../styles/Media'

export const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($email: String, $name: String, $image: String) {
    updateUser(email: $email, name: $name, image: $image) {
      success
      message
    }
  }
`

export const Card = styled.div`
  width: 25rem;
  align-self: flex-end;
  ${Media.tablet`
    width: 34rem;
  `}
  .top {
    height: 5rem;
    display: grid;
    justify-items: center;
    align-items: center;
    font-size: 2rem;
    background: ${props => props.theme.offWhite};
    color: ${props => props.theme.black};
    border: 1px solid ${props => props.theme.grey[1]};
    border-bottom: 0;
  }
  .content {
    display: grid;
    grid-gap: 1rem;
    justify-items: center;
    background: ${props => props.theme.grey[0]};
    border: 1px solid ${props => props.theme.grey[1]};
    padding: 1rem;
    img {
      width: 40%;
      height: auto;
      cursor: pointer;
    }
    input {
      width: 100%;
      padding: 0.25rem 0.5rem;
      font-size: 2rem;
      font-family: 'Regular';
      &:focus {
        outline: 1px solid ${props => props.theme.secondary.main};
      }
    }
    input[type='file'] {
      display: none;
    }
    span {
      font-size: 1rem;
      line-height: 1;
    }
    .label {
      justify-self: flex-start;
      font-size: 1.25rem;
    }
    button {
      width: 100%;
      font-family: 'Regular';
      font-size: 3rem;
      margin-top: 1rem;
      padding: 1rem 0;
      border: 1px solid ${props => props.theme.secondary.dark};
      background: ${props => props.theme.secondary.main};
      cursor: pointer;
      transition: all 0.25s;
      &:focus {
        outline: none;
        box-shadow: ${props => props.theme.shadows[2]};
      }
    }
  }
`

export default ({ name, email, onChange, onUpdateEmail }) => (
  <Mutation mutation={UPDATE_USER_MUTATION}>
    {(updateUser, { loading, error }) => (
      <Card>
        <div className="top">Name & Email</div>
        <form className="content" method="POST" onSubmit={e => onUpdateEmail(e, updateUser)}>
          <span className="label">Name</span>
          <input type="text" name="name" defaultValue={name} onChange={onChange} />
          <span className="label">Email</span>
          <input type="email" name="email" defaultValue={email} onChange={onChange} />
          <Error error={error} />
          <button>Updat{loading ? 'ing' : 'e'}</button>
        </form>
      </Card>
    )}
  </Mutation>
)
