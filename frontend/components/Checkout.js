import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { adopt } from 'react-adopt'
import StripeCheckout from 'react-stripe-checkout'
import User, { ME_QUERY } from './User/User'

const CREATE_PURCHASE = gql`
  mutation CREATE_PURCHASE($id: ID!, $token: String!) {
    createPurchase(id: $id, token: $token) {
      success
      message
    }
  }
`

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  createPurchase: ({ render }) => (
    <Mutation mutation={CREATE_PURCHASE} refetchQueries={ME_QUERY}>
      {render}
    </Mutation>
  )
})

export default class Checkout extends React.Component {
  handleToken = async (res, createPurchase) => {
    const response = await createPurchase({
      variables: { token: res.id }
    })
    if (response.data.createPurchase.success) {
      alert(response.data.createPurchase.message)
    }
  }

  render() {
    return (
      <Composed>
        {({ user, createPurchase }) => {
          const me = user.data.me
          if (!me) return null
          return (
            <StripeCheckout
              amount={1000}
              currency="USD"
              name="JavaScript Universe"
              description="Course Title"
              stripeKey="pk_test_P7PboXILJ38t21Eq4S9rw0Uq"
              email={me.email}
              token={res => this.handleToken(res, createPurchase)}
            >
              {this.props.children}
            </StripeCheckout>
          )
        }}
      </Composed>
    )
  }
}
