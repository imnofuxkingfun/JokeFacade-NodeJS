import graphql from 'graphql';
// import userQuery from '../queries/userQuery.js sau eventual queries/users/userQuery.js daca avem prea multe
import roleQuery from '../queries/roleQuery.js';

const queryType = new graphql.GraphQLObjectType({
    name: "Query",
    fields: {
        role: roleQuery
    },
});


export default queryType;