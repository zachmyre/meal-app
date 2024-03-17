"use client";
import LoadingSpinner from '@/components/LoadingSpinner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        setError('');
        console.log(data.message);
        router.push('/dashboard');
      } else {
        setError(data.message);
        setLoading(false);
      }
    } catch (error) {
      setError('An error occurred during login');
      setLoading(false);
    }
  };

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
          Welcome to the Dashboard
        </p>
        <p className="mt-3 text-base sm:text-xl text-lime-800 font-bold">
          Coming Soon!
        </p>
      </main>
    </div>
  );
};

export default DashboardPage;