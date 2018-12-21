import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Signout from './Signout'
import User from './User'

const CREATE_CHAT_MUTATION = gql`
  mutation CREATE_CHAT_MUTATION {
    createChat {
      id
    }
  }
`

const ProfileStyles = styled.div`
  .request-chat {
    display: grid;
    grid-template-rows: auto auto;
    button {
      width: 100px;
    }
  }
`

export default class Profile extends React.Component {
  handleCreateChat = async createChat => {
    const res = await createChat()
    Router.push({ pathname: '/chat', query: { id: res.data.createChat.id } })
  }

  getChats = user => {
    if (user.role === 'USER') {
      return user.chats_in
    } else if (user.role === 'ADMIN') {
      return user.chats_hosted
    }
  }

  render() {
    return (
      <User>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>
          const user = data.me
          if (!user) return null
          return (
            <Mutation mutation={CREATE_CHAT_MUTATION}>
              {(createChat, { loading, error }) => (
                <ProfileStyles>
                  <div className="request-chat">
                    <img src="https://avatars2.githubusercontent.com/u/28043421?s=80" width="80" />
                    <button onClick={() => this.handleCreateChat(createChat)}>Request Chat</button>
                    <h3>Chats</h3>
                    <div>
                      {this.getChats(user).map(chat => (
                        <Link key={chat.id} href={{ pathname: '/chat', query: { id: chat.id } }}>
                          <a>Chat with Mentor</a>
                        </Link>
                      ))}
                    </div>
                    <Signout />
                  </div>
                </ProfileStyles>
              )}
            </Mutation>
          )
        }}
      </User>
    )
  }
}
