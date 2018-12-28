import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Modal from '../App/Modal'
import CodeModal from './CodeModal'
import ImageModal from './ImageModal'
import ChatButton from './ChatButton'
import ChatTop from './ChatTop'
import ChatMiddle from './ChatMiddle'
import ChatBottom from './ChatBottom'
import formatFilename from '../../lib/formatFilename'
import Media from '../styles/Media'

const ChatWindow = styled.div`
  position: absolute;
  bottom: 10rem;
  right: 10rem;
  width: 400px;
  height: 525px;
  display: ${props => (props.open ? 'grid' : 'none')};
  grid-template-rows: 2fr 7fr 1fr;
  border-radius: 5px;
  box-shadow: ${props => props.theme.shadows[15]};
  transition: all 1s;
  ${Media.desktop`
    display: none;
  `}
`

export default class Chat extends React.Component {
  state = {
    open: false,
    text: '',
    code: '',
    language: 'javascript',
    picker: false,
    showCodeModal: false,
    showImageModal: false,
    image: null
  }

  scrollRef = React.createRef()

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
    if (this.scrollRef.current) {
      this.scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open }, () => {
      if (this.state.open) this.textareaRef.focus()
    })
  }

  toggleEmoji = () => {
    this.setState({ picker: !this.state.picker })
  }

  openCodeModal = () => this.setState({ showCodeModal: true })

  closeCodeModal = () => this.setState({ showCodeModal: false })

  openImageModal = image => this.setState({ showImageModal: true, image })

  closeImageModal = () => this.setState({ showImageModal: false, image: null })

  handleLanguage = language => this.setState({ language })

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleEmojiSelect = emoji => this.setState({ text: `${this.state.text} ${emoji.native}` })

  handleFile = async (e, signS3, createMessage) => {
    const id = this.props.data.chat.id
    const name = this.props.data.chat.user.name
    const file = e.target.files[0]
    const filename = formatFilename('chat', name, file.name)
    const res = await signS3({
      variables: { filename, filetype: file.type }
    })
    const { requestUrl, fileUrl } = res.data.signS3
    await axios({
      method: 'PUT',
      url: requestUrl,
      headers: {
        'Content-Type': file.type
      },
      data: file,
      onUploadProgress: async e => {
        const completed = Math.round((e.loaded * 100) / e.total)
        if (completed === 100) {
          await createMessage({
            variables: { id, text: fileUrl, style: 'IMAGE' }
          })
        }
      }
    })
  }

  handleKeyDown = async (e, createMessage) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault()
      const text = this.state.text
      const id = this.props.data.chat.id
      await createMessage({
        variables: { id, text, style: 'TEXT' }
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
      variables: { id, text, style: 'TEXT' }
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
    this.setState({ code: '', showCodeModal: false })
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
        <Modal show={this.state.showCodeModal}>
          <CodeModal
            value={this.state.code}
            language={this.state.language}
            onChange={this.handleChange}
            onClose={this.closeCodeModal}
            handleLanguage={this.handleLanguage}
            handleCreateCodeMessage={this.handleCreateCodeMessage}
          />
        </Modal>
        <Modal show={this.state.showImageModal}>
          <ImageModal image={this.state.image} onClose={this.closeImageModal} />
        </Modal>
        <ChatButton open={this.state.open} onClick={this.toggleOpen} />
        <ChatWindow open={this.state.open} text={this.state.text ? 1 : 0}>
          <ChatTop />
          <ChatMiddle
            messages={chat.messages}
            user={user}
            picker={this.state.picker}
            scrollRef={this.scrollRef}
            openImageModal={this.openImageModal}
            handleEmojiSelect={this.handleEmojiSelect}
          />
          <ChatBottom
            textareaRef={ref => (this.textareaRef = ref)}
            text={this.state.text}
            handleChange={this.handleChange}
            handleKeyDown={this.handleKeyDown}
            toggleEmoji={this.toggleEmoji}
            handleCreateMessage={this.handleCreateMessage}
            openCodeModal={this.openCodeModal}
            handleFile={this.handleFile}
          />
        </ChatWindow>
      </React.Fragment>
    )
  }
}
