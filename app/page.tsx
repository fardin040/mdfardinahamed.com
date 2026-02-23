import client from '../tina/__generated__/client'
import { HomeClient } from './home-client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page() {
  const result = await client.queries.home({ relativePath: 'home.json' })

  return (
    <HomeClient {...result} />
  )
}
