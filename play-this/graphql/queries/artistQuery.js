import { GraphQLID, GraphQLNonNull } from 'graphql';
import ArtistType from '../types/artistType.js';
import { Artist } from '../database.js';

const artistQuery = {
    type: ArtistType,
    args: {
        artistId: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (parent, args) => {
        return await Artist.findByPk(args.artistId);
    }
}

export default artistQuery;