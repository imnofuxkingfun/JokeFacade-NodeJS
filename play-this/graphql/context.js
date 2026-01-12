// import { PrismaClient } from './prisma/generated/client'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const context = async ({ req }) => {
  //get the user token from the headers
  const token = req.headers.authorization || '';
  let user = null;
  
  try {
    if (token) {
      user = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    }
  } catch (e) {
    console.warn("Invalid token");
  }

  return { //provide user info to resolvers
    db: prisma,
    user: user,
  };
};

module.exports = context;