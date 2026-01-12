import graphql from 'graphql'

const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const roleType = new GraphQLObjectType({
	name: 'Role',
	fields: {
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
	},
});

export default roleType;