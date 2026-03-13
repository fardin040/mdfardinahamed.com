export function isTinaEnabled() {
  if (process.env.NEXT_PUBLIC_TINA_ENABLED === 'false') {
    return false
  }

  if (process.env.NEXT_PUBLIC_TINA_ENABLED === 'true') {
    return true
  }

  return (
    process.env.NEXT_PUBLIC_TINA_IS_LOCAL === 'true' ||
    Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN)
  )
}
