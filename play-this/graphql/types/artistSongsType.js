import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import ArtistType from './artistType.js';
import SongType from './songType.js';
const ArtistSongsType = new GraphQLObjectType({
    name: 'ArtistSongs',
    fields: () => ({
        artist: { type: ArtistType},
        songs: { type: new GraphQLList(SongType) },
    })
});

export default ArtistSongsType;