import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';
import roleQuery from './queries/roleQuery.js';
import { Role } from './database.js';
import RoleType from './types/roleType.js';
import rolesQuery from './queries/rolesQuery.js';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    role: roleQuery, 
    roles: rolesQuery
  }
});

export const rootSchema = new GraphQLSchema({
  query: RootQuery
});