import React from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { ME_QUERY } from './User/User'
import { CHAT_QUERY } from './Chat/ChatContainer'

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signout {
      message
    }
  }
`

const SignoutButton = styled.button`
  width: 100px;
  font-size: 2rem;
  font-family: 'Regular', Arial, Helvetica, sans-serif;
  background: ${props => props.theme.secondary.main};
  border: 0;
  padding: 1rem;
  box-shadow: 3px 3px 0 ${props => props.theme.black};
  cursor: pointer;
`

export default class Signout extends React.Component {
  handleSignout = async signout => {
    await signout()
    Router.push('/')
  }

  render() {
    return (
      <Mutation
        mutation={SIGNOUT_MUTATION}
        refetchQueries={[{ query: ME_QUERY }, { query: CHAT_QUERY }]}
      >
        {(signout, { loading, error }) => (
          <div>
            <SignoutButton onClick={() => this.handleSignout(signout)}>Sign Out</SignoutButton>
          </div>
        )}
      </Mutation>
    )
  }
}
