import { GraphQLList } from 'graphql';
import SongType from '../types/songType.js';
import { Song } from '../database.js';

const songsQuery = {
    type: new GraphQLList(SongType),
    resolve: async () => {
        return await Song.findAll();
    }
};

export default songsQuery;