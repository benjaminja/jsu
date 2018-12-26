import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link'
import Router from 'next/router'
import { MarkGithub } from 'styled-icons/octicons'
import DisplayError from './App/Error'
import { ME_QUERY } from './User/User'
import { CHAT_QUERY } from './Chat/ChatContainer'
import Form from './styles/Form'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`

export default class Signin extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (e, signin) => {
    e.preventDefault()
    const { email, password } = this.state
    await signin({ variables: { email, password } })
    this.setState({ email: '', password: '' })
    Router.push('/')
  }

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        refetchQueries={[{ query: ME_QUERY }, { query: CHAT_QUERY }]}
      >
        {(signin, { loading, error }) => (
          <Form method="POST" onSubmit={e => this.handleSubmit(e, signin)}>
            <fieldset disabled={loading} aria-busy={loading}>
              <p>Sign In</p>
              <Link href="/signup">
                <a className="small">First time here? Sign Up.</a>
              </Link>

              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </label>

              <DisplayError error={error} />
              <button type="submit">Submit Form</button>
              <a className="github" href="http://localhost:5001/github/auth">
                <span>signupWith(</span>
                <span>
                  <MarkGithub
                    style={{ display: 'inline', margin: '0 .5rem' }}
                    size={30}
                    color="inherit"
                  />
                </span>
                <span>)</span>
              </a>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}
