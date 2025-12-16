'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import FormInput from './formInput'
import { toast } from 'sonner'
import { Form } from '@/components/ui/form'
import FormTextArea from './formTextarea'
import addIdeaAction from '@/app/dashboard/AddIdeaAction'
import { enhanceIdeaAction } from '@/app/dashboard/EnhancedIdeaAction'
import { useState } from 'react'

const formSchema = z.object({
  title: z.string().min(8, {
    message: 'Title should not be empty,at least required 8 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  aiSuggestion: z.string().optional(),
})

export type IdeaFormSchemaType = z.infer<typeof formSchema>

function IdeaForm() {
   
  const form = useForm<IdeaFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      aiSuggestion: '',
    },
  })
  const aiSuggestion = form.watch('aiSuggestion')
  const [aiSuggestionText, setAiSuggestion] = useState('')
const handleEnhance = async () => {
  const values = form.getValues()

  if (!values.title || !values.description) {
    toast.error('Please enter title and description first')
    return
  }

  const result = await enhanceIdeaAction({
    title: values.title,
    description: values.description,
  })

  if (result.success) {
    form.setValue('aiSuggestion', result.text)
    setAiSuggestion(result.text||'')
    toast.success('Idea enhanced')
  } else {
    toast.error(result.message)
  }
}

  async function onSubmit(values: IdeaFormSchemaType) {
    const result = await addIdeaAction(values)
    form.reset()
    if (result.success) {
      toast.success('Idea added successfully')
      // router.push('/dashboard')
    } else {
      toast.error(result.message)
    }
  }
  

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">New Idea</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onReset={() => form.reset()}
          className="space-y-8"
        >
          <div className="mb-4">
            <FormInput<IdeaFormSchemaType>
              form={form}
              fieldName={'title'}
              placeHolder="e.g., AI-powered Recipe App"
              formType="text"
            />
          </div>

          <div className="mb-4">
            <FormTextArea<IdeaFormSchemaType>
              form={form}
              fieldName={'description'}
              placeHolder="Describe your idea..."
              rows={6}
            />
          </div>

          <button
            type={'button'}
            onClick={handleEnhance}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors mb-4"
          >
            Enhance with AI
          </button>

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

          <button
            type="submit"
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg border border-gray-200 transition-colors"
          >
            Save Idea
          </button>
        </form>
      </Form>
    </div>
  )
}

export default IdeaForm
