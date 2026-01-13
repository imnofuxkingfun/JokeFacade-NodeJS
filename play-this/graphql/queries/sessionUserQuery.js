import UserType from '../types/userType.js';
import { GraphQLString } from 'graphql';

// this query retrieves the user information from the JWT token in the context
const sessionUserQuery = {
    type: UserType,
    args: {
        token: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        return context.user;
    }
}

export default sessionUserQuery;