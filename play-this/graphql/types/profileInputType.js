import { GraphQLInputObjectType, GraphQLString } from 'graphql';

const profileInputType = new GraphQLInputObjectType({
  name: 'ProfileInput',
  fields: () => ({
    display_name: { type: GraphQLString },
    dob: { type: GraphQLString },
    bio: { type: GraphQLString },
  })
});

export default profileInputType;
