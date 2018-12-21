import React from 'react'
import styled from 'styled-components'
import { Chat as Chati, Add, Send, InsertEmoticon, AttachFile, Code } from 'styled-icons/material'
import { darken } from 'polished'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { formatDistance } from 'date-fns'
import Textarea from 'react-autosize-textarea'
import { NimblePicker } from 'emoji-mart'
import emojis from 'emoji-mart/data/google.json'
import Modal from '../App/Modal'
import CodeModal from './CodeModal'
import iconButton from '../styles/iconButton'

const MESSAGE_MUTATION = gql`
  mutation MESSAGE_MUTATION($id: ID!, $text: String!) {
    createMessage(id: $id, text: $text) {
      id
    }
  }
`

const iconStyles = () => `
  color: inherit;
  width: 20px;
  height: 20px;
`
const ChatIcon = styled(Chati)(iconStyles)
const AddIcon = styled(Add)(iconStyles)
const SendIcon = styled(Send)(iconStyles)
const EmojiIcon = styled(InsertEmoticon)(iconStyles)
const FileIcon = styled(AttachFile)(iconStyles)
const CodeIcon = styled(Code)(iconStyles)

const ChatButton = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  z-index: 2;
  width: 65px;
  height: 65px;
  display: grid;
  justify-items: center;
  align-items: center;
  background: ${props => props.theme.secondary.dark};
  color: ${props => props.theme.black};
  border-radius: 50%;
  box-shadow: ${props => props.theme.shadows[2]};
  cursor: pointer;
  transition: all 0.25s, transform 0.5s;
  transform: rotate(${props => (props.open ? '45deg' : '0')});
  &:hover {
    background: ${props => darken(0.025, props.theme.secondary.dark)};
  }
`

const ChatWindow = styled.div`
  position: absolute;
  bottom: 10rem;
  right: 10rem;
  z-index: 2;
  width: 350px;
  height: 450px;
  display: grid;
  grid-template-rows: 2fr 7fr 1fr;
  border-radius: 5px;
  opacity: ${props => (props.open ? 1 : 0)};
  box-shadow: ${props => props.theme.shadows[10]};
  transition: all 1s;
  .top {
    display: grid;
    align-items: center;
    justify-items: center;
    background: ${props =>
      `linear-gradient(-45deg, ${props.theme.secondary.dark} 10%,${props.theme.secondary.main})`};
    color: ${props => props.theme.black};
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-family: 'Regular';
    .greeting {
      font-size: 3rem;
    }
  }
  .middle {
    max-height: 315px;
    display: grid;
    align-items: flex-end;
    background: ${props => props.theme.offWhite};
    padding: 1rem;
    overflow-y: auto;
    ::-webkit-scrollbar-thumb {
      background: ${props => props.theme.secondary.dark};
    }
    .empty {
      padding: 0 1rem;
      text-align: center;
      font-size: 2rem;
      line-height: 1.5;
      margin: 0;
      background: ${props => props.theme.white};
      box-shadow: ${props => props.theme.shadows[1]};
    }
    .messages {
      display: grid;
      grid-gap: 15px;
      align-items: flex-end;
      .user,
      .admin {
        width: 66%;
        justify-self: flex-end;
        font-size: 1rem;
        font-family: 'Text', Arial, Helvetica, sans-serif;
        text-align: right;
        .meta {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-gap: 0.75rem;
          align-items: center;
          margin-bottom: 0.25rem;
          img {
            justify-self: flex-end;
            border-radius: 50%;
          }
          .details {
            justify-self: flex-end;
            display: grid;
            grid-template-rows: 1fr 1fr;
            line-height: 1.25;
            & > :last-child {
              color: ${props => props.theme.grey[4]};
            }
          }
        }
        .text {
          border-radius: 5px;
          font-size: 1.25rem;
          line-height: 1.5;
          text-align: justify;
          padding: 0.75rem 1rem;
          background: ${props => props.theme.black};
          color: ${props => props.theme.white};
          box-shadow: ${props => props.theme.shadows[0]};
        }
      }
      .admin {
        justify-self: flex-start;
        text-align: left;
        .meta {
          grid-template-columns: auto 1fr;
          .details {
            justify-self: flex-start;
          }
        }
        .text {
          background: ${props => props.theme.grey[0]};
          color: ${props => props.theme.black};
        }
      }
    }
  }
  .bottom {
    display: grid;
    grid-template-columns: ${props => (props.text ? '3fr 1fr' : '2fr 1fr')};
    border-top: 1px solid ${props => props.theme.grey[2]};
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    textarea {
      min-height: 45px;
      max-height: 180px;
      font-family: 'Text', sans-serif;
      font-size: 1.35rem;
      color: ${props => props.theme.black};
      resize: none;
      border: 0;
      border-top: 0.5px solid ${props => props.theme.grey[2]};
      border-bottom-left-radius: 5px;
      outline: 0;
      padding: 15px;
      &::-webkit-scrollbar {
        width: 0;
      }
    }
    button {
      ${props => iconButton(props)}
      &:nth-child(2) {
        color: ${props => (props.text ? props.theme.secondary.dark : props.theme.grey[4])};
      }
      &:hover {
        color: ${props => props.theme.secondary.dark};
      }
    }
    .actions-no-text {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      margin-right: 1rem;
    }
    .actions-text {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-right: 1rem;
    }
  }
`

export default class Chat extends React.Component {
  state = {
    open: true,
    text: '',
    code: '',
    picker: false,
    showModal: true
  }

  scrollHelper = React.createRef()

  componentDidMount() {
    this.props.subscribeToNewMessages()
    this.scrollToBottom()
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.chat.messages.length !== prevProps.data.chat.messages.length) {
      this.scrollToBottom()
    }
  }

  scrollToBottom = () => {
    if (this.scrollHelper.current) {
      this.scrollHelper.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open }, () => {
      if (this.state.open) this.textarea.focus()
    })
  }

  toggleEmoji = () => {
    this.setState({ picker: !this.state.picker })
  }

  handleOpenModal = () => this.setState({ showModal: true })

  handleCloseModal = () => this.setState({ showModal: false })

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleEmojiSelect = emoji =>
    console.log(emoji) || this.setState({ text: `${this.state.text} ${emoji.native}` })

  handleKeyDown = async (e, createMessage) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault()
      const text = this.state.text
      const id = this.props.data.chat.id
      await createMessage({
        variables: { id, text }
      })
      this.setState({ text: '' })
    } else if (e.keyCode === 13 && e.shiftKey) {
      e.persist()
    }
  }

  handleCreateMessage = async createMessage => {
    const text = this.state.text
    const id = this.props.data.chat.id
    if (!text) return
    await createMessage({
      variables: { id, text }
    })
    this.setState({ text: '' })
  }

  handleCreateCodeMessage = async createMessage => {
    const text = this.state.code
    const id = this.props.data.chat.id
    if (!text) return
    await createMessage({
      variables: { id, text, style: 'CODE' }
    })
    this.setState({ code: '', showModal: false })
  }

  render() {
    const { data, loading, error } = this.props
    if (loading) return <p>Loading...</p>
    if (!data) return null
    const chat = data.chat
    if (!chat) return null
    const user = chat.user
    return (
      <React.Fragment>
        <Modal show={this.state.showModal}>
          <CodeModal
            value={this.state.code}
            onChange={this.handleChange}
            onClose={this.handleCloseModal}
            handleCreateCodeMessage={this.handleCreateCodeMessage}
          />
        </Modal>
        <ChatButton open={this.state.open} onClick={this.toggleOpen}>
          {this.state.open ? <AddIcon /> : <ChatIcon />}
        </ChatButton>
        <ChatWindow open={this.state.open} text={this.state.text ? 1 : 0}>
          <div className="top">
            <div className="greeting">👋 Hey {user.name}</div>
          </div>
          <div className="middle">
            {chat.messages.length ? (
              <div className="messages">
                {chat.messages.map(m => {
                  if (m.user.id === user.id) {
                    return (
                      <div key={m.id} className="user">
                        <div className="meta">
                          <div className="details">
                            <span>{m.user.name}</span>
                            <i>{formatDistance(m.createdAt, Date.now())} ago</i>
                          </div>
                          <img src={m.user.image} alt="user-avatar" width="25" />
                        </div>
                        {m.style === 'TEXT' ? (
                          <div className="text">{m.text}</div>
                        ) : m.style === 'CODE' ? (
                          <div>{m.text}</div>
                        ) : null}
                      </div>
                    )
                  } else {
                    return (
                      <div key={m.id} className="admin">
                        <div className="meta">
                          <img
                            src="https://s3-us-west-1.amazonaws.com/js-universe/assets/myAvatar.png"
                            alt="admin-avatar"
                            width="25"
                          />
                          <div className="details">
                            <span>benjaminadk</span>
                            <i>{formatDistance(m.createdAt, Date.now())} ago</i>
                          </div>
                        </div>
                        {m.style === 'TEXT' ? (
                          <div className="text">{m.text}</div>
                        ) : (
                          <div>CODE</div>
                        )}
                      </div>
                    )
                  }
                })}
                <span ref={this.scrollHelper} />
              </div>
            ) : (
              <div className="empty">
                <p>Ask a ❓ or dish out some feedback. I'd like to know whats on your 🧠</p>
              </div>
            )}
            <NimblePicker
              set="google"
              data={emojis}
              title="JavaScript Universe"
              emoji="milky_way"
              color="#FAC400"
              emojiSize={18}
              showPreview={true}
              onSelect={this.handleEmojiSelect}
              style={{
                opacity: this.state.picker ? 1 : 0,
                zIndex: this.state.picker ? 10 : -1,
                position: 'absolute',
                bottom: '50px',
                right: '30px',
                fontFamily: 'Regular'
              }}
            />
          </div>
          <Mutation mutation={MESSAGE_MUTATION}>
            {(createMessage, { loading, error }) => (
              <div className="bottom">
                <Textarea
                  innerRef={ref => (this.textarea = ref)}
                  name="text"
                  maxRows={8}
                  minrows={1}
                  rows={1}
                  placeholder="Send JSU a message..."
                  value={this.state.text}
                  onChange={this.handleChange}
                  onKeyDown={e => this.handleKeyDown(e, createMessage)}
                  autoFocus
                />
                {this.state.text ? (
                  <div className="actions-text">
                    <button onClick={this.toggleEmoji}>
                      <EmojiIcon />
                    </button>

                    <button onClick={() => this.handleCreateMessage(createMessage)}>
                      <SendIcon />
                    </button>
                  </div>
                ) : (
                  <div className="actions-no-text">
                    <button onClick={this.handleOpenModal}>
                      <CodeIcon />
                    </button>
                    <button onClick={this.toggleEmoji}>
                      <EmojiIcon />
                    </button>
                    <button>
                      <FileIcon />
                    </button>
                  </div>
                )}
              </div>
            )}
          </Mutation>
        </ChatWindow>
      </React.Fragment>
    )
  }
}
