import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

const userDisplayType = new GraphQLObjectType({
  name: 'UserDisplay',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
  })
});

export default userDisplayType;