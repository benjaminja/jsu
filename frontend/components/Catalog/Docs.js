import styled from 'styled-components'
import { Close, Videocam } from 'styled-icons/material'
import iconButton from '../styles/iconButton'
import Prereqs from './Prereqs'
import PREREQUISITES from '../../lib/catalogDocs'

export const Detail = styled.div`
  position: relative;
  width: 35rem;
  max-height: 55rem;
  background: ${props => props.theme.grey[0]};
  border: 1px solid ${props => props.theme.grey[1]};
  color: ${props => props.theme.black};
  font-family: 'Text', Arial, Helvetica, sans-serif;
  padding: 0.5rem;
  overflow-y: auto;
  .title {
    font-size: 2rem;
    text-align: center;
    margin: 0;
    margin-bottom: 0.5rem;
    background: ${props => props.theme.white};
    border: 1px solid ${props => props.theme.grey[1]};
    &:first-child {
      margin-bottom: 0;
    }
  }
  .description {
    font-size: 1.25rem;
    text-align: justify;
    line-height: 1.5;
    margin: 0.5rem;
  }
  .disclaimer {
    font-size: 1.25rem;
    text-align: justify;
    line-height: 1.5;
    margin: 0;
    padding: 0 0.25rem;
    background: #ff949475;
  }
  .actions {
    position: absolute;
    bottom: 0;
    right: 0;
    button {
      ${props => iconButton(props)};
      &:hover {
        color: ${props => props.theme.secondary.dark};
      }
    }
  }
`

export default props => (
  <Detail>
    <p className="title">🚨 Disclaimer</p>
    <p className="disclaimer">{PREREQUISITES[props.index].disclaimer}</p>
    <p className="title">👩‍💻👨‍💻 The Developer is in the Details</p>
    <p className="description">{props.description}</p>
    <Prereqs index={props.index} />
    <div className="actions">
      <button onClick={props.toggleVideos}>
        <Videocam size={20} color="inherit" />
      </button>
      <button onClick={props.toggleDetail}>
        <Close size={20} color="inherit" />
      </button>
    </div>
  </Detail>
)
