import { GraphQLID, GraphQLNonNull } from 'graphql';
import SongType from '../types/songType.js';
import { Song } from '../database.js';

const songQuery = {
    type: SongType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (parent, args) => {
        return await Song.findByPk(args.id);
    }
};

export default songQuery;