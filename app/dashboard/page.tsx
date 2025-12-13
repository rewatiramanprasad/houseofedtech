'use client'
import React, { useState } from 'react'

export default function Dashboard() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [ownerFilter, setOwnerFilter] = useState('All')
  const [sortOrder, setSortOrder] = useState('Newest')
  const [aiSuggestion, setAiSuggestion] = useState('')

  const ideas = [
    {
      id: 1,
      title: 'Smart Plant Waterer',
      description:
        'IoT device that monitors soil moisture levels and automatically waters plants when needed. Includes a companion app for tracking plant health over time.',
      author: 'Alex',
      avatar: '👤',
      updatedAt: '2 hours ago',
    },
    {
      id: 2,
      title: 'Subscription Manager SaaS',
      description:
        'A centralized dashboard to track all recurring subscriptions, alert users before renewals, and identify unused services to save money.',
      author: 'Sarah',
      avatar: '👤',
      updatedAt: 'yesterday',
    },
    {
      id: 3,
      title: 'Fitness Gamification Platform',
      description:
        'Turn daily steps and workouts into RPG character progression. Users battle monsters and level up by achieving real-world fitness goals.',
      author: 'Alex',
      avatar: '👤',
      updatedAt: '3 days ago',
    },
  ]

  const handleEnhance = () => {
    setAiSuggestion(
      'A mobile application that scans ingredients in your fridge and suggests personalized recipes based on dietary restrictions...'
    )
  }

  const handleSaveIdea = () => {
    console.log('Saving idea:', { title, description })
    setTitle('')
    setDescription('')
    setAiSuggestion('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">IdeaFlow</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg">
                👤
              </div>
              <span className="font-medium text-gray-700">Alex Morgan</span>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - New Idea Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">New Idea</h2>

              {/* Title Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., AI-powered Recipe App"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Description Textarea */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your idea..."
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Enhance Button */}
              <button
                onClick={handleEnhance}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors mb-4"
              >
                Enhance with AI
              </button>

              {/* AI Suggestion Box */}
              {aiSuggestion && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    AI SUGGESTION
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {aiSuggestion}
                  </p>
                </div>
              )}

              {/* Save Button */}
              <button
                onClick={handleSaveIdea}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg border border-gray-200 transition-colors"
              >
                Save Idea
              </button>
            </div>
          </div>

          {/* Right Content - Ideas List */}
          <div className="lg:col-span-2">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ideas..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex gap-4">
                  <select
                    value={ownerFilter}
                    onChange={(e) => setOwnerFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  >
                    <option>Owner: All</option>
                    <option>Owner: Alex</option>
                    <option>Owner: Sarah</option>
                  </select>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  >
                    <option>Sort: Newest</option>
                    <option>Sort: Oldest</option>
                    <option>Sort: A-Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Ideas List */}
            <div className="space-y-4">
              {ideas.map((idea) => (
                <div
                  key={idea.id}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {idea.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                      {idea.avatar}
                    </div>
                    <span className="text-sm text-gray-600">{idea.author}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-400">
                      Updated {idea.updatedAt}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {idea.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <button className="text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors">
                        Edit
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors">
                        Enhance
                      </button>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 font-medium text-sm transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
