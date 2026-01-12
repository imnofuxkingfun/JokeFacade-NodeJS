import { GraphQLID, GraphQLNonNull } from 'graphql';
import RoleType from '../types/roleType.js';
import { Role } from '../database.js'; 

const roleQuery = {
  type: RoleType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: async (parent, args) => {
    // Sequelize logic replaces the fakeDb call
    return await Role.findByPk(args.id);
  }
};

export default roleQuery;