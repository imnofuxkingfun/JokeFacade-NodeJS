import { GraphQLList } from 'graphql';
import UserType from '../types/userType.js';
import { User, Role } from '../database.js';

const usersQuery = {
    type: new GraphQLList(UserType),
    args: {},
    resolve: async () => {
        return await User.findAll({
            include: [{ model: Role }]
        });
    }
};

export default usersQuery;