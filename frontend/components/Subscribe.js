import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { adopt } from 'react-adopt'
import StripeCheckout from 'react-stripe-checkout'
import User, { ME_QUERY } from './User'

const CREATE_CUSTOMER_MUTATION = gql`
  mutation CREATE_CUSTOMER_MUTATION($source: String!) {
    createCustomer(source: $source) {
      message
    }
  }
`

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  createCustomer: ({ render }) => (
    <Mutation mutation={CREATE_CUSTOMER_MUTATION} refetchQueries={[{ query: ME_QUERY }]}>
      {render}
    </Mutation>
  )
})

export default class Subscribe extends React.Component {
  handleToken = async (res, createCustomer) => {
    const response = await createCustomer({ variables: { source: res.id } })
    if (response.data.createCustomer.success) {
      alert('User signed up!')
    }
  }

  render() {
    return (
      <Composed>
        {({ user, createCustomer }) => {
          const me = user.data.me
          if (!me) return null
          return (
            <StripeCheckout
              amount={999}
              currency="USD"
              name="JavaScript Universe"
              description="Monthly Subscription"
              stripeKey="pk_test_P7PboXILJ38t21Eq4S9rw0Uq"
              email={me.email}
              token={res => this.handleToken(res, createCustomer)}
            >
              {this.props.children}
            </StripeCheckout>
          )
        }}
      </Composed>
    )
  }
}
