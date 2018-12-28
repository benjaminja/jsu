import React from 'react'
import styled from 'styled-components'
import { Close, Assignment } from 'styled-icons/material'
import VideoRow from './VideoRow'
import iconButton from '../styles/iconButton'
import { grow } from './Docs'

const List = styled.div`
  position: relative;
  width: 35rem;
  max-height: 55rem;
  background: ${props => props.theme.grey[0]};
  border: 1px solid ${props => props.theme.grey[1]};
  color: ${props => props.theme.black};
  font-family: 'Text', Arial, Helvetica, sans-serif;
  padding: 0.5rem;
  margin-top: 3rem;
  overflow: hidden;
  animation: ${grow} 1s;
  .title {
    font-size: 2rem;
    text-align: center;
    margin: 0;
    margin-bottom: 0.5rem;
    background: ${props => props.theme.white};
    border: 1px solid ${props => props.theme.grey[1]};
    span {
      font-size: 1rem;
    }
  }
  .videos {
    max-height: 50rem;
    overflow: auto;
  }
  .actions {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    background: ${props => props.theme.grey[0]};
    button {
      ${props => iconButton(props)};
      &:hover {
        color: ${props => props.theme.secondary.dark};
      }
    }
  }
`

export default class VideoList extends React.Component {
  state = {
    selectedIndex: null
  }

  setSelectedIndex = selectedIndex => {
    if (selectedIndex === this.state.selectedIndex) {
      this.setState({ selectedIndex: null })
    } else {
      this.setState({ selectedIndex })
    }
  }

  render() {
    return (
      <List>
        <p className="title">
          Video Content 📼<span>(👆 to expand)</span>
        </p>
        <div className="videos">
          {this.props.videos.map((v, j) => (
            <VideoRow
              key={v.id}
              video={v}
              selected={this.state.selectedIndex === j}
              onClick={() => this.setSelectedIndex(j)}
            />
          ))}
          <div style={{ height: '4rem' }} />
        </div>
        <div className="actions">
          <button onClick={this.props.toggleVideos}>
            <Assignment size={20} color="inherit" />
          </button>
          <button onClick={this.props.toggleDetail}>
            <Close size={20} color="inherit" />
          </button>
        </div>
      </List>
    )
  }
}
