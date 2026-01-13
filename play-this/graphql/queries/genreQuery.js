import { GraphQLID, GraphQLNonNull } from 'graphql';
import GenreType from '../types/genreType.js';
import { Genre } from '../database.js';

const genreQuery = {
    type: GenreType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (parent, args) => {
        return await Genre.findByPk(args.id);
    }
};

export default genreQuery;