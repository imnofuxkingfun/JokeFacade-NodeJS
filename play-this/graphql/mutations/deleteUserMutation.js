import { GraphQLNonNull, GraphQLInt } from 'graphql';
import userType from '../types/userType.js';
import { User } from '../database.js';

const deleteUserMutation = {
  type: userType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(_, { id }, context) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    //only admin or owner can delete users
    if (!context.user || (context.user.id !== id && !context.isAdmin)) {
        throw new Error('Unauthorized: only admins or owners can delete users');
    }
    
    await user.destroy();
    return user;
  },
};

export default deleteUserMutation;
