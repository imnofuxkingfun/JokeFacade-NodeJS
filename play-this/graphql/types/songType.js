import { GraphQLInt, GraphQLID, GraphQLString, GraphQLObjectType } from "graphql";

const songType = new GraphQLObjectType({
    name: 'Song',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        length: { type: GraphQLInt}
    })
});

export default songType;