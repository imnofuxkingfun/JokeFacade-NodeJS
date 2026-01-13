import { GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';
import genreType from '../types/genreType.js';
import { Genre, Song } from '../database.js';

const createGenreMutation = {
  type: genreType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    parent_genre_id: { type: GraphQLInt },
    song_ids: { type: new GraphQLList(GraphQLInt) },
  },
  async resolve(_, { name, parent_genre_id, song_ids }, context) {
    //only admin can create genres
    if (!context.user || !context.isAdmin) {
        throw new Error('Unauthorized: only admins can create genres');
    }
     const genre = await Genre.create({ name, parent_genre_id });
    if (song_ids && song_ids.length > 0) {
      const songs = await Song.findAll({ where: { id: song_ids } });
      await genre.addSongs(songs);
    }
    
    return genre;
  },
};

export default createGenreMutation;
