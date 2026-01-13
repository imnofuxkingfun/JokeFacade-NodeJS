import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

const GenreType = new GraphQLObjectType({
  name: 'Genre',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  })
});

export default GenreType;