import graphql from 'graphql';
import userType from '../types/userType.js';
import {findEntity} from '../../fakeDb.js';
import context from '../../context.js';

const { GraphQLInt } = graphql;


const userQueryResolver = (_, { id }) => {
    return context.db.users.findUnique({ 
        select: {
            id: true,
            username: true,
        },
        where: { id } }) || null;
};

const userQuery = {
    type: userType,
    args: {
        id: { type: GraphQLInt }
    },
    resolve: userQueryResolver
};

export default userQuery;