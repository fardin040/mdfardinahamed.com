import { getPost } from '../../../lib/markdown'
import { getBlogDocument } from '../../../lib/tina-content'
import { StaticPostClient, TinaPostClient } from '../post-client'

type Props = { params: { slug: string } }

export default async function PostPage({ params }: Props) {
  const postDocument = await getBlogDocument(params.slug)

  if (postDocument) {
    return <TinaPostClient query={postDocument.query} data={postDocument.data} variables={postDocument.variables} />
  }

  const { meta, html } = await getPost(params.slug)
  return <StaticPostClient meta={meta} html={html} />
}
