import { getHomePageData } from '../lib/tina'
import { isTinaRuntimeEnabled } from '../lib/tina-mode'
import { HomeClient } from './home-client'
import { HomeStatic } from './home-static'

export default async function Page() {
  if (!isTinaRuntimeEnabled()) {
    return <HomeStatic />
  }

  const home = await getHomePageData()

  return <HomeClient data={home.data} query={home.query} variables={home.variables} />
}
