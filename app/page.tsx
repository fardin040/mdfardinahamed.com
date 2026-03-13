import { siteContent } from '../data/content'
import { getHomeDocument } from '../lib/tina-content'
import { HomeClient, TinaHomeClient } from './home-client'

export default async function Page() {
  const homeDocument = await getHomeDocument()

  if (homeDocument) {
    return <TinaHomeClient query={homeDocument.query} data={homeDocument.data} variables={homeDocument.variables} />
  }

  return <HomeClient siteContent={siteContent} />
}
