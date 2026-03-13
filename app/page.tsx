import { getHomePageData } from '../lib/tina'
import { HomeClient } from './home-client'
import { HomeStatic } from './home-static'

export default async function Page() {
  if (process.env.NODE_ENV === 'production') {
    return <HomeStatic />
  }

  const home = await getHomePageData()

  return <HomeClient data={home.data} query={home.query} variables={home.variables} />
}
