import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { User } from '../database.js';
import AuthPayloadType from '../types/authPayloadType.js';

const JWT_SECRET = process.env.JWT_SECRET;

const loginMutation = {
  type: AuthPayloadType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, args, context) => {
    if(context.user){
      throw new Error('You are already logged in');
    }
    const { email, password } = args;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id, roleId: user.role_id }, JWT_SECRET, { expiresIn: '7d' });
    return { token, user };
  },
};

export default loginMutation;
