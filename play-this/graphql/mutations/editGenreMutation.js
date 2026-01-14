import { GraphQLNonNull, GraphQLInt } from 'graphql';
import genreType from '../types/genreType.js';
import genreInputType from '../types/genreInputType.js';
import { Genre } from '../database.js';

const editGenreMutation = {
  type: genreType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    input: { type: new GraphQLNonNull(genreInputType) },
  },
  async resolve(_, { id, input }, context) {

    const genre = await Genre.findByPk(id);
    if (!genre) {
      throw new Error('Genre not found');
    }

    //only admin can edit genres
    if (!context.user || !context.isAdmin) {
        throw new Error('Unauthorized: only admins can edit genres');
    }
    
    await genre.update(input);
    return genre;
  },
};

export default editGenreMutation;
