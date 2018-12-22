function clean(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s/g, '-')
}

export default (folder, username, filename) => {
  const cleanUsername = clean(username)
  const cleanFilename = clean(filename)
  return `${folder}/${cleanUsername}/${cleanFilename}`
}
