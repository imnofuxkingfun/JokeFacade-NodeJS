import { GraphQLList } from 'graphql';
import UserType from '../types/userType.js';
import { User, Role } from '../database.js';

const usersQuery = {
    type: new GraphQLList(UserType),
    args: {},
    resolve: async (_, args, context) => {

        console.log("Context in usersQuery:", context);
        if(!context.user || context.isAdmmin === false) {
            throw new Error("Unauthorized");
        }

        return await User.findAll({
            include: [{ model: Role }]
        });
    }
};

export default usersQuery;