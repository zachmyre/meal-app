import Image from 'next/image'

const LoginPage = () => {
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
          Login to your account
        </p>

        <div className="bg-lime-200 rounded-lg p-6 mt-8 w-full max-w-md">
          <form>
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
                className="w-full px-3 py-2 rounded-md bg-white border border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-lime-800 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 rounded-md bg-white border border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 text-lg font-medium rounded-md bg-lime-600 text-white hover:bg-lime-700 transition-colors duration-300"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-lime-800 space-x-2">
            <span>{"Don't have an account?"}</span>
            <a
              href="/register"
              className="text-lime-600 font-medium hover:underline"
            >
              Register
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LoginPage