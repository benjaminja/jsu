import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Chat from './Chat'

export const CHAT_QUERY = gql`
  query CHAT_QUERY {
    chat {
      __typename
      id
      slackId
      createdAt
      user {
        __typename
        id
        name
      }
      messages {
        __typename
        id
        text
        style
        createdAt
        user {
          __typename
          id
          name
          image
        }
      }
    }
  }
`

const CHAT_SUBSCRIPTION = gql`
  subscription CHAT_SUBSCRIPTION($id: ID!) {
    chat(id: $id) {
      __typename
      id
      slackId
      createdAt
      user {
        __typename
        id
        name
      }
      messages {
        __typename
        id
        text
        style
        createdAt
        user {
          __typename
          id
          name
          image
        }
      }
    }
  }
`

export default class ChatContainer extends React.Component {
  render() {
    return (
      <Query query={CHAT_QUERY}>
        {({ subscribeToMore, data, loading, ...rest }) => {
          if (loading) return null
          if (!data.chat) return null
          return (
            <Chat
              data={data}
              {...rest}
              subscribeToNewMessages={() =>
                subscribeToMore({
                  document: CHAT_SUBSCRIPTION,
                  variables: { id: data.chat.id },
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData) return prev
                    return subscriptionData.chat
                  }
                })
              }
            />
          )
        }}
      </Query>
    )
  }
}
