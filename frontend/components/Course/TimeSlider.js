import React from 'react'
import styled from 'styled-components'
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider'
import formatTime from '../../lib/formatTime'

const rootStyle = {
  position: 'relative',
  width: '98%',
  height: '100%',
  display: 'grid',
  alignItems: 'center',
  alignSelf: 'center'
}

const TimeRail = styled.div`
  position: absolute;
  width: 100%;
  height: 1rem;
  left: 0;
  cursor: pointer;
  border: 1px solid ${props => props.theme.grey[5]};
  margin: 0 1rem;
`

const TimeTrack = styled.div.attrs(({ target, source }) => ({
  style: { width: target.percent - source.percent + '%' }
}))`
  position: absolute;
  z-index: 1;
  height: 1rem;
  background: ${props => props.theme.secondary.main};
  cursor: pointer;
  left: 1rem;
`
const Label = styled.div.attrs(({ target, source }) => ({
  style: { left: target.percent + source.percent - 0.25 + '%' }
}))`
  position: absolute;
  bottom: 2.5rem;
  font-size: 1rem;
  font-family: sans-serif;
  margin: 0;
  padding: 0.2rem 0.35rem 0;
  line-height: 1;
  background: white;
  box-shadow: 1.5px 1.5px 0 black;
  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -4px;
    width: 0;
    height: 0;
    border-top: solid 4px white;
    border-left: solid 4px transparent;
    border-right: solid 4px transparent;
  }
`

function Track({ time, source, target, getTrackProps }) {
  return (
    <>
      <TimeTrack source={source} target={target} {...getTrackProps()} />
      <Label source={source} target={target}>
        {formatTime(time)}
      </Label>
    </>
  )
}

export default class TimeSlider extends React.Component {
  render() {
    const {
      props: { duration, time, onChange }
    } = this
    const domain = [0, duration]
    const values = [time]
    return (
      <Slider
        mode={1}
        step={1}
        domain={domain}
        values={values}
        rootStyle={rootStyle}
        onChange={onChange}
      >
        <Rail>{({ getRailProps }) => <TimeRail {...getRailProps()} />}</Rail>
        <Tracks right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  time={time}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
    )
  }
}
