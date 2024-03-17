import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db/dbConnect';
import User from '@/lib/db/models/User';
import bcrypt from 'bcrypt';

async function POST(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
      headers: { "content-type": "application/json" },
      status: 405,
    })
  }

  try {
  await dbConnect();

  const { email, password } = await req.json();

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ message: 'Email not found' }), {
      headers: { "content-type": "application/json" },
      status: 401,
    })
  }

  // Compare the provided password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
      headers: { "content-type": "application/json" },
      status: 401,
    })
  }

  // Password is valid, return a success message
  return new Response(JSON.stringify({message: user}), {
    headers: { "content-type": "application/json" },
    status: 200,
 });
} catch (error) {
  console.error(error);
  return new Response(JSON.stringify({ message: 'Error logging in user' }), {
    headers: { "content-type": "application/json" },
    status: 500,
  })
}
}

export {POST};