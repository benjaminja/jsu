import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Send, InsertEmoticon, AttachFile, Code } from 'styled-icons/material'
import Textarea from 'react-autosize-textarea'
import iconButton from '../styles/iconButton'

const MESSAGE_MUTATION = gql`
  mutation MESSAGE_MUTATION($id: ID!, $text: String!, $style: Style) {
    createMessage(id: $id, text: $text, style: $style) {
      id
    }
  }
`

const SIGN_S3_MUTATION = gql`
  mutation SIGN_S3_MUTATION($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      requestUrl
      fileUrl
    }
  }
`

const ChatBottom = styled.div`
  display: grid;
  grid-template-columns: ${props => (props.text ? '3fr 1fr' : '2fr 1fr')};
  border-top: 1px solid ${props => props.theme.grey[2]};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background: ${props => props.theme.white};
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
    background: white;
    label {
      align-self: center;
      justify-self: center;
      color: ${props => props.theme.grey[4]};
      &:hover {
        color: ${props => props.theme.secondary.dark};
      }
      input[type='file'] {
        display: none;
      }
    }
  }
  .actions-text {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-right: 1rem;
  }
`

export default props => (
  <Mutation mutation={MESSAGE_MUTATION}>
    {(createMessage, { loading, error }) => (
      <ChatBottom text={props.text}>
        <Textarea
          innerRef={props.textareaRef}
          name="text"
          maxRows={8}
          minrows={1}
          rows={1}
          placeholder="Send JSU a message..."
          value={props.text}
          onChange={props.handleChange}
          onKeyDown={e => props.handleKeyDown(e, createMessage)}
          autoFocus
        />
        {props.text ? (
          <div className="actions-text">
            <button onClick={props.toggleEmoji}>
              <InsertEmoticon size={20} color="inherit" />
            </button>
            <button onClick={() => props.handleCreateMessage(createMessage)}>
              <Send size={20} color="inherit" />
            </button>
          </div>
        ) : (
          <div className="actions-no-text">
            <button onClick={props.openCodeModal}>
              <Code size={20} color="inherit" />
            </button>
            <button onClick={props.toggleEmoji}>
              <InsertEmoticon size={20} color="inherit" />
            </button>
            <Mutation mutation={SIGN_S3_MUTATION}>
              {(signS3, { loading, error }) => (
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={e => props.handleFile(e, signS3, createMessage)}
                  />
                  <AttachFile size={20} color="inherit" />
                </label>
              )}
            </Mutation>
          </div>
        )}
      </ChatBottom>
    )}
  </Mutation>
)
