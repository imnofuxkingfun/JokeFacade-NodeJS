import { resolve } from "path";
import { GraphQLID, GraphQLNonNull } from "graphql";
import ArtistType from "../types/artistType.js";
import {Artist, SongArtist } from "../database.js";

const songArtistQuery = {
    type: ArtistType,
    args: {
        songId: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (parent, args) => {
        const artist = await Artist.findByPk(
            (await SongArtist.findOne({ where: { song_id: args.songId } })).artist_id
        )

        if(!artist){
            throw new Error('Artist not found for the given song');
        }
        return artist;
    }
}

export default songArtistQuery;