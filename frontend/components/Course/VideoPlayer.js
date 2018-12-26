import React from 'react'
import styled from 'styled-components'
import { PlayArrow, Pause, Settings } from 'styled-icons/material'
import { ExpandArrowsAlt } from 'styled-icons/fa-solid'
import TimeSlider from './TimeSlider'
import Volume from './Volume'

const VideoWrapper = styled.div`
  width: 75vw;
  height: 42.5vw;
  position: relative;
  .controls {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 5vw;
    width: 75vw;
    display: grid;
    grid-template-columns: 1fr 11fr;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    opacity: ${props => (props.showControls ? 1 : 0)};
    padding: 1rem;
    button {
      justify-self: center;
      align-self: flex-end;
      width: 75%;
      height: 75%;
      border-radius: 5px;
      border: 0;
      outline: 0;
      background: ${props => props.theme.oBlack};
      color: ${props => props.theme.white};
      transition: all 0.25s;
      cursor: pointer;
      &:hover {
        background: ${props => props.theme.secondary.dark};
      }
    }
    .rest {
      align-self: flex-end;
      height: 50%;
      display: grid;
      grid-template-columns: 90% 1fr 1fr 1fr;
      border-radius: 3px;
      background: ${props => props.theme.oBlack};
      .settings,
      .fullscreen {
        height: 100%;
        width: 100%;
        justify-self: center;
        align-self: center;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${props => props.theme.white};
        &:hover {
          color: ${props => props.theme.secondary.dark};
        }
      }
    }
  }
`

const Video = styled.video`
  width: 100%;
  height: 100%;
`

export default ({
  videoRef,
  showControls,
  poster,
  isPlaying,
  duration,
  time,
  volume,
  onMouseOver,
  onMouseOut,
  onPlayOrPause,
  onTimeChange,
  onVolumeChange
}) => (
  <VideoWrapper showControls={showControls}>
    <Video ref={videoRef} poster={poster} />
    <div className="controls" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <button onClick={onPlayOrPause}>
        {isPlaying ? <Pause size={30} color="inherit" /> : <PlayArrow size={30} color="inherit" />}
      </button>
      <div className="rest">
        <TimeSlider duration={duration} time={time} onChange={onTimeChange} />
        <Volume volume={volume} onClick={onVolumeChange} />
        <div className="settings">
          <Settings size={15} color="inherit" />
        </div>
        <div className="fullscreen">
          <ExpandArrowsAlt size={13} color="inherit" />
        </div>
      </div>
    </div>
  </VideoWrapper>
)
