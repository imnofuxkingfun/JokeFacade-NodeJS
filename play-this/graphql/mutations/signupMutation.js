import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';
import { User } from '../database.js';
import AuthPayloadType from '../types/authPayloadType.js';

const JWT_SECRET = process.env.JWT_SECRET;

const signupMutation = {
  type: AuthPayloadType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    role_id: { type: GraphQLInt, defaultValue: 2 }, // Default role_id to 2 (regular user)
  },
  resolve: async (_, args, context) => {
    const { email, username, password, role_id } = args;
    const { req, res, user, JWT_SECRET } = context;

    if (user) {
      throw new Error('You are already logged in');
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      throw new Error('Email already in use');
    }
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      throw new Error('Username already in use');
    }


    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, username, password: passwordHash, role_id}); // Default role_id to 2 (regular user)

    const token = jwt.sign({ id: newUser.id, roleId: newUser.role_id }, JWT_SECRET, { expiresIn: '7d' });

     //automatically create its profile as well, even if empty
    await newUser.createProfile();    

    return { token, user: newUser };
  },
};

export default signupMutation;
