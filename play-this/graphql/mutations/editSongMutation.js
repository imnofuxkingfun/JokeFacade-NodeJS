import { GraphQLNonNull, GraphQLInt } from 'graphql';
import songType from '../types/songType.js';
import songInputType from '../types/songInputType.js';
import { Song, Genre, Artist } from '../database.js';

const editSongMutation = {
  type: songType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    input: { type: new GraphQLNonNull(songInputType) },
  },
  async resolve(_, { id, input }, context) {

    //only admin can edit songs
    if (!context.user || !context.isAdmin) {
        throw new Error('Unauthorized: only admins can edit songs');
    }

    const song = await Song.findByPk(id);
    if (!song) {
      throw new Error('Song not found');
    }
    
    await song.update({
      name: input.name,
      length: input.length,
    });
    
    if (input.genre_ids && input.genre_ids.length > 0) {
      const genres = await Genre.findAll({ where: { id: input.genre_ids } });
      await song.setGenres(genres);
    }
    
    if (input.artist_ids && input.artist_ids.length > 0) {
      const artists = await Artist.findAll({ where: { id: input.artist_ids } });
      await song.setArtists(artists);
    }
    
    return song;
  },
};

export default editSongMutation;
