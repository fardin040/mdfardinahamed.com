import React from 'react'
import { getPost } from '../../../lib/markdown'

type Props = { params: { slug: string } }

export default async function PostPage({ params }: Props) {
  const { meta, html } = await getPost(params.slug)
  return (
    <article>
      <h1 className="text-2xl font-semibold">{meta.title}</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">{meta.date}</p>
      <div className="prose dark:prose-invert mt-4" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}
