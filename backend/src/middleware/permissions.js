const isAuthenticated = async (_, args, ctx, info) => {
  if (!ctx.userId) throw new Error('Not Authorized. Must be signed in.')
}

const isAdmin = async (_, args, ctx, info) => {
  if (!ctx.userId || !ctx.user) throw new Error('Not Authorized. Must be signed in.')
  if (ctx.user.role !== 'ADMIN') throw new Error('Not Authorized. Must be an administrator.')
}

const isSubscribed = async (_, args, ctx, info) => {
  if (!ctx.userId || !ctx.user) throw new Error('Not Authorized. Must be signed in.')
  if (!ctx.user.isSubscribed) throw new Error('Not Authorized. Must be a subscriber.')
}

module.exports = {
  isAuthenticated,
  isAdmin,
  isSubscribed
}
