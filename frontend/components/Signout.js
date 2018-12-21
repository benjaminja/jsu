import React from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { ME_QUERY } from './User'

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signout {
      message
    }
  }
`

const SignoutButton = styled.button`
  background: ${props => props.theme.secondary.main};
  border: none;
`

export default class Signout extends React.Component {
  handleSignout = async signout => {
    await signout()
    Router.push('/')
  }

  render() {
    return (
      <Mutation mutation={SIGNOUT_MUTATION} refetchQueries={[{ query: ME_QUERY }]}>
        {(signout, { loading, error }) => (
          <div>
            <SignoutButton onClick={() => this.handleSignout(signout)}>Sign Out</SignoutButton>
          </div>
        )}
      </Mutation>
    )
  }
}
