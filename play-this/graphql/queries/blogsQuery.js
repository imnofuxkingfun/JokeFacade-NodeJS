import { GraphQLList } from 'graphql';
import blogTypes from '../types/blogType.js';
import { Blog, User, Song, Comment } from '../database.js';

const blogsQuery = {
    type: new GraphQLList(blogTypes),
    args: {},
    resolve: async () => {
        return await Blog.findAll({
            order: [['date', 'DESC']],
            include: [
                { model: User },
                { model: Song },
                { model: Comment, include: [User] }
            ]
        });
    }
};

export default blogsQuery;