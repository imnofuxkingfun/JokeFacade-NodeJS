import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLList, GraphQLInt } from 'graphql';

const songInputType = new GraphQLInputObjectType({
  name: 'SongInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    length: { type: new GraphQLNonNull(GraphQLFloat) },
    genre_ids: { type: new GraphQLList(GraphQLInt) },
    artist_ids: { type: new GraphQLList(GraphQLInt) },
  })
});

export default songInputType;
