import { GraphQLList } from 'graphql';
import RoleType from '../types/roleType.js';
import { Role } from '../database.js'; 

const rolesQuery = {
  type: new GraphQLList(RoleType),
  args: {
  },
  resolve: async () => {
    return await Role.findAll();
  }
};

export default rolesQuery;