import { GraphQLNonNull, GraphQLInt } from 'graphql';
import artistType from '../types/artistType.js';
import { Artist } from '../database.js';

const deleteArtistMutation = {
  type: artistType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(_, { id }, context) {

    //only admin can delete artists
    if (!context.user || !context.isAdmin) {
        throw new Error('Unauthorized: only admins can delete artists');
    }

    const artist = await Artist.findByPk(id);
    if (!artist) {
      throw new Error('Artist not found');
    }
    await artist.destroy();
    return artist;
  },
};

export default deleteArtistMutation;
