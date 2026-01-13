import { GraphQLNonNull, GraphQLInt } from 'graphql';
import roleType from '../types/roleType.js';
import { Role } from '../database.js';

const deleteRoleMutation = {
  type: roleType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(_, { id }, context) {

    //only admin can delete roles
    if (!context.user || !context.isAdmin) {
        throw new Error('Unauthorized: only admins can delete roles');
    }

    const role = await Role.findByPk(id);
    if (!role) {
      throw new Error('Role not found');
    }
    await role.destroy();
    return role;
  },
};

export default deleteRoleMutation;
