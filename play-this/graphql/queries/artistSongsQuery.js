import ArtistSongsType from "../types/artistSongsType.js";
import {  GraphQLID } from "graphql";
import { Artist, Song, SongArtist } from "../database.js";

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

        const songLinks = await SongArtist.findAll({ where: { artist_id: args.artistId } });
        const songs = await Promise.all(songLinks.map((songLink)=> Song.findByPk(songLink.song_id)));

        return{
            artist: artist,
            songs: songs
        }
    }
}

export default artistSongsQuery;