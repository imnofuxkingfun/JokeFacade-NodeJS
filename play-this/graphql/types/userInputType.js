import { GraphQLInputObjectType, GraphQLString, GraphQLInt } from 'graphql';

const userInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: () => ({
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

export default userInputType;