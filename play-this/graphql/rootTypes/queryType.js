import graphql from 'graphql';
// import userQuery from '../queries/userQuery.js sau eventual queries/users/userQuery.js daca avem prea multe

const queryType = new graphql.GraphQLObjectType({
    name: "Query",
    fields: {
        //ex: user : userQuery,
    },
});


export default queryType;