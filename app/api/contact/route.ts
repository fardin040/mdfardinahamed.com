import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, message } = data
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const endpoint = process.env.FORMSPREE_ENDPOINT
    if (endpoint) {
      const form = new URLSearchParams()
      form.append('name', String(name))
      form.append('email', String(email))
      form.append('message', String(message))

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: form.toString()
      })

      if (!res.ok) {
        return NextResponse.json({ error: 'Forwarding to Formspree failed' }, { status: 502 })
      }

      return NextResponse.json({ ok: true })
    }

    // No external endpoint configured — log and respond OK for testing
    // Note: On Vercel serverless functions, logs appear in deployments.
    console.log('Contact submission:', { name, email, message })
    return NextResponse.json({ ok: true, note: 'No FORMSPREE_ENDPOINT configured; logged on server.' })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
