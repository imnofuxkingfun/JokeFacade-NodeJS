import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

const RoleType = new GraphQLObjectType({
  name: 'Role',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  })
});

export default RoleType;