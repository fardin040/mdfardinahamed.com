export function isTinaRuntimeEnabled() {
  return (
    process.env.NODE_ENV !== 'production' ||
    Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN)
  )
}
