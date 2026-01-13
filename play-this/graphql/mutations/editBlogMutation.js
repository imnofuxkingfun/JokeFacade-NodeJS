import { GraphQLNonNull, GraphQLInt } from 'graphql';
import blogType from '../types/blogType.js';
import blogInputType from '../types/blogInputType.js';
import { Blog, User, Song, Comment } from '../database.js';

const editBlogMutation = {
  type: blogType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    input: { type: new GraphQLNonNull(blogInputType) },
  },
  async resolve(_, { id, input }, context) {

    const blog = await Blog.findByPk(id);
    if (!blog) {
      throw new Error('Blog not found');
    }

    //check if user is logged in
    if (!context.user) {
      throw new Error('Unauthorized: you must be logged in to edit a blog');
    }
    
    // check if user owns the blog 
    if (blog.user_id !== context.user?.id) {
      throw new Error('Unauthorized: can only edit your own blog');
    }
    
    await blog.update({
      text: input.text,
      review: input.review,
    });
    
    return await blog.reload({
      include: [{ model: User }, { model: Song }, { model: Comment }]
    });
  },
};

export default editBlogMutation;
