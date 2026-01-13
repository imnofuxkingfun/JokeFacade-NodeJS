import { GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql';
import artistType from '../types/artistType.js';
import artistInputType from '../types/artistInputType.js';
import { Artist, Song } from '../database.js';

const createArtistMutation = {
  type: artistType,
  args: {
    input: { type: new GraphQLNonNull(artistInputType) },
    song_ids: { type: new GraphQLList(GraphQLInt) },
  },
  async resolve(_, { input, song_ids, }, context) {
    
    //user must be admin to add an artist
    if (!context.user || !context.isAdmin) {
      throw new Error('Unauthorized: only admins can add artists');
    }

    const artist = await Artist.create(input);

    
    if (song_ids && song_ids.length > 0) {
      const songs = await Song.findAll({ where: { id: song_ids } });
      await artist.addSongs(songs);
    }
    
    return artist;
  },
};

export default createArtistMutation;
