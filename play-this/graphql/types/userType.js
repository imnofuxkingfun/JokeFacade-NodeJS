import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } from 'graphql';
import RoleType from './roleType.js';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    role: { 
      type: RoleType,
      resolve: (parent) => parent.Role  
    },
  })
});

export default UserType;
