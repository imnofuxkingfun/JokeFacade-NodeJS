import graphql from 'graphql'

const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const userType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: GraphQLInt },
		username: { type: GraphQLString },
	},
});

export default userType;