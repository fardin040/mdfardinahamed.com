"use client"
import React, { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle')

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
    <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
      <div className="grid gap-3">
        <label className="text-sm">Name
          <input name="name" required className="w-full mt-1 p-2 border rounded" />
        </label>
        <label className="text-sm">Email
          <input name="email" type="email" required className="w-full mt-1 p-2 border rounded" />
        </label>
        <label className="text-sm">Message
          <textarea name="message" rows={5} required className="w-full mt-1 p-2 border rounded" />
        </label>
        <div className="flex items-center gap-3">
          <button type="submit" disabled={status === 'sending'} className="px-4 py-2 bg-primary text-white rounded">{status === 'sending' ? 'Sending...' : 'Send'}</button>
          {status === 'sent' && <span className="text-sm text-green-600">Thanks — message sent.</span>}
          {status === 'error' && <span className="text-sm text-red-600">Error sending message.</span>}
        </div>
      </div>
    </form>
  )
}
