import jwt from 'jsonwebtoken';
import 'dotenv/config';
// Import the object you exported from your database.js (the one with associations)
import dbModels from '../database.js'; 

const context = async ({ req }) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  
  let user = null;

  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      // Don't throw an error here, or the whole query fails. 
      // Just keep user as null; resolvers will handle permissions.
      console.warn("Session expired or invalid token");
    }
  }

  return {
    db: dbModels, 
    user: user,
  };
};

export default context;