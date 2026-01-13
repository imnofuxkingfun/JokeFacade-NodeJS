import { GraphQLNonNull, GraphQLInt } from 'graphql';
import userType from '../types/userType.js';
import userInputType from '../types/userInputType.js';
import { User } from '../database.js';

const editUserMutation = {
  type: userType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    input: { type: new GraphQLNonNull(userInputType) },
  },
  async resolve(_, { id, input }, context) {

    //only owners can edit users
    if (!context.user || (context.user.id !== id)) {
        throw new Error('Unauthorized: can only edit your own profile');
    }

    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Check if user is editing themselves
    if (user.id !== context.user?.id) {
      throw new Error('Unauthorized: can only edit your own profile');
    }
    
    await user.update(input);
    return user;
  },
};

export default editUserMutation;
