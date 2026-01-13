import { GraphQLNonNull, GraphQLString } from 'graphql';
import roleType from '../types/roleType.js';
import { Role } from '../database.js';

const createRoleMutation = {
  type: roleType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { name }, context) {
    //only admin can create roles
    if (!context.user || !context.isAdmin) {
        throw new Error('Unauthorized: only admins can create roles');
    }

    const existing = await Role.findOne({ where: { name } });
    if (existing) {
      throw new Error('Role name already exists');
    }
    const role = await Role.create({ name });
    return role;
  },
};

export default createRoleMutation;
