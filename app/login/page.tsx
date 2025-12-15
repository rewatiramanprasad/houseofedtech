'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import FormInput from '@/components/formInput'
import { Form } from '@/components/ui/form'
import loginAction from './action'

const formSchema = z.object({
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.',
  }),
})
export type LoginFormSchemaType = z.infer<typeof formSchema>

export default function LoginForm() {
  const router = useRouter()
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  async function onSubmit(values: LoginFormSchemaType) {
    const result = await loginAction(values)
    form.reset()
    if (result.success) {
      toast.success('Logged in successfully')
      router.push('/dashboard')
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
            Welcome back
          </h2>
          <p className="text-gray-400">
            Enter your details to access your account
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
                {/* <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email address
                </label> */}
                {/* <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                /> */}
                <FormInput<LoginFormSchemaType>
                  form={form}
                  fieldName={'email'}
                  placeHolder="Email..."
                  formType="email"
                />
              </div>

              <div>
                {/* <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label> */}
                {/* <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                /> */}
                <FormInput<LoginFormSchemaType>
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
                Log in
              </button>
            </div>
          </form>
        </Form>
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
