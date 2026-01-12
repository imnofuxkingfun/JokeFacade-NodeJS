import { GraphQLID, GraphQLNonNull } from 'graphql';
import RoleType from '../types/roleType.js';
import { Role } from '../database.js'; 

const roleQuery = {
  type: RoleType,
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (parent, args, context) => {
    const id = args.id || context.user.role_id; //if id isnt provided, get user from jwt context
    return await Role.findByPk(id);
  }
};

export default roleQuery;