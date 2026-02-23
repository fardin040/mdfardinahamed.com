import React from 'react'

type Props = {
  title: string
  description: string
  tech: string[]
  github?: string
  demo?: string
}

import { Github, ExternalLink } from 'lucide-react'

export default function ProjectCard({ title, description, tech, github, demo }: Props) {
  return (
    <article className="glass p-6 rounded-2xl flex flex-col h-full hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300 hover:-translate-y-1 group fade-up">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">{title}</h3>
        <div className="flex gap-2">
          {github && (
            <a href={github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-1" aria-label="GitHub Repository">
              <Github className="w-5 h-5" />
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-1" aria-label="Live Demo">
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-6 flex-grow leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((item, i) => (
          <span key={i} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold tracking-wide shadow-sm border border-accent/20">
            {item}
          </span>
        ))}
      </div>
      {github && (
        <div className="mt-auto pt-4 border-t border-border/50">
          <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full px-4 py-2 bg-secondary/50 text-secondary-foreground hover:bg-secondary hover:text-foreground font-medium rounded-lg transition-colors border border-border/50 hover:border-border">
            <Github className="w-4 h-4 mr-2" />
            View Source Code
          </a>
        </div>
      )}
    </article>
  )
}
