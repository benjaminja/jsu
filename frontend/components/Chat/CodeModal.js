import React from 'react'
import styled from 'styled-components'
import { Send, Close } from 'styled-icons/material'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import iconButton from '../styles/iconButton'

const CREATE_CODE_MESSAGE = gql`
  mutation CREATE_CODE_MESSAGE($id: ID!, $text: String!, $style: Style) {
    createMessage(id: $id, text: $text, style: $style) {
      id
    }
  }
`

const iconStyles = () => `
  color: inherit;
  width: 20px;
  height: 20px;
`

const SendIcon = styled(Send)(iconStyles)
const CancelIcon = styled(Close)(iconStyles)

const CodeModalStyle = styled.div`
  z-index: 100;
  .title-bar {
    background: ${props => props.theme.secondary.dark};
    color: ${props => props.theme.black};
    text-align: center;
    font-family: 'Display';
    font-size: 2.5rem;
    padding: 0.5rem;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .content {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-gap: 1rem;
    justify-items: center;
    padding: 1rem;
    background: ${props => props.theme.offWhite};
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    textarea {
      width: 100%;
      resize: none;
      outline: 0;
      border: 0;
      border: 2px dashed ${props => props.theme.grey[1]};
      border-radius: 5px;
      font-family: monospace;
      font-size: 1.5rem;
      padding: 1rem;
    }
    .actions {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      .left {
        justify-self: flex-start;
        display: grid;
        grid-template-columns: repeat(3, auto);
        grid-gap: 1rem;
      }
      .right {
        justify-self: flex-end;
        button {
          ${props => iconButton(props)};
          &:nth-child(2) {
            color: ${props => (props.value ? props.theme.secondary.dark : props.theme.grey[4])};
          }
          &:hover {
            color: ${props => props.theme.secondary.dark};
          }
        }
      }
    }
  }
`

export default props => (
  <CodeModalStyle value={props.value}>
    <div className="title-bar">Code Snippet</div>
    <Mutation mutation={CREATE_CODE_MESSAGE}>
      {(createMessage, { loading, error }) => (
        <div className="content">
          <textarea
            name="code"
            value={props.value}
            placeholder={`const str = "hello world"`}
            onChange={props.onChange}
            rows={20}
            maxrows={20}
            autoFocus
            spellCheck={false}
          />
          <div className="actions">
            <div className="left">
              {['javascript', 'jsx', 'html'].map(el => (
                <div key={el}>
                  <input
                    type="radio"
                    id={el}
                    name="language"
                    value={el}
                    defaultChecked={props.language === el}
                    onClick={() => props.handleLanguage(el)}
                  />
                  <label htmlFor={el}>{el}</label>
                </div>
              ))}
            </div>
            <div className="right">
              <button onClick={props.onClose}>
                <CancelIcon />
              </button>
              <button onClick={() => props.handleCreateCodeMessage(createMessage)}>
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </Mutation>
  </CodeModalStyle>
)
