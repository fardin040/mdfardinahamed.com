import { getWriteup } from '../../../lib/markdown'
import { getWriteupDocument } from '../../../lib/tina-content'
import { StaticWriteupClient, TinaWriteupClient } from '../writeup-client'

type Props = { params: { slug: string } }

export default async function WriteupPage({ params }: Props) {
  const writeupDocument = await getWriteupDocument(params.slug)

  if (writeupDocument) {
    return <TinaWriteupClient query={writeupDocument.query} data={writeupDocument.data} variables={writeupDocument.variables} />
  }

  const { meta, html } = await getWriteup(params.slug)
  return <StaticWriteupClient meta={meta} html={html} />
}
