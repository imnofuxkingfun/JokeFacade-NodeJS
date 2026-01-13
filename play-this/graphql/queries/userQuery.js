import { GraphQLID } from 'graphql';
import UserType from '../types/userType.js';
import { User, Role } from '../database.js';

const userQuery = {
    type: UserType,
    args: {
        id: { type: GraphQLID }
    },
    resolve: async (parent, args, context) => {
        const id = args.id || context.user.id; // if id isn't provided, get user from jwt context
        return await User.findByPk(id, {
            include: [{ model: Role }]
        });
    }
};

export default userQuery;