import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db/dbConnect';
import User from '@/lib/db/models/User';
import bcrypt from 'bcrypt';
import { signJwt } from '@/lib/auth/auth';
import RefreshToken from '@/lib/db/models/RefreshToken';

async function POST(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
      headers: { "content-type": "application/json" },
      status: 405,
    })
  }

  try {
    await dbConnect();

    // Using req.json() to parse the request body (as required)
    const { email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), {
        headers: { "content-type": "application/json" },
        status: 400,
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    const refreshToken = signJwt({ userId: user._id });
    const token = signJwt({ userId: user._id });

    const refreshTokenDocument = new RefreshToken({ userId: user._id, token: refreshToken });
    await refreshTokenDocument.save();

    const tokenExpiration = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
    const refreshTokenExpiration = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000); // 60 days from now

    return new Response(JSON.stringify(user), {
      headers: { "content-type": "application/json", "Set-Cookie": [`token=${token}; Path=/; Expires=${tokenExpiration.toUTCString()} HttpOnly; SameSite=Strict`, `refreshToken=${refreshToken}; Path=/; Expires=${refreshTokenExpiration.toUTCString()} HttpOnly; SameSite=Strict`].join(",") },
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error registering user' }), {
      headers: { "content-type": "application/json" },
      status: 500,
    })
  }
}

export { POST };