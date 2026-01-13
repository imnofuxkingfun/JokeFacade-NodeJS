import { GraphQLNonNull, GraphQLInt } from 'graphql';
import blogType from '../types/blogType.js';
import blogInputType from '../types/blogInputType.js';
import { Blog } from '../database.js';

const createBlogMutation = {
  type: blogType,
  args: {
    input: { type: new GraphQLNonNull(blogInputType) },
    song_id: { type: GraphQLInt },
  },
  async resolve(_, { input, song_id }, context) {
    const user_id = context.user.id; // get user id from jwt context
    const blog = await Blog.create({ user_id, ...input, song_id });
    return blog;
  },
};

export default createBlogMutation;
