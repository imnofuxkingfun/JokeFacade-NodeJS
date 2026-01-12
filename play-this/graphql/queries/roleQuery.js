import graphql from 'graphql';
import roleType from '../types/roleType.js';
const { GraphQLInt } = graphql;

const roleQueryResolver = async (_, { id }, context) => {
    const { db } = context; 
    
    return await db.Role.findByPk(id, {
        attributes: ['id', 'name']
    });
};

const roleQuery = {
    type: roleType,
    args: {
        id: { type: GraphQLInt }
    },
    resolve: roleQueryResolver
};

export default roleQuery;