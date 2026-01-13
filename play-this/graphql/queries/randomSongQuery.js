import songType from "../types/songType.js";
import { Song } from '../database.js';
import { Sequelize } from "sequelize";
const randomSongQuery = {
    type: songType,
    resolve: async (_, args, context) => {
        // Fetch a random song from the database
       const user = context.user;
       if (!user) {
           throw new Error('Unauthorized: you must be logged in to get a random song');
       }

       const randomSong = await Song.findOne(
        { order: Sequelize.literal('RANDOM()') }
       );
       
       return randomSong;
    }
}

export default randomSongQuery;