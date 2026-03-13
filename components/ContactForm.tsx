"use client"
import React, { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const fd = new FormData(e.currentTarget)
    const payload = {
      name: fd.get('name'),
      email: fd.get('email'),
      message: fd.get('message')
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        setStatus('sent')
        e.currentTarget.reset()
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <form className="panel w-full" onSubmit={handleSubmit}>
      <div className="space-y-6">
        <label className="block text-sm font-medium text-slate-800">
          Full Name
          <input
            name="name"
            required
            placeholder="Jane Doe"
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
          />
        </label>
        <label className="block text-sm font-medium text-slate-800">
          Email Address
          <input
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
          />
        </label>
        <label className="block text-sm font-medium text-slate-800">
          Message
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Tell me about the project, research collaboration, or role you have in mind."
            className="mt-2 w-full resize-y rounded-lg border border-slate-200 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
          />
        </label>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-lg bg-slate-950 px-5 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'sent' && <span className="fade-in text-sm font-medium text-emerald-600">Thanks! Message sent.</span>}
          {status === 'error' && <span className="fade-in text-sm font-medium text-destructive">Error sending message.</span>}
        </div>
      </div>
    </form>
  )
}
