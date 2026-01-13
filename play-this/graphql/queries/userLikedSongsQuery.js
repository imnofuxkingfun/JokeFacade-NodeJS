import { GraphQLID, GraphQLNonNull } from 'graphql';
import userLikedSongsType from '../types/userLikedSongsType.js';
import { UserLikedSong } from '../database.js';

const userLikedSongsQuery = {
    type: userLikedSongsType,
    args: {
        userId: { type: GraphQLID }
    },
    resolve: async (parent, args, context) => {
        const id = args.userId || context.user.id_user; //if userId isnt provided, get user from jwt context
        return await UserLikedSong.findAll({ where: { id_user: id } });
    }
}

export default userLikedSongsQuery;