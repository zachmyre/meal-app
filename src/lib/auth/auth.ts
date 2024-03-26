import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Set your JWT secret
export const JWT_SECRET = 'your-secret-key';

// Configure JWT options
export const jwtOptions = {
    expiresIn: '1d', // JWT expiry duration
};

// Helper function to sign a JWT
export function signJwt(payload: object) {
    return jwt.sign(payload, JWT_SECRET, jwtOptions);
}

// Helper function to verify a JWT
export function verifyJwt(token: string): UserTokenData | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as UserTokenData;
        return decoded;
    } catch (err) {
        return null;
    }
}

// Middleware to protect routes
export function authenticateJWT(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return new NextResponse(
            JSON.stringify({ message: 'Unauthorized' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const decoded = verifyJwt(token);

    if (!decoded) {
        return new NextResponse(
            JSON.stringify({ message: 'Invalid token' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
    }

    return NextResponse.next();
}

export interface UserTokenData extends jwt.JwtPayload{
    userId: string,
    iat: number,
    exp: number
}


export const authorizeRedirect = async (router: AppRouterInstance) => {
        const response = await fetch("/api/authorize", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if(response.ok) {
          const data = await response.json();
          console.log("data", data);
          //TODO: set user in state
          router.push("/dashboard");
        }
}