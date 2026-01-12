import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import roleQuery from './queries/roleQuery.js';
import rolesQuery from './queries/rolesQuery.js';
import signupMutation from './mutations/signupMutation.js';
import loginMutation from './mutations/loginMutation.js';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    role: roleQuery, 
    roles: rolesQuery
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