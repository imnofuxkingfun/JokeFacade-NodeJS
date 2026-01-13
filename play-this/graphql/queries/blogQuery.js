import blogType from "../types/blogType.js";
import { Blog, User, Song, Comment } from '../database.js';
import { GraphQLID, GraphQLNonNull } from "graphql";


const blogQuery = {
    type: blogType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (parent, args, context) => {
        return await Blog.findByPk(args.id, {
            include: [{ model: User }, { model: Song }, { model: Comment }]
        });
    }
};

export default blogQuery;