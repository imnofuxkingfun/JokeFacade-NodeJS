import { GraphQLID, GraphQLNonNull } from 'graphql';
import GenreDisplayType from '../types/genreDisplayType.js';
import { Genre } from '../database.js';

const genreDisplayQuery = {
    type: GenreDisplayType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (parent, args) => {
        return await Genre.findByPk(args.id);
    }
};

export default genreDisplayQuery;