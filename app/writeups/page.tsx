import { listWriteups } from '../../lib/markdown'
import { getWriteupsConnectionDocument } from '../../lib/tina-content'
import { StaticWriteupListClient, TinaWriteupListClient } from './writeup-list-client'

type Entry = { slug: string; title: string; description: string; date: string; category?: string; tags?: string[] }

export default async function WriteupsPage() {
  const writeupsConnection = await getWriteupsConnectionDocument()

  if (writeupsConnection) {
    return <TinaWriteupListClient query={writeupsConnection.query} data={writeupsConnection.data} variables={writeupsConnection.variables} />
  }

  const writeups: Entry[] = await listWriteups()
  return <StaticWriteupListClient writeups={writeups} />
}
