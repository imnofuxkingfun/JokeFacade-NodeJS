import { GraphQLNonNull, GraphQLInt } from 'graphql';
import songType from '../types/songType.js';
import { Song } from '../database.js';

const deleteSongMutation = {
  type: songType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(_, { id }, context) {

    //only admin can delete songs
    if (!context.user || !context.isAdmin) {
        throw new Error('Unauthorized: only admins can delete songs');
    }

    const song = await Song.findByPk(id);
    if (!song) {
      throw new Error('Song not found');
    }
    await song.destroy();
    return song;
  },
};

export default deleteSongMutation;
