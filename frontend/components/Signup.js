import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link'
import debounce from 'lodash.debounce'
import Router from 'next/router'
import { MarkGithub } from 'styled-icons/octicons'
import analyzePwd from '../lib/analyzePwd'
import PwdQuality from './PwdQuality'
import DisplayError from './App/Error'
import { ME_QUERY } from './User/User'
import { CHAT_QUERY } from './Chat/ChatContainer'
import Form from './styles/Form'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      id
    }
  }
`

export default class Signup extends React.Component {
  state = {
    email: '',
    name: '',
    password: '',
    hide: true,
    pwd: 0
  }

  handleChange = e => {
    const { name, value } = e.target
    if (name === 'password') this.handlePassword(value)
    this.setState({ [name]: value })
  }

  handlePassword = debounce(value => {
    const pwd = analyzePwd(value)
    this.setState({ pwd })
  }, 500)

  handleHide = () => this.setState({ hide: !this.state.hide })

  handleSubmit = async (e, signup) => {
    e.preventDefault()
    const { email, name, password } = this.state
    await signup({ variables: { email, name, password } })
    this.setState({ email: '', name: '', password: '', hide: true, pwd: 0 })
    Router.push('/')
  }

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        refetchQueries={[{ query: ME_QUERY }, { query: CHAT_QUERY }]}
      >
        {(signup, { loading, error }) => (
          <Form method="POST" onSubmit={e => this.handleSubmit(e, signup)}>
            <fieldset disabled={loading} aria-busy={loading}>
              <p>Sign Up</p>
              <Link href="/signin">
                <a className="small">Have an account? Sign In.</a>
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

              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="password">
                Password
                <input
                  type={this.state.hide ? 'password' : 'text'}
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </label>
              <PwdQuality
                pwd={this.state.pwd}
                hide={this.state.hide}
                handleHide={this.handleHide}
              />
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
