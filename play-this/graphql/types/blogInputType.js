import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';

const blogInputType = new GraphQLInputObjectType({
  name: 'BlogInput',
  fields: () => ({
    text: { type: new GraphQLNonNull(GraphQLString) },
    review: { type: GraphQLInt },
  })
});

export default blogInputType;