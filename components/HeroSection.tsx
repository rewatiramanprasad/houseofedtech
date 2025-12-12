import React from 'react'

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center mb-8">
          <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-2 rounded-full uppercase tracking-wide">
            AI-Powered Creativity
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Capture and enhance your ideas with AI
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Transform fleeting thoughts into actionable plans. Organize, refine,
          and manage your brilliance in one secure place.
        </p>

        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          Get Started
        </button>
      </div>
    </div>
  )
}
