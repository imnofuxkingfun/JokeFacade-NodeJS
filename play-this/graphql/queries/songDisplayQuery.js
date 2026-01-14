import { GraphQLID, GraphQLNonNull } from 'graphql';
import SongDisplayType from '../types/songDisplayType.js';
import { Song } from '../database.js';

const songDisplayQuery = {
    type: SongDisplayType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (parent, args) => {
        return await Song.findByPk(args.id);
    }
};

export default songDisplayQuery;