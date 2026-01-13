import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

const ArtistType = new GraphQLObjectType({
    name: 'Artist',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
    })
});

export default ArtistType;