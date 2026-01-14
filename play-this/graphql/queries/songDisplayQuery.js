import { GraphQLID, GraphQLNonNull } from 'graphql';
import SongDisplayType from '../types/songDisplayType.js';
import { Song, Artist, Blog, User, Comment } from '../database.js';

const songDisplayQuery = {
  type: SongDisplayType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: async (_, args) => {
    return await Song.findByPk(args.id, {
      include: [
        { model: Artist },                         // eager loading
        { model: Blog, include: [User, {model: Comment, include: [User]}] } 
      ]
    });
  }
};

export default songDisplayQuery;