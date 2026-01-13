import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

const commentInputType = new GraphQLInputObjectType({
  name: 'CommentInput',
  fields: () => ({
    text: { type: new GraphQLNonNull(GraphQLString) },
  })
});

export default commentInputType;
