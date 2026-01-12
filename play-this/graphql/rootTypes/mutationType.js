import graphql from 'graphql';
// import createUserMutation from '../mutations/createUserMutation.js' sau eventual mutations/users/createUserMutation.js daca avem prea multe

const queryType = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields: {
        // ex createUser: createUserMutation,

    }
});


export default queryType;