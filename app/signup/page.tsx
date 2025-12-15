'use client'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/formInput'
import AddUser from './action'
import { toast } from 'sonner'

const formSchema = z.object({
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.',
  }),
  confirmPassword: z.string().min(2, {
    message: 'Password must be at least 2 characters.',
  }),
})

export type SingUpFormSchemaType = z.infer<typeof formSchema>
export default function SignUpForm() {
  const router = useRouter()
  const form = useForm<SingUpFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  async function onSubmit(values: SingUpFormSchemaType) {
    const result = await AddUser(values)
    form.reset()
    if (result.success) {
      toast.success('User added successfully')
      router.push('/login')
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">IdeaFlow</h1>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Create an account
          </h2>
          <p className="text-gray-400">
            Start capturing and enhancing your ideas today
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onReset={() => form.reset()}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div>
                <FormInput<SingUpFormSchemaType>
                  form={form}
                  fieldName={'email'}
                  placeHolder="Email..."
                  formType="email"
                />
              </div>

              <div>
                <FormInput<SingUpFormSchemaType>
                  form={form}
                  fieldName={'password'}
                  placeHolder="••••••••"
                  formType="password"
                />
              </div>

              <div>
                <FormInput<SingUpFormSchemaType>
                  form={form}
                  fieldName={'password'}
                  placeHolder="••••••••"
                  formType="password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
              >
                Sign up
              </button>
            </div>
          </form>
        </Form>

        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
