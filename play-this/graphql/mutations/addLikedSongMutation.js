import { GraphQLList, GraphQLID } from "graphql";
import songType from "../types/songType.js";
import { Song, UserLikedSong } from '../database.js';

const addLikedSongMutation = {
    type: new GraphQLList(songType),
    args: {
        songId: { type: GraphQLID},
    },
    resolve: async (_, { songId }, context) => {

        const song = await Song.findByPk(songId);
        if (!song) {
            throw new Error('Song not found');
        }

        const user = context.user;
        if (!user) {
            throw new Error('Unauthorized: you must be logged in to like a song');
        }

        console.log("user id:", user.id);

        try{
            await UserLikedSong.create({
                user_id: user.id,
                song_id: song.id
            });
        }
        catch(error){
            throw new Error('Error adding liked song: ' + error.message);
        }
        
        const likedSongs = await UserLikedSong.findAll({
            where: { user_id: user.id }
        });

        return likedSongs;
    }
}

export default addLikedSongMutation;