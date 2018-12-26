import React from 'react'
import styled from 'styled-components'
import {
  PlayArrow,
  Pause,
  Settings,
  PictureInPictureAlt,
  FastRewind,
  FastForward
} from 'styled-icons/material'
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
    background: linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.75));
    opacity: ${props => (props.showControls ? 1 : 0)};
    transition: all 0.25s;
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
      grid-template-columns: 85% 1fr 1fr 1fr 1fr;
      border-radius: 3px;
      background: ${props => props.theme.oBlack};
      .settings,
      .fullscreen,
      .pip {
        height: 100%;
        width: 100%;
        justify-self: center;
        align-self: center;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${props => props.theme.white};
        cursor: pointer;
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

const BottomControl = styled.div`
  height: 5rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
  background: ${props => props.theme.black};
  border-top: 1px solid ${props => props.theme.grey[5]};
  border-bottom: 1px solid ${props => props.theme.grey[5]};
  user-select: none;
  & > * {
    width: 100%;
    height: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    font-size: 1.75rem;
    color: ${props => props.theme.white};
    border-right: 1px solid ${props => props.theme.grey[5]};
    cursor: pointer;
    transition: all 0.25s;
    &:last-child {
      border-right: 0;
    }
    &:hover {
      color: ${props => props.theme.secondary.dark};
    }
    .speed {
      padding: 0 1rem;
    }
  }
`

export default ({
  videoRef,
  showControls,
  poster,
  isPlaying,
  duration,
  time,
  volume,
  speed,
  onMouseOver,
  onMouseOut,
  onLoadedMetadata,
  onTimeUpdate,
  onEnded,
  onPlayOrPause,
  onTimeChange,
  onVolumeChange,
  onSpeedChange,
  onSkip,
  onRequestPIP,
  onRequestFullscreen
}) => (
  <div>
    <VideoWrapper showControls={showControls}>
      <Video
        ref={videoRef}
        poster={poster}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />
      <div className="controls" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        <button onClick={onPlayOrPause}>
          {isPlaying ? (
            <Pause size={30} color="inherit" />
          ) : (
            <PlayArrow size={30} color="inherit" />
          )}
        </button>
        <div className="rest">
          <TimeSlider duration={duration} time={time} onChange={onTimeChange} />
          <Volume volume={volume} onClick={onVolumeChange} />
          <div className="settings">
            <Settings size={15} color="inherit" />
          </div>
          <div className="pip" onClick={onRequestPIP}>
            <PictureInPictureAlt size={15} color="inherit" />
          </div>
          <div className="fullscreen" onClick={onRequestFullscreen}>
            <ExpandArrowsAlt size={13} color="inherit" />
          </div>
        </div>
      </div>
    </VideoWrapper>
    <BottomControl>
      <div onClick={() => onSpeedChange(speed)}>
        <span>
          🏃‍ Speed <span className="speed">{speed}</span>
        </span>
      </div>
      <div onClick={() => onSkip('rewind', 30)}>
        <span>
          <FastRewind size={30} color="inherit" /> 30s
        </span>
      </div>
      <div onClick={() => onSkip('rewind', 10)}>
        <span>
          <FastRewind size={30} color="inherit" /> 10s
        </span>
      </div>
      <div onClick={() => onSkip('forward', 10)}>
        <span>
          10s <FastForward size={30} color="inherit" />
        </span>
      </div>
      <div onClick={() => onSkip('forward', 30)}>
        <span>
          30s <FastForward size={30} color="inherit" />
        </span>
      </div>
    </BottomControl>
  </div>
)
