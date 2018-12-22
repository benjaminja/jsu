import styled from 'styled-components'
import { NimblePicker } from 'emoji-mart'
import emojis from 'emoji-mart/data/google.json'
import Messages from './Messages'
import NoMessages from './NoMessages'

const ChatMiddle = styled.div`
  max-height: 367.5px;
  display: grid;
  align-items: flex-start;
  background: ${props => props.theme.offWhite};
  padding: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.secondary.dark};
  }
`

export default props => (
  <ChatMiddle>
    {props.messages.length ? (
      <Messages
        messages={props.messages}
        user={props.user}
        scrollRef={props.scrollRef}
        openImageModel={props.openImageModel}
      />
    ) : (
      <NoMessages user={props.user} />
    )}
    <NimblePicker
      set="google"
      data={emojis}
      title="JavaScript Universe"
      emoji="milky_way"
      color="#FAC400"
      emojiSize={18}
      showPreview={true}
      onSelect={props.handleEmojiSelect}
      style={{
        opacity: props.picker ? 1 : 0,
        zIndex: props.picker ? 10 : -1,
        position: 'absolute',
        bottom: '55px',
        right: '55px',
        fontFamily: 'Regular'
      }}
    />
  </ChatMiddle>
)
