import React from 'react'
import styled from 'styled-components'
import VideoPlayer from './VideoPlayer'
import VideoList from './VideoList'
import Media from '../styles/Media'
import formatTime from '../../lib/formatTime'
import formatTime2 from '../../lib/formatTime2'

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  background: ${props => props.theme.black};
  overflow: hidden;
  ${Media.wide`grid-template-columns: 1fr;`}
  video {
    display: block;
    width: 75vw;
    ${Media.wide`width: 100vw;`}
  }
`

export default class Course extends React.Component {
  state = {
    loading: true,
    videoIndex: 0,
    showControls: false,
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
    // this.video.current.addEventListener('loadedmetadata', this.onLoadedMetadata)
    // this.video.current.addEventListener('timeupdate', this.onTimeUpdate)
    // this.video.current.addEventListener('ended', this.onEnded)
    this.video.current.src = video.url
  }

  componentWillUnmount() {
    // this.video.current.removeEventListener('loadedmetadata', this.onLoadedMetadata)
    // this.video.current.removeEventListener('timeupdate', this.onTimeUpdate)
    // this.video.current.removeEventListener('ended', this.onEnded)
  }

  setVideoIndex = async videoIndex => {
    const { course } = this.props
    if (videoIndex > course.videos.length - 1 || videoIndex < 0) return
    await this.setState({ loading: true })
    const video = course.videos[videoIndex]
    this.video.current.src = video.url
    this.video.current.play()
    this.setState({ videoIndex, isPlaying: true })
  }

  onMouseOver = () => this.setState({ showControls: true })

  onMouseOut = () => this.setState({ showControls: false })

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

  onSpeedChange = cur => {
    let speed
    if (cur === 1) speed = 1.25
    else if (cur === 1.25) speed = 1.5
    else if (cur === 1.5) speed = 2
    else if (cur === 2) speed = 0.25
    else if (cur === 0.25) speed = 0.5
    else if (cur === 0.5) speed = 0.75
    else if (cur === 0.75) speed = 1
    else speed = 1
    this.video.current.playbackRate = speed
    this.setState({ speed })
  }

  onSkip = (dir, amt) => {
    let time = this.state.time
    if (dir === 'forward') time += amt
    else time -= amt
    this.video.current.currentTime = time
    this.setState({ time })
  }

  onEnded = () => {
    const {
      props: {
        course: { videos }
      },
      state: { videoIndex }
    } = this
    const { id } = videos[videoIndex]
    this.markVideoAsWatched(id)
    this.video.current.pause()
    this.video.current.currentTime = 0
    this.setState({ isPlaying: false, time: 0 }, () => {
      this.setVideoIndex(videoIndex + 1)
    })
  }

  onRequestPIP = () => {
    if (!document.pictureInPictureElement) {
      this.video.current
        .requestPictureInPicture()
        .catch(error => alert('Picture in Picture not supported. 😢'))
    } else {
      document.exitPictureInPicture().catch(console.error)
    }
  }

  onRequestFullscreen = () => {
    document.fullscreenEnabled =
      document.fullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.documentElement.webkitRequestFullScreen

    function requestFullscreen(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullscreen()
      }
    }

    if (document.fullscreenEnabled) {
      requestFullscreen(this.video.current).catch(error => alert('Full Screen not supported 😢'))
    }
  }

  markVideoAsWatched = id => {
    let watched = JSON.parse(localStorage.getItem('watched')) || []
    if (!watched.includes(id)) {
      watched.push(id)
      localStorage.setItem('watched', JSON.stringify(watched))
    }
  }

  render() {
    const {
      state: { videoIndex, showControls, isPlaying, duration, time, volume, speed },
      props: { course, user }
    } = this
    const poster =
      'https://s3-us-west-1.amazonaws.com/jsu-resources/courses/full-stack-react/course-1.svg'
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
          speed={speed}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          onLoadedMetadata={this.onLoadedMetadata}
          onTimeUpdate={this.onTimeUpdate}
          onEnded={this.onEnded}
          onPlayOrPause={this.onPlayOrPause}
          onVolumeChange={this.onVolumeChange}
          onTimeChange={this.onTimeChange}
          onSpeedChange={this.onSpeedChange}
          onSkip={this.onSkip}
          onRequestPIP={this.onRequestPIP}
          onRequestFullscreen={this.onRequestFullscreen}
        />
        <VideoList videoIndex={videoIndex} course={course} setVideoIndex={this.setVideoIndex} />
      </Container>
    )
  }
}
