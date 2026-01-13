import { GraphQLList } from 'graphql';
import ArtistType from '../types/artistType.js';
import { Artist } from '../database.js';

const artistsQuery = {
    type: new GraphQLList(ArtistType),
    resolve: async () => {
        return await Artist.findAll();
    }
}

export default artistsQuery;