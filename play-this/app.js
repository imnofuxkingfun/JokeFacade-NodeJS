// index.js
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLSchema } from 'graphql';
import queryType from './graphql/rootTypes/queryType.js'
import mutationType from './graphql/rootTypes/mutationType.js'
//import { PrismaClient } from './prisma/generated/client';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});
const prisma = new PrismaClient({ adapter });

const server = new ApolloServer({
  schema: new GraphQLSchema({ query: queryType, mutation: mutationType })
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ db: prisma }),
});