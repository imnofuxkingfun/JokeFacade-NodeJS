import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } from 'graphql';

const profileType = new GraphQLObjectType({
    name: 'ProfileType',
    fields: () => ({
        user_id: { type: GraphQLID }, //id = user id
        display_name: { type: GraphQLString },
        dob: { type: GraphQLString },
        bio: { type: GraphQLString },
    }),
});

export default profileType;