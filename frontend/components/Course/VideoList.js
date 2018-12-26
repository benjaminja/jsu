import React from 'react'
import styled from 'styled-components'
import groupBy from 'lodash.groupby'
import { CloudDownload, VolumeUp, NavigateBefore, NavigateNext } from 'styled-icons/material'
import formatTime from '../../lib/formatTime'

const List = styled.div`
  max-height: calc(100vh - 45px);
  overflow: auto;
  background: ${props => props.theme.white};
  user-select: none;
  display: grid;
  .top {
    display: grid;
    grid-template-columns: 8fr 2fr;
    background: ${props => props.theme.black};
    color: ${props => props.theme.white};
    p {
      display: grid;
      grid-template-columns: 8rem 1fr;
      grid-gap: 0.75rem;
      font-size: 2rem;
      margin: 0;
      span {
        display: grid;
        grid-template-columns: auto auto;
        align-items: center;
        text-align: center;
        background: ${props => props.theme.primary.dark};
        color: white;
        .emoji {
          font-size: 1.5rem;
        }
        .label {
          font-size: 1.25rem;
        }
      }
    }
    & > :last-child {
      display: grid;
      justify-items: center;
      align-items: center;
      font-size: 1.75rem;
    }
  }
`

const SectionHeader = styled.div`
  background: ${props => props.theme.black};
  color: ${props => props.theme.white};
  p {
    display: grid;
    grid-template-columns: 8rem 1fr;
    grid-gap: 0.75rem;
    font-size: 2rem;
    margin: 0;
    span {
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      text-align: center;
      background: ${props => props.theme.tertiary.dark};
      color: white;
      .emoji {
        font-size: 1.5rem;
      }
      .label {
        font-size: 1.25rem;
      }
    }
  }
`

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  background: ${props => props.theme.white};
  color: ${props => props.theme.black};
  font-size: 1.75rem;
  border-top: 1px solid ${props => props.theme.grey[5]};
  border-bottom: 1px solid ${props => props.theme.grey[5]};
  cursor: pointer;
  & > :first-child {
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-items: center;
    align-items: center;
    border-right: 1px solid ${props => props.theme.grey[5]};
    transition: all 0.25s;
    &:hover {
      color: ${props => props.theme.primary.main};
    }
    & > :first-child {
      justify-self: flex-start;
    }
  }
  & > :last-child {
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 1fr auto;
    transition: all 0.25s;
    &:hover {
      color: ${props => props.theme.primary.main};
    }
    & > :last-child {
      justify-self: flex-end;
    }
  }
`

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr 1fr;
  border: 1px solid ${props => props.theme.grey[0]};
  border-bottom: 0;
  & > :first-child {
    color: ${props => props.theme.black};
    border-right: 3px solid
      ${props => (props.watched ? props.theme.tertiary.dark : props.theme.grey[0])};
    font-size: 2rem;
    text-align: center;
  }
  & > :nth-child(2) {
    color: ${props => props.theme.black};
    border-right: 1px solid ${props => props.theme.grey[0]};
    font-size: 2rem;
    margin-left: 1rem;
    cursor: pointer;
  }
  & > :nth-child(3) {
    display: grid;
    justify-items: center;
    align-items: center;
    border-right: 1px solid ${props => props.theme.grey[0]};
    span {
      background: ${props => props.theme.grey[0]};
      padding: 0 0.5rem;
      border-radius: 5px;
      color: ${props => props.theme.black};
    }
  }
  & > :nth-child(4) {
    display: grid;
    justify-items: center;
    align-items: center;
    cursor: pointer;
    color: ${props => props.theme.black};
    transition: all 0.25s;
    &:hover {
      color: ${props => props.theme.tertiary.dark};
    }
  }
`

export default class VideoList extends React.Component {
  state = {
    sections: [],
    watched: []
  }

  componentDidMount() {
    this.initSections()
    this.initWatched()
  }

  initSections = () => {
    let videos = this.props.course.videos
    const sections = Object.entries(groupBy(videos, 'section'))
    this.setState({ sections })
  }

  initWatched = () => {
    const watched = JSON.parse(localStorage.getItem('watched')) || []
    this.setState({ watched })
  }

  render() {
    const {
      props: { course, videoIndex, setVideoIndex },
      state: { sections, watched }
    } = this
    const video = course.videos[videoIndex]
    const prevVideo = videoIndex > 0 ? course.videos[videoIndex - 1] : null
    const nextVideo = videoIndex < course.videos.length - 1 ? course.videos[videoIndex + 1] : null
    return (
      <List>
        <div className="top">
          <p>
            <span>
              <span className="emoji">📼</span>
              <span className="label">Now Playing</span>
            </span>
            {video.title}
          </p>
          <div>
            {video.number} / {course.videos.length}
          </div>
        </div>
        <Header>
          <div onClick={() => setVideoIndex(videoIndex - 1)}>
            <span>
              <NavigateBefore size={40} color="inherit" />
            </span>
            <span>{prevVideo ? prevVideo.title : ''}</span>
          </div>
          <div onClick={() => setVideoIndex(videoIndex + 1)}>
            <span>{nextVideo ? nextVideo.title : ''}</span>
            <span>
              <NavigateNext size={40} color="inherit" />
            </span>
          </div>
        </Header>
        {sections.map((s, i) => (
          <div key={s[0]}>
            <SectionHeader>
              <p>
                <span>
                  <span className="emoji">📦</span>
                  <span className="label">Section #{i + 1}</span>
                </span>
                {s[0]}
              </p>
            </SectionHeader>
            {s[1].map((v, j) => (
              <ListItem key={v.id} watched={watched.includes(v.id)}>
                <div>
                  {videoIndex + 1 === v.number ? <VolumeUp size={18} color="inherit" /> : v.number}
                </div>
                <div onClick={() => setVideoIndex(v.number - 1)}>{v.title}</div>
                <div>
                  <span>{formatTime(v.time)}</span>
                </div>
                <div>
                  <CloudDownload size={20} color="inherit" />
                </div>
              </ListItem>
            ))}
          </div>
        ))}
      </List>
    )
  }
}
