import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

const artistInputType = new GraphQLInputObjectType({
  name: 'ArtistInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
  })
});

export default artistInputType;
