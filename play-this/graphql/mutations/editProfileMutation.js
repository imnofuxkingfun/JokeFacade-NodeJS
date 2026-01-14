import { GraphQLNonNull, GraphQLInt } from 'graphql';
import profileType from '../types/profileType.js';
import profileInputType from '../types/profileInputType.js';
import { Profile } from '../database.js';

const editProfileMutation = {
  type: profileType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    input: { type: new GraphQLNonNull(profileInputType) },
  },
  async resolve(_, { id, input }, context) {

    const profile = await Profile.findByPk(id);
    if (!profile) {
      throw new Error('Profile not found');
    }

    //only owners   can edit profiles
    if (!context.user || (context.user.id !== id)) {
        throw new Error('Unauthorized: only owners can edit profiles');
    }
   
    
    await profile.update(input);
    return profile;
  },
};

export default editProfileMutation;
