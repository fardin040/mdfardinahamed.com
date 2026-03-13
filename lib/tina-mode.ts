export function isTinaEnabled() {
  return (
    process.env.NEXT_PUBLIC_TINA_IS_LOCAL === 'true' ||
    Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN)
  )
}
