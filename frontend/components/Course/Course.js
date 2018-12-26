import React from 'react'
import styled from 'styled-components'
import VideoPlayer from './VideoPlayer'
import VideoList from './VideoList'

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  background: ${props => props.theme.black};
  video {
    display: block;
    width: 75vw;
  }
`

export default class Course extends React.Component {
  state = {
    loading: true,
    videoIndex: 0,
    showControls: true,
    isPlaying: false,
    time: 0,
    duration: 1,
    volume: 0.75,
    speed: 1
  }

  video = React.createRef()

  componentDidMount() {
    const { videoIndex, volume, speed } = this.state
    const { course } = this.props
    const video = course.videos[videoIndex]
    this.video.current.volume = volume
    this.video.current.playbackRate = speed
    this.video.current.addEventListener('loadedmetadata', this.onLoadedMetadata)
    this.video.current.addEventListener('timeupdate', this.onTimeUpdate)
    this.video.current.addEventListener('ended', this.onEnded)
    this.video.current.src = video.url
  }

  componentWillUnmount() {
    this.video.current.removeEventListener('loadedmetadata', this.onLoadedMetadata)
    this.video.current.removeEventListener('timeupdate', this.onTimeUpdate)
    this.video.current.removeEventListener('ended', this.onEnded)
  }

  setVideoIndex = async videoIndex => {
    await this.setState({ loading: true })
    const { course } = this.props
    const video = course.videos[videoIndex]
    this.video.current.src = video.url
    this.setState({ videoIndex })
  }

  onMouseOver = () => this.setState({ showControls: true })

  onMouseOut = () => this.setState({ showControls: true })

  onLoadedMetadata = () => {
    console.log(`Duration is ${this.video.current.duration}`)
    this.setState({ duration: Math.ceil(this.video.current.duration), loading: false })
  }

  onTimeUpdate = () => this.setState({ time: Math.ceil(this.video.current.currentTime) })

  onTimeChange = values => {
    const time = values[0]
    this.video.current.currentTime = time
    this.setState({ time })
  }

  onVolumeChange = volume => {
    if (volume === 0.0 && this.video.current.volume === 0.0) {
      this.video.current.volume = 0.25
      this.setState({ volume: 0.25 })
    } else {
      this.video.current.volume = volume
      this.setState({ volume })
    }
  }

  onPlayOrPause = () => {
    if (this.state.isPlaying) {
      this.video.current.pause()
    } else {
      this.video.current.play()
    }
    this.setState({ isPlaying: !this.state.isPlaying })
  }

  onEnded = () => {
    this.video.current.pause()
    this.video.current.currentTime = 0
    this.setState({ isPlaying: false, time: 0 })
  }

  render() {
    const {
      state: { videoIndex, showControls, isPlaying, duration, time, volume },
      props: { course, user }
    } = this
    const poster = <course className="image" />
    return (
      <Container>
        <VideoPlayer
          videoRef={this.video}
          showControls={showControls}
          poster={poster}
          isPlaying={isPlaying}
          duration={duration}
          time={time}
          volume={volume}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          onPlayOrPause={this.onPlayOrPause}
          onVolumeChange={this.onVolumeChange}
          onTimeChange={this.onTimeChange}
        />
        <VideoList videoIndex={videoIndex} course={course} setVideoIndex={this.setVideoIndex} />
      </Container>
    )
  }
}
