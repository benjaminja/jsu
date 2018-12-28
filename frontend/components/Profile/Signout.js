import React from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { ME_QUERY } from '../User/User'
import { CHAT_QUERY } from '../Chat/ChatContainer'
import Media from '../styles/Media'

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signout {
      success
      message
    }
  }
`

const SignoutButton = styled.button`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  font-size: 3rem;
  font-family: 'Regular', Arial, Helvetica, sans-serif;
  background: ${props => props.theme.secondary.main};
  color: ${props => props.theme.black};
  border: 1px solid ${props => props.theme.secondary.dark};
  padding: 1rem;
  cursor: pointer;
  outline: 0;
  transition: all 0.25s;
  &:hover {
    box-shadow: ${props => props.theme.shadows[4]};
  }
  span {
    font-size: 1.5rem;
  }
  ${Media.phone`
    position: static;
    width: 100%;
    margin-bottom: 2rem;
  `}
`

export default class Signout extends React.Component {
  handleSignout = async signout => {
    const res = await signout()
    if (res.data.signout.success) {
      Router.push('/signout')
    }
  }

  render() {
    return (
      <Mutation
        mutation={SIGNOUT_MUTATION}
        refetchQueries={[{ query: ME_QUERY }, { query: CHAT_QUERY }]}
      >
        {(signout, { loading, error }) => (
          <SignoutButton onClick={() => this.handleSignout(signout)}>
            Sign Out <span>(clears your 🍪)</span>
          </SignoutButton>
        )}
      </Mutation>
    )
  }
}
