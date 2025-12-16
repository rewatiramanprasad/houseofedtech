'use server'

import { GoogleGenAI } from '@google/genai'
import 'dotenv/config'
const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) {
  throw new Error('GEMINI_API_KEY environment variable is not set.')
}
const ai = new GoogleGenAI({
  apiKey: apiKey,
})

export async function enhanceIdeaAction(input: {
  title: string
  description: string
}) {
  try {
    const prompt = `
Enhance the following startup idea clearly and professionally.

Title: ${input.title}
Description: ${input.description}

Return only the enhanced idea text.
`

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    })

    const text = result.text

    if (!text) {
      return {
        success: false,
        message: 'No response from Gemini',
      }
    }

    return { success: true, text }
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error) {
      
      console.error('Gemini API Error:', error.status)
    } else {
      console.error('Gemini Unknown Error:', error)
    }

    return {
      success: false,
      message: 'Failed to enhance idea due to a service error.',
    }
  }
}
