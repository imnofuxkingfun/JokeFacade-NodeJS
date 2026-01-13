import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

const genreInputType = new GraphQLInputObjectType({
  name: 'GenreInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
  })
});

export default genreInputType;
