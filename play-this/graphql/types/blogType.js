import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from "graphql";
import { text } from "node:stream/consumers";
import songType from "./songType.js";
import userDisplayType from "./userDisplayType.js";
import CommentType from "./commentType.js";

const blogTypes = new GraphQLObjectType({
    name: 'Blog',
    fields: () => ({
        id : { type: GraphQLInt },
        user: {
            type: userDisplayType, 
            resolve: (parent) => parent.User
        },
        text: { type: GraphQLString },
        date: { type: GraphQLString },
        review: { type: GraphQLInt },
        song: { 
            type: songType,
            resolve: (parent) => parent.Song
         }, //from the song id
         comments: {
            type: new GraphQLList(CommentType),
            resolve: (parent) => parent.Comments
         }
    }),
});

export default blogTypes;