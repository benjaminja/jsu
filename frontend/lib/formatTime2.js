export default function(seconds) {
  seconds = Math.floor(seconds)
  var h = Math.floor(seconds / 3600)
  var m = Math.floor((seconds - h * 3600) / 60)
  var s = seconds - h * 3600 - m * 60
  var time = ''

  if (h > 0) {
    time += `${h}:`
  }

  if (m > 0 || Boolean(time)) {
    m = m < 10 && Boolean(time) ? `0${m}` : String(m)
    time += `${m}:`
  }

  if (!Boolean(time)) {
    time = s < 10 ? `0:0${s}` : `0:${s}`
  } else {
    time += s < 10 ? `:0${s}` : String(s)
  }

  return time
}
