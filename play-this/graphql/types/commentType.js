import {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } from 'graphql';

const commentType = new GraphQLObjectType({
    name: 'CommentType',
    fields: () => ({
        id: { type: GraphQLID },
        user_id: { type: GraphQLInt },
        blog_id: { type: GraphQLInt },
        text: { type: GraphQLString },
        date: { type: GraphQLString },
    }),
});

export default commentType;
