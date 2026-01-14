import {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } from 'graphql';
import userDisplayType from './userDisplayType.js';

const commentType = new GraphQLObjectType({
    name: 'CommentType',
    fields: () => ({
        id: { type: GraphQLID },
        user: {type: userDisplayType,
            resolve: (parent) => parent.User
        },
        blog_id: { type: GraphQLInt },
        text: { type: GraphQLString },
        date: {
            type: GraphQLString,
            resolve: (parent) =>
                parent.date ? new Date(parent.date).toISOString() : null
            },
    }),
});

export default commentType;
