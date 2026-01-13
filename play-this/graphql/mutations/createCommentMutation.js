import { GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';
import commentType from '../types/commentType.js';
import { Comment } from '../database.js';

const createCommentMutation = {
  type: commentType,
  args: {
    blog_id: { type: new GraphQLNonNull(GraphQLInt) },
    text: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { blog_id, text }, context) {
    //user must be logged in to create a comment
    if (!context.user) {
      throw new Error('Unauthorized: you must be logged in to create a comment');
    }

    const user_id = context.user.id; // get user id from jwt context
    const comment = await Comment.create({ user_id, blog_id, text });
    return comment;
  },
};

export default createCommentMutation;
