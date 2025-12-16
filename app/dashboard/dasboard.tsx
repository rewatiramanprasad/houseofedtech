'use client'
import IdeaForm from '@/components/ideaForm'
import React, { useEffect, useMemo, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Ideas } from './page'
import DeleteAction from './DeleteAction'
import UpdateIdeaForm from '@/components/updateIdeaForm'

export default function Dashboard({ ideas }: { ideas: Ideas[] }) {
  const [updatingIdea, setUpdatingIdea] = useState<Ideas|null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  type SortOrder = 'newest' | 'oldest'
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest')
  const [aiSuggestion, setAiSuggestion] = useState('')
  const filteredIdeas = useMemo(() => {
    return ideas
      .filter((idea) => {
        const query = searchQuery.toLowerCase()

        return (
          idea.title.toLowerCase().includes(query) ||
          idea.originalText.toLowerCase().includes(query)
        )
      })
      .sort((a, b) => {
        switch (sortOrder) {
          case 'newest':
            return (
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            )

          case 'oldest':
            return (
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
            )

          default:
            return 0
        }
      })
  }, [ideas, searchQuery, sortOrder])

  const handleEnhance = () => {
    setAiSuggestion(
      'A mobile application that scans ingredients in your fridge and suggests personalized recipes based on dietary restrictions...'
    )
  }

  const handleUpdate = (idea: Ideas) => {
    setIsUpdating(true)
    setUpdatingIdea(idea)
   }

  return (
    <div className="min-h-screen bg-gray-50">
      

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            {isUpdating ? (
              <UpdateIdeaForm
                idea={updatingIdea!}
                setIsUpdating={setIsUpdating}
                onCancel={() => setIsUpdating(false)}
              />
            ) : (
              <IdeaForm />
            )}
          </div>

          <div className="lg:col-span-2">
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
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  >
                    <option value="newest">Sort: Newest</option>
                    <option value="oldest">Sort: Oldest</option>
                    <option>Sort: A-Z</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredIdeas.map((idea) => {
                const { id, title, originalText, updatedAt } = idea
                const email = idea.user?.email || 'Unknown'
                const author = email.split('@')[0]
                const updatedAtFormatted: string = formatDistanceToNow(
                  new Date(String(idea.updatedAt)),
                  { addSuffix: true }
                )

                return (
                  <div
                    key={id}
                    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                        {'👤'}
                      </div>
                      <span className="text-sm text-gray-600">{author}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-400">
                        Updated {updatedAtFormatted}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {originalText}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            handleUpdate(idea)
                          }}
                          className="text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors"
                        >
                          Edit
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors">
                          Enhance
                        </button>
                      </div>
                      <form action={DeleteAction.bind(null, id)}>
                        <button className="text-gray-400 hover:text-red-500 font-medium text-sm transition-colors">
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
