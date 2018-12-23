export default videos => {
  const secs = videos.reduce((acc, video) => acc + video.time, 0)
  const total = videos.length
  const hrs = Math.floor(secs / 60 / 60)
  const mins = secs % 60
  if (hrs) {
    return `${hrs} hrs / ${total} vids`
  } else {
    return `${mins} min / ${total} vids`
  }
}
