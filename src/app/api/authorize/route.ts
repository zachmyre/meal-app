import dbConnect from '@/lib/db/dbConnect';
import User from '@/lib/db/models/User';
import bcrypt from 'bcrypt';
import { UserTokenData, signJwt, verifyJwt } from '@/lib/auth/auth';
import RefreshToken from '@/lib/db/models/RefreshToken';

async function GET(req: Request, res: Response) {
  // check if token in request, if token then validate it and return user
  // if not token then check if refresh token in request, if refresh token then validate it and return user and new token
  // if not refresh token then return error
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
      headers: { "content-type": "application/json" },
      status: 405,
    })
  }

  const cookies = req.headers.get('cookie')?.split(';') || [];
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  const refreshTokenCookie = cookies.find(cookie => cookie.trim().startsWith('refreshToken='));

  if (!refreshTokenCookie) {
    // No token or refresh token found
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      headers: { "content-type": "application/json" },
      status: 401,
    })
  }

  try{
  // Validate the token and return the user
  let token = tokenCookie?.split('=')[1] || null;
  let refreshToken = refreshTokenCookie?.split('=')[1] || null;
  let user = null;
  if(token){
    const userData: UserTokenData | null = await verifyJwt(token);
    if(userData && "userId" in userData){
      user = await User.findById(userData.userId);
      console.log(user);
    }
  } else if(refreshToken){
    const refreshTokenData = await RefreshToken.findOne({ token: refreshToken });
    if(!refreshTokenData){
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        headers: { "content-type": "application/json" },
        status: 401,
      })
    }
    const userData: UserTokenData | null = await verifyJwt(refreshToken);
    if(userData && "userId" in userData){
      user = await User.findById(userData.userId);
      token = await signJwt({ userId: user._id });
    }
  }

  if (!user) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      headers: { "content-type": "application/json" },
      status: 401,
    })
  }

  const tokenExpiration = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
  const refreshTokenExpiration = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000); // 60 days from now

  // Password is valid, return a success message
  return new Response(JSON.stringify({ message: {email: user.email, _id: user._id} }), {
    headers: { "content-type": "application/json", "Set-Cookie": [`token=${token}; Path=/; Expires=${tokenExpiration.toUTCString()} HttpOnly; SameSite=Strict`, `refreshToken=${refreshToken}; Path=/; Expires=${refreshTokenExpiration.toUTCString()} HttpOnly; SameSite=Strict`].join(",") },
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

export { GET };