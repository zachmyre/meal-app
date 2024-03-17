"use client";
import Image from 'next/image'
import { FormEvent, useState } from 'react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Perform registration logic here (e.g., send data to server)
    console.log('Registration data:', { email, password })

    // Reset form fields
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setError('')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
        <div className="bg-lime-200 rounded-full p-4">
          <Image
            src="/logo/onion-logo.png"
            alt="Smiling Onion Logo"
            width={128}
            height={128}
          />
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold text-lime-600 mt-8">
          Welcome to MEALzi
        </h1>

        <p className="mt-3 text-lg sm:text-xl text-lime-800 font-medium">
          Create your account
        </p>

        <div className="bg-lime-200 rounded-lg p-6 mt-8 w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-lime-800 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-white border border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-lime-800 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-white border border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-lime-800 font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-white border border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            {error && (
              <div className="mb-4 text-red-500 font-medium">{error}</div>
            )}

            <button
              type="submit"
              className="w-full px-8 py-3 text-lg font-medium rounded-md bg-lime-600 text-white hover:bg-lime-700 transition-colors duration-300"
            >
              Register
            </button>
          </form>

          <div className="mt-4 text-lime-800">
            Already have an account?
            <a
              href="/login"
              className="text-lime-600 font-medium hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
