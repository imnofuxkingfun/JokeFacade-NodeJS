import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

const roleInputType = new GraphQLInputObjectType({
  name: 'RoleInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
  })
});

export default roleInputType;
