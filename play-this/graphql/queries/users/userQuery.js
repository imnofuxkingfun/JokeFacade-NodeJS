// import graphql from 'graphql';
// import userType from '../types/userType.js';
// const { GraphQLInt } = graphql;

// const userQueryResolver = async (_, { id }, context) => {
//     const { db } = context; 
    
//     return await db.User.findByPk(id, {
//         attributes: ['id', 'username']
//     });
// };

// const userQuery = {
//     type: userType,
//     args: {
//         id: { type: GraphQLInt }
//     },
//     resolve: userQueryResolver
// };

// export default userQuery;