import jwt from 'jsonwebtoken';
import { User, Role } from './database.js';

const JWT_SECRET = process.env.JWT_SECRET;

export async function createContext({ req, res }) {
  // Get token from Authorization header
  const token = req?.headers?.authorization?.replace('Bearer ', '') || '';

  let user = null;

  if (token) {
    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Fetch user from database
      user = await User.findByPk(decoded.id, { include: { model: Role } });
      
      if (!user) {
        throw new Error('User not found');
      }

      // console.log('Authenticated user:', user);
    } catch (err) {
      console.error('Token verification failed:', err.message);
      // Token is invalid or expired, user remains null
    }
  }

  return {
    req,
    res,
    user,
    JWT_SECRET,
    isAdmin: user?.role_id === 1,
  };
}

// Helper function to verify user is authenticated
export function requireAuth(user) {
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}
