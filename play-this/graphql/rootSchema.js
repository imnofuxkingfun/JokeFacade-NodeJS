import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import roleQuery from './queries/roleQuery.js';
import rolesQuery from './queries/rolesQuery.js';
import artistQuery from './queries/artistQuery.js';
import artistsQuery from './queries/artistsQuery.js';
import songQuery from './queries/songQuery.js';
import songsQuery from './queries/songsQuery.js';
import userLikedSongsQuery from './queries/userLikedSongsQuery.js';
import userQuery from './queries/userQuery.js';
import usersQuery from './queries/usersQuery.js';
import blogQuery from './queries/blogQuery.js';
import blogsQuery from './queries/blogsQuery.js';

import signupMutation from './mutations/signupMutation.js';
import loginMutation from './mutations/loginMutation.js';
import createRoleMutation from './mutations/createRoleMutation.js';
import deleteRoleMutation from './mutations/deleteRoleMutation.js';
import editRoleMutation from './mutations/editRoleMutation.js';
import createSongMutation from './mutations/createSongMutation.js';
import deleteSongMutation from './mutations/deleteSongMutation.js';
import editSongMutation from './mutations/editSongMutation.js';
import createGenreMutation from './mutations/createGenreMutation.js';
import deleteGenreMutation from './mutations/deleteGenreMutation.js';
import editGenreMutation from './mutations/editGenreMutation.js';
import createArtistMutation from './mutations/createArtistMutation.js';
import deleteArtistMutation from './mutations/deleteArtistMutation.js';
import editArtistMutation from './mutations/editArtistMutation.js';
import editProfileMutation from './mutations/editProfileMutation.js';
import createBlogMutation from './mutations/createBlogMutation.js';
import deleteBlogMutation from './mutations/deleteBlogMutation.js';
import editBlogMutation from './mutations/editBlogMutation.js';
import createCommentMutation from './mutations/createCommentMutation.js';
import deleteCommentMutation from './mutations/deleteCommentMutation.js';
import editCommentMutation from './mutations/editCommentMutation.js';
import deleteUserMutation from './mutations/deleteUserMutation.js';
import editUserMutation from './mutations/editUserMutation.js';


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
    user: userQuery,
    users: usersQuery,
    blog: blogQuery,
    blogs: blogsQuery,
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    signup: signupMutation,
    login: loginMutation,
    createRole: createRoleMutation,
    deleteRole: deleteRoleMutation,
    editRole: editRoleMutation,
    createSong: createSongMutation,
    deleteSong: deleteSongMutation,
    editSong: editSongMutation,
    createGenre: createGenreMutation,
    deleteGenre: deleteGenreMutation,
    editGenre: editGenreMutation,
    createArtist: createArtistMutation,
    deleteArtist: deleteArtistMutation,
    editArtist: editArtistMutation,
    editProfile: editProfileMutation,
    createBlog: createBlogMutation,
    deleteBlog: deleteBlogMutation,
    editBlog: editBlogMutation,
    createComment: createCommentMutation,
    deleteComment: deleteCommentMutation,
    editComment: editCommentMutation,
    deleteUser: deleteUserMutation,
    editUser: editUserMutation,
  }
});

export const rootSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});