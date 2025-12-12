import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-200  py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-400 text-sm">
          © 2024 IdeaFlow Inc. All rights reserved.
        </div>

        <div className="flex items-center gap-8">
          <a
            href="#"
            className="text-gray-400 hover:text-gray-600 text-sm transition-colors duration-200"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-600 text-sm transition-colors duration-200"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}
