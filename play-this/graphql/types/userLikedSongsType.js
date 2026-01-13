import { GraphQLList, GraphQLObjectType } from "graphql";
import songType from "./songType.js";

const userLikedSongsType = new GraphQLObjectType({
    name: 'UserLikedSongs',
    fields: () => ({
        songs: { type: new GraphQLList(songType) }
    })
})

export default userLikedSongsType;