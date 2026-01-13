import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';
import roleQuery from './queries/roleQuery.js';
import { Role, UserLikedSong } from './database.js';
import RoleType from './types/roleType.js';
import rolesQuery from './queries/rolesQuery.js';
import artistQuery from './queries/artistQuery.js';
import artistsQuery from './queries/artistsQuery.js';
import songQuery from './queries/songQuery.js';
import songsQuery from './queries/songsQuery.js';
import userLikedSongsQuery from './queries/userLikedSongsQuery.js';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    role: roleQuery, 
    roles: rolesQuery,
    artist: artistQuery,
    artists: artistsQuery,
    song: songQuery,
    songs: songsQuery,
    likedSongs: userLikedSongsQuery,
  }
});

export const rootSchema = new GraphQLSchema({
  query: RootQuery
});