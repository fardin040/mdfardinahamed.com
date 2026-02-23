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
    <form className="w-full glass p-8 rounded-2xl shadow-lg relative overflow-hidden" onSubmit={handleSubmit}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
      <div className="grid gap-6">
        <label className="block text-sm font-medium text-foreground">
          Full Name
          <input
            name="name"
            required
            placeholder="Jane Doe"
            className="w-full mt-2 p-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-muted-foreground/50"
          />
        </label>
        <label className="block text-sm font-medium text-foreground">
          Email Address
          <input
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            className="w-full mt-2 p-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-muted-foreground/50"
          />
        </label>
        <label className="block text-sm font-medium text-foreground">
          Message
          <textarea
            name="message"
            rows={5}
            required
            placeholder="How can we collaborate?"
            className="w-full mt-2 p-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-muted-foreground/50 resize-y"
          />
        </label>
        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'sent' && <span className="text-sm font-medium text-emerald-500 fade-in">Thanks! Message sent.</span>}
          {status === 'error' && <span className="text-sm font-medium text-destructive fade-in">Error sending message.</span>}
        </div>
      </div>
    </form>
  )
}
