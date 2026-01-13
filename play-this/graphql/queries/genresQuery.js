import { GraphQLList } from 'graphql';
import GenreType from '../types/genreType.js';
import { Genre } from '../database.js';

const genresQuery = {
    type: new GraphQLList(GenreType),
    resolve: async () => {
        return await Genre.findAll();
    }
}

export default genresQuery;