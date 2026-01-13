import { GraphQLFloat, GraphQLID, GraphQLString, GraphQLObjectType } from "graphql";

const songType = new GraphQLObjectType({
    name: 'Song',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        length: { type: GraphQLFloat},
        spotifyLink: { type: GraphQLString },
    })
});

export default songType;