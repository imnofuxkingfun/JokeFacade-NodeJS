import ArtistSongsType from "../types/artistSongsType.js";
import {  GraphQLID } from "graphql";
import { Artist, Song } from "../database.js";

const artistSongsQuery = {
    type: ArtistSongsType,
    args: {
        artistId: { type: GraphQLID }
    },
    resolve: async (parent, args) => {
        const artist = await Artist.findByPk(args.artistId);
        if (!artist) {
            throw new Error('Artist not found');
        }

        const songs = await artist.getSongs();

        return{
            artist: artist,
            songs: songs
        }
    }
}

export default artistSongsQuery;