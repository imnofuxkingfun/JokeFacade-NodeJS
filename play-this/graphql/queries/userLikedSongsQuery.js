import {GraphQLList } from 'graphql';
import songType from '../types/songType.js';
import { Song } from '../database.js';
import { UserLikedSong } from '../database.js';

const userLikedSongsQuery = {
    type: new GraphQLList(songType),
    resolve: async (parent, args, context) => {
        const id = context.user.id; //if userId isnt provided, get user from jwt context
        const likedSongs = await UserLikedSong.findAll({ 
            where: { user_id: id },
            include: [{ model: Song, as: 'song' }]
        });
        return likedSongs.map(likedSong => likedSong.song);
    }
}

export default userLikedSongsQuery;