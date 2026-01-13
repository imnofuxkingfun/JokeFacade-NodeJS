import { GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql';
import songType from '../types/songType.js';
import songInputType from '../types/songInputType.js';
import { Song, Genre, Artist } from '../database.js';

const createSongMutation = {
  type: songType,
  args: {
    input: { type: new GraphQLNonNull(songInputType) },
  },
  async resolve(_, { input }, context) {
    //only admin can create songs
    if (!context.user || !context.isAdmin) {
        throw new Error('Unauthorized: only admins can create songs');
    }

    const song = await Song.create(input);
    
    if (input.genre_ids && input.genre_ids.length > 0) {
      const genres = await Genre.findAll({ where: { id: input.genre_ids } });
      await song.addGenres(genres);
    }
    
    if (input.artist_ids && input.artist_ids.length > 0) {
      const artists = await Artist.findAll({ where: { id: input.artist_ids } });
      await song.addArtists(artists);
    }
    
    return song;
  },
};

export default createSongMutation;