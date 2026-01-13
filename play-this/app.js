// index.js
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { rootSchema } from './graphql/rootSchema.js';
import {sequelize} from './graphql/database.js';
import { createContext } from './graphql/context.js';


const server = new ApolloServer({
  schema: rootSchema,
});

// Sync DB and start server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    
    await sequelize.sync({ alter: true });
    console.log('Database synced!');
    
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context: createContext,
    });

    console.log(`Server ready at: ${url}`);
  } catch (err) {
    console.error('Error starting server', err);
  }
}

startServer();