// index.js
import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
import queryType from './graphql/rootTypes/queryType.js'
import mutationType from './graphql/rootTypes/mutationType.js'
import context from './graphql/context.js';

const server = new ApolloServer({
  queryType,
  //mutationType,
  context,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});