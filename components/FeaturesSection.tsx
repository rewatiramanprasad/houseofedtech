import React from 'react'
import { Plus, Sparkles, Pencil } from 'lucide-react'
export default function FeaturesSection() {
  const features = [
    {
      icon: <Plus />,
      title: 'Add Ideas Instantly',
      description:
        'Quickly jot down your thoughts before they fade away. Simple, fast, and always accessible.',
    },
    {
      icon: <Sparkles />,
      title: 'Enhance with AI',
      description:
        'Use advanced AI to expand your concepts, improve clarity, and generate actionable steps.',
    },
    {
      icon: <Pencil />,
      title: 'Edit & Manage',
      description:
        'Organize your library with ease. Update details, remove old items, and keep your dashboard clean.',
    },
  ]

  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-500">
                {feature.icon}
              </div>

              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>

             
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
