import { GraphQLNonNull, GraphQLInt } from 'graphql';
import roleType from '../types/roleType.js';
import roleInputType from '../types/roleInputType.js';
import { Role } from '../database.js';

const editRoleMutation = {
  type: roleType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    input: { type: new GraphQLNonNull(roleInputType) },
  },
  async resolve(_, { id, input }, context) {

    const role = await Role.findByPk(id);
    if (!role) {
      throw new Error('Role not found');
    }

    //only admin can edit roles
    if (!context.user || !context.isAdmin) {
        throw new Error('Unauthorized: only admins can edit roles');
    }
    
    await role.update(input);
    return role;
  },
};

export default editRoleMutation;
