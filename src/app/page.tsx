import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>MEALzi - Meal Planning Made Easy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
        <div className="bg-lime-200 rounded-full p-4">
          <Image
            src="/logo/onion-logo.png"
            alt="Smiling Onion Logo"
            width={128}
            height={128}
          />
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold text-stone-600 mt-8">
          Welcome to MEALzi
        </h1>

        <p className="mt-3 text-lg sm:text-xl text-lime-800 font-medium">
          Meal planning and grocery lists made easy.
        </p>

        <div className="flex items-center justify-center space-x-4 max-w-4xl mt-6 sm:w-full">
          <a
            href="/register"
            className="px-8 py-3 mt-6 sm:mt-0 text-lg font-medium rounded-md bg-lime-600 text-white hover:bg-lime-700 transition-colors duration-300"
          >
            Register
          </a>
          <a
            href="/login"
            className="px-8 py-3 mt-6 sm:mt-0 text-lg font-medium rounded-md bg-lime-200 text-lime-800 hover:bg-lime-300 transition-colors duration-300"
          >
            Login
          </a>
        </div>

        {/* Features */}
        <div className="flex flex-col lg:flex-row items-center justify-center mt-10">
          <div className="bg-lime-200 rounded-lg p-6 m-4 w-full sm:w-96">
            <Image
              src="/features/storage.jpg"
              alt="Recipe Storage"
              width={200}
              height={200}
              className="mx-auto rounded"
            />
            <h3 className="text-2xl font-bold text-lime-600 mt-4">
              Recipe Storage
            </h3>
            <p className="text-lime-800 mt-2">
              Store all your favorite recipes in one place for easy access.
            </p>
          </div>

          <div className="bg-lime-200 rounded-lg p-6 m-4 w-full sm:w-96">
            <Image
              src="/features/generator.jpg"
              alt="Meal Plans"
              width={200}
              height={200}
              className="mx-auto rounded"
            />
            <h3 className="text-2xl font-bold text-lime-600 mt-4">
              Generate Meal Plans
            </h3>
            <p className="text-lime-800 mt-2">
              Generate weekly or monthly meal plans based on your stored recipes.
            </p>
          </div>

          <div className="bg-lime-200 rounded-lg p-6 m-4 w-full sm:w-96">
            <Image
              src="/features/grocery-list.jpg"
              alt="Grocery List"
              width={200}
              height={200}
              className="mx-auto rounded"
            />
            <h3 className="text-2xl font-bold text-lime-600 mt-4">
              Generate Grocery List
            </h3>
            <p className="text-lime-800 mt-2">
              Generate a grocery list for the week or month based on your meal
              plans.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}