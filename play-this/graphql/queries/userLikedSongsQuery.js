import { GraphQLID, GraphQLNonNull } from 'graphql';
import userLikedSongsType from '../types/userLikedSongsType.js';
import { UserLikedSong } from '../database.js';

const userLikedSongsQuery = {
    type: userLikedSongsType,
    args: {
        userId: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (parent, args) => {
        return await UserLikedSong.findAll({ where: { id_user: args.userId } });
    }
}

export default userLikedSongsQuery;