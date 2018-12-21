module.exports = args => {
  if (!args.name) throw new Error('Error: Name field required.')
  if (!args.email) throw new Error('Error: Email field required.')
  if (!args.password) throw new Error('Error: Password field required.')
  if (args.password.length < 8) throw new Error('Error: Password must be 8 characters or more.')
}
