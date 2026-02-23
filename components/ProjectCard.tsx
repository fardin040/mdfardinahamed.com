import React from 'react'

type Props = {
  title: string
  description: string
  tech: string[]
  github?: string
  demo?: string
}

export default function ProjectCard({ title, description, tech, github, demo }: Props) {
  return (
    <article className="p-4 border rounded-lg shadow-sm hover:shadow-md transition fade-in">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {tech.map(t => (
          <span key={t} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">{t}</span>
        ))}
      </div>
      <div className="flex gap-3">
        {github && <a href={github} target="_blank" rel="noreferrer" className="text-sm text-primary">GitHub</a>}
        {demo && <a href={demo} target="_blank" rel="noreferrer" className="text-sm text-primary">Live demo</a>}
      </div>
    </article>
  )
}
