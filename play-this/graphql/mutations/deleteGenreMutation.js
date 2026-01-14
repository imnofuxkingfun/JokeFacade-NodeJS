import { GraphQLNonNull, GraphQLInt } from 'graphql';
import genreType from '../types/genreType.js';
import { Genre } from '../database.js';

const deleteGenreMutation = {
  type: genreType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(_, { id }, context) {
    const genre = await Genre.findByPk(id);
    if (!genre) {
      throw new Error('Genre not found');
    }

    
    //only admin can delete genres
    if (!context.user || !context.isAdmin) {
        throw new Error('Unauthorized: only admins can delete genres');
    }

    
    await genre.destroy();
    return genre;
  },
};

export default deleteGenreMutation;
