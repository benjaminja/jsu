import React from 'react'
import styled from 'styled-components'
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider'

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

const TimeTrack = styled.div`
  position: absolute;
  z-index: 1;
  height: 1rem;
  background: ${props => props.theme.secondary.main};
  cursor: pointer;
  left: 1rem;
  width: ${props => props.target.percent - props.source.percent}%;
`

function Track({ source, target, getTrackProps }) {
  return <TimeTrack source={source} target={target} {...getTrackProps()} />
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
                <Track key={id} source={source} target={target} getTrackProps={getTrackProps} />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
    )
  }
}
