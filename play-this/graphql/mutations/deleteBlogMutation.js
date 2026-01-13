import { GraphQLNonNull, GraphQLInt } from 'graphql';
import blogType from '../types/blogType.js';
import { Blog } from '../database.js';

const deleteBlogMutation = {
  type: blogType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(_, { id }) {
    
    const blog = await Blog.findByPk(id);
    if (!blog) {
      throw new Error('Blog not found');
    }

    //only admin or ownder can delete blogs
    if (!context.user || (!context.isAdmin && blog.user_id !== context.user.id)) {
        throw new Error('Unauthorized: only admins or owners can delete blogs');
    }


    await blog.destroy();
    return blog;
  },
};

export default deleteBlogMutation;
