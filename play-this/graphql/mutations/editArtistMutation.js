import { GraphQLNonNull, GraphQLInt } from 'graphql';
import artistType from '../types/artistType.js';
import artistInputType from '../types/artistInputType.js';
import { Artist } from '../database.js';

const editArtistMutation = {
  type: artistType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    input: { type: new GraphQLNonNull(artistInputType) },
  },
  async resolve(_, { id, input }, context) {

    const artist = await Artist.findByPk(id);
    if (!artist) {
      throw new Error('Artist not found');
    }
    
    //only admin can edit artists
    if (!context.user || !context.isAdmin) {
        throw new Error('Unauthorized: only admins can edit artists');
    }
    
    
    await artist.update(input);
    return artist;
  },
};

export default editArtistMutation;
