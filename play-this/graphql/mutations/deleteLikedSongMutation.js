import { GraphQLList, GraphQLID } from "graphql";
import songType from "../types/songType.js";
import { UserLikedSong } from "../database.js";

const deleteLikedSongMutation = {
    type: new GraphQLList(songType),
    args: {
        songId: { type: GraphQLID},
    },
    resolve: async (_, { songId }, context) => {
        //only admin can delete songs
    if (!context.user) {
        throw new Error('Unauthorized: you must be logged in to unlike a song');
    }

    const song = await UserLikedSong.findOne({
        where: {
            user_id: context.user.id,
            song_id: songId
        }
    });

    if (!song) {
      throw new Error('Song not found');
    }
    await song.destroy();

    const likedSongs = await UserLikedSong.findAll({
            where: { user_id: context.user.id }
        });

    return likedSongs;
    }
}

export default deleteLikedSongMutation;