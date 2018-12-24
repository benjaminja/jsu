import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
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
    <Mutation mutation={CREATE_PURCHASE} refetchQueries={[{ query: ME_QUERY }]}>
      {render}
    </Mutation>
  )
})

export default class Checkout extends React.Component {
  handleToken = async (res, createPurchase, me) => {
    if (!me) {
      alert('Please sign up before you purchase a course. Thank You. 🙏')
      return Router.push('/signup')
    }
    const response = await createPurchase({
      variables: { id: this.props.courseId, token: res.id }
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
          return (
            <StripeCheckout
              amount={this.props.amount}
              currency="USD"
              name="JavaScript Universe"
              description={this.props.description}
              panelLabel="Invest"
              image="https://s3-us-west-1.amazonaws.com/jsu-resources/assets/logo.png"
              stripeKey="pk_test_P7PboXILJ38t21Eq4S9rw0Uq"
              email={me ? me.email : 'guest@jsu.com'}
              token={res => this.handleToken(res, createPurchase, me)}
            >
              {this.props.children}
            </StripeCheckout>
          )
        }}
      </Composed>
    )
  }
}
