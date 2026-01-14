import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import GenreType from './genreType.js';
import songType from './songType.js';

const GenreDisplayType = new GraphQLObjectType({
  name: 'GenreDisplay',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    subgenres: { type: new GraphQLList(GenreType),
        resolve: async (genre) => {
            return await genre.getSubgenres();
        }
     },
     songs: { type: new GraphQLList(songType),
        resolve: async (genre) => {
            return await genre.getSongs();
        }
      }
  })
});

export default GenreDisplayType;