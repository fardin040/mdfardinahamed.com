import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="container text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Md Fardin Ahamed — Electronics & Telecommunication Engineering</p>
        <p className="mt-2">Designed for MSc applications and cybersecurity recruiters.</p>
      </div>
    </footer>
  )
}
