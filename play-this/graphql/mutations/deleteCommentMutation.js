import { GraphQLNonNull, GraphQLInt } from 'graphql';
import commentType from '../types/commentType.js';
import { Comment } from '../database.js';

const deleteCommentMutation = {
  type: commentType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(_, { id }, context) {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new Error('Comment not found');
    }

    //only admin or ownder can delete blogs
    if (!context.user || (!context.isAdmin && comment.user_id !== context.user.id)) {
        throw new Error('Unauthorized: only admins or owners can delete blogs');
    }


    await comment.destroy();
    return comment;
  },
};

export default deleteCommentMutation;
