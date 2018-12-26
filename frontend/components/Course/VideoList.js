import React from 'react'
import styled from 'styled-components'
import groupBy from 'lodash.groupby'
import { CloudDownload, VolumeUp } from 'styled-icons/material'
import formatTime from '../../lib/formatTime'

const List = styled.div`
  max-height: calc(100vh - 45px);
  overflow: auto;
  background: ${props => props.theme.white};
  display: grid;
  .top {
    background: ${props => props.theme.black};
    color: ${props => props.theme.white};
    p {
      display: grid;
      grid-template-columns: 8rem 1fr;
      grid-gap: 0.75rem;
      font-size: 1.75rem;
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
          font-size: 1.5rem;
        }
      }
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
    font-size: 1.75rem;
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
        font-size: 1.5rem;
      }
    }
  }
`

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 1fr;
  justify-items: center;
`

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 1fr;
  border: 1px solid ${props => props.theme.grey[0]};
  border-bottom: 0;
  & > :first-child {
    border-right: 3px solid
      ${props => (props.isWatched ? props.theme.tertiary.light : props.theme.grey[0])};
    font-size: 1.75rem;
    text-align: center;
  }
`

export default class VideoList extends React.Component {
  state = {
    sections: []
  }

  componentDidMount() {
    const sections = Object.entries(groupBy(this.props.course.videos, 'section'))
    this.setState({ sections })
  }

  render() {
    const {
      props: { course, videoIndex, setVideoIndex },
      state: { sections }
    } = this
    const video = course.videos[videoIndex]
    return (
      <List>
        <div className="top">
          <p>
            <span>
              <span className="emoji">📼</span>
              <span className="label">Playing</span>
            </span>
            #{video.number} {video.title}
          </p>
        </div>
        <Header>
          <div>#</div>
          <div>Title</div>
          <div>Time</div>
          <div>
            <CloudDownload size={20} color="#FFFFFF" />
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
              <ListItem key={v.id} isWatched={false}>
                <div onClick={() => setVideoIndex(v.number - 1)}>
                  {videoIndex + 1 === v.number ? <VolumeUp size={18} color="inherit" /> : v.number}
                </div>
                <div>{v.title}</div>
                <div>{formatTime(v.time)}</div>
                <div>
                  <CloudDownload size={20} color="#333333" />
                </div>
              </ListItem>
            ))}
          </div>
        ))}
      </List>
    )
  }
}
