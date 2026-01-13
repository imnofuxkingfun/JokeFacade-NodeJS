import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import roleQuery from './queries/roleQuery.js';
import { Role, UserLikedSong } from './database.js';
import RoleType from './types/roleType.js';
import rolesQuery from './queries/rolesQuery.js';
import artistQuery from './queries/artistQuery.js';
import artistsQuery from './queries/artistsQuery.js';
import songQuery from './queries/songQuery.js';
import songsQuery from './queries/songsQuery.js';
import userLikedSongsQuery from './queries/userLikedSongsQuery.js';
import signupMutation from './mutations/signupMutation.js';
import loginMutation from './mutations/loginMutation.js'
import usersQuery from './queries/usersQuery.js';

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
    users: usersQuery,
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    signup: signupMutation,
    login: loginMutation,
  }
});

export const rootSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});