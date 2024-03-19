import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

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
export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
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