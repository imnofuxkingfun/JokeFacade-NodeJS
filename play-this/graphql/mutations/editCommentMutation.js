import { GraphQLNonNull, GraphQLInt } from 'graphql';
import commentType from '../types/commentType.js';
import commentInputType from '../types/commentInputType.js';
import { Comment } from '../database.js';

const editCommentMutation = {
  type: commentType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    input: { type: new GraphQLNonNull(commentInputType) },
  },
  async resolve(_, { id, input }, context) {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new Error('Comment not found');
    }
    
    // Check if user owns the comment
    if (comment.user_id !== context.user?.id) {
      throw new Error('Unauthorized: can only edit your own comment');
    }
    
    await comment.update(input);
    return comment;
  },
};

export default editCommentMutation;
