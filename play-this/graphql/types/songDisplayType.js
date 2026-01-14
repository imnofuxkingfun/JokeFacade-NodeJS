import { GraphQLFloat, GraphQLID, GraphQLString, GraphQLObjectType, GraphQLList } from "graphql";
import ArtistType from "./artistType.js";
import BlogType from "./blogType.js";
import { User, Comment } from '../database.js';

const songDisplayType = new GraphQLObjectType({
    name: 'SongDisplay',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        length: { type: GraphQLFloat},
        spotifyLink: { type: GraphQLString },
        artists:{
            type: new GraphQLList(ArtistType),
            resolve: async (song) => {
                return await song.getArtists();
            }
        },
        blogs:{
            type: new GraphQLList(BlogType),
            resolve: async (song) => {
                return await song.getBlogs({
                    include: [{ model: User }, { model: Comment , include: [User] }]
                });
            }
        }
    })
});

export default songDisplayType;