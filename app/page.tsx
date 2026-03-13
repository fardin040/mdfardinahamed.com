import { siteContent } from '../data/content'
import { HomeClient } from './home-client'

export default async function Page() {
  return <HomeClient siteContent={siteContent} />
}
