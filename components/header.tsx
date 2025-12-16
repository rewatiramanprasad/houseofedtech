import { logoutAction } from '@/app/dashboard/logout'
import React from 'react'

function header({ user }: { user: { email: string } | null }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">IdeaFlow</h1>
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg">
                👤
              </div>
              <span className="font-medium text-gray-700">
                {user.email.split('@')[0]}
              </span>
            </div>
          )}
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}

export default header
