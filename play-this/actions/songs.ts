'use server';
import { NewSongSchema } from "@/lib/definitions";
import { getClient } from "@/lib/graphql-client";
import { gql } from "graphql-request";
import { cookies } from "next/headers";
import { z } from "zod";

export interface SongInterface {
    id: string;
    name: string;
    spotifyLink: string;
    length: number;
};

export interface ArtistInterface {
    id: string;
    name: string;
    description: string;
}

const RANDOM_SONG_QUERY = gql`
  query RandomSong {
    randomSong{
    id,
    name,
    spotifyLink,
    artists {
            id
            name
            description
        }
  }
}
`;

const LIKE_SONG_MUTATION = gql`
 mutation LikeSong($songId: ID!) {
  addLikedSong(songId: $songId) {
    id,
    name,
    spotifyLink
  }
}
`;

const LIKED_SONGS_QUERY = gql`
  query LikedSongs {
    likedSongs{
    id,
    name,
    spotifyLink
  }
}
`;

const DELETE_LIKED_SONG_MUTATION = gql`
mutation DeleteLikedSong($songId: ID!) {
  deleteLikedSong(songId: $songId) {
    id,
    name,
    spotifyLink
  }
}
`;

const SONG_ARTIST_QUERY = gql`
  query SongArtist($songId: ID!) {
    songArtist(songId: $songId) {
        id,
        name,
}}
`;

async function verifyUserSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) {
        console.error("Eroare: Utilizatorul nu este autentificat.");
        return { success: false, message: "Utilizatorul nu este autentificat." }
    }

    return { success: true };
}

async function getSongArtist(songId: number){
    const verification = await verifyUserSession();
    if (!verification.success) {
        return verification;
    }

    const client = await getClient();

    try{
        const data = await client.request(SONG_ARTIST_QUERY, { songId });
        return data.songArtist;
    }
    catch (error: any) {
        console.error("Eroare GraphQL:", error.response?.errors);
        return null;
    }
}

export async function getRandomSong() {
    const verification = await verifyUserSession();
    if (!verification.success) {
        return verification;
    }

    const client = await getClient();
    try {
        const data = await client.request(RANDOM_SONG_QUERY);
        const song = data.randomSong;
        const artists = data.randomSong.artists;
        
        return {
            ...song,
            artists: artists,
        };
    }
    catch (error: any) {
        console.error("Eroare GraphQL:", error.response?.errors);
        return null;
    }
}

export async function likeSong(song: SongInterface) {
    const verification = await verifyUserSession();
    if (!verification.success) {
        return verification;
    }

    const songId = song.id;
    const client = await getClient();
    try {
        const data = await client.request(LIKE_SONG_MUTATION, { songId: parseInt(songId) });

        return { success: true };
    }
    catch (error: any) {
        console.error("Eroare GraphQL:", error.response?.errors);
        return { success: false, message: "Eroare la salvarea melodiei." };
    }

}

export async function getAllLikedSongs() {
    const verification = await verifyUserSession();
    if (!verification.success) {
        return verification;
    }

    const client = await getClient();
    try {
        const data = await client.request(LIKED_SONGS_QUERY);

        console.log("Liked songs:", data.likedSongs);

        return data.likedSongs;
    }
    catch (error: any) {
        console.error("Eroare GraphQL:", error.response?.errors);
        return { success: false, message: "Eroare la salvarea melodiei." };
    }
}



export interface CommentInterface {
    id: string;
    text: string;
    date: string;
    user: {
        id: string;
        username: string;
    };
}

export interface BlogInterface {
    id: string;
    text: string;
    date: string;
    review: number;
    user: {
        id: string;
        username: string;
    };
    comments: CommentInterface[];
}

export interface SongDisplayInterface extends SongInterface {
    artists: ArtistInterface[];
    blogs: BlogInterface[];
}

const SONG_DISPLAY_QUERY = gql`
  query SongDisplay($id: ID!) {
    songDisplay(id: $id) {
        id,
        name,
        length,
        spotifyLink,
        artists {
            id,
            name,
            description
        },
        blogs {
            id,
            text,
            date,
            review,
            user {
                id,
                username
            },
            comments {
                id,
                user {
                    id,
                    username
                },
                blog_id,
                text,
                date
            }
        }
    }
}
`;

export async function getSongDisplay(id: string) {
    const verification = await verifyUserSession();
    if (!verification.success) {
        return null;
    }

    const client = await getClient();
    try {
        const data = await client.request(SONG_DISPLAY_QUERY, { id });
        return data.songDisplay as SongDisplayInterface;
         }
    catch (error: any) {
        console.error("Eroare GraphQL:", error.response?.errors);
        return null;
    }
}
export async function removeLikedSong(songId: number) {
    const verification = await verifyUserSession();
    if (!verification.success) {
        return verification;
    }

    const client = await getClient();
    try{
        const data = await client.request(DELETE_LIKED_SONG_MUTATION, { songId });

        return { success: true , likedSongs: data.deleteLikedSong };
    }
    catch (error: any) {
        console.error("Eroare GraphQL:", error.response?.errors);
        return { success: false, message: "Eroare la stergerea melodiei." };
    }
}

export async function getArtistSongs(artistId: number) {
    const verification = await verifyUserSession();
    if (!verification.success) {
        return verification;
    }

    const client = await getClient();

    const ARTIST_QUERY = gql`
      query ArtistSongs($artistId: ID!) {
        artistSongs(artistId: $artistId) {
            artist {
                name,
                description
            },
            songs {
                id,
                name,
                length
            }
        }
    }
    `;

    try{
        const data = await client.request(ARTIST_QUERY, { artistId });
        
        return data.artistSongs;
    }
    catch (error: any) {
        console.error("Eroare GraphQL:", error.response?.errors);
        return null;
    }
}
//for artists page
const ARTISTS_QUERY = gql`
  query Artists {
    artists {
      id,
      name,
      description
    }
  }
`;

export async function getAllArtists() {
    const verification = await verifyUserSession();
    if (!verification.success) {
        return null;
    }

    const client = await getClient();
    try {
        const data = await client.request(ARTISTS_QUERY);
        return data.artists as ArtistInterface[];
    }
    catch (error: any) {
        console.error("Eroare GraphQL:", error.response?.errors);
        return null;
    }
}

//for songs page
const SONGS_QUERY = gql`
  query Songs {
    songs {
      id,
      name,
      spotifyLink
    }
  }
`;

export async function getAllSongs() {
    const verification = await verifyUserSession();
    if (!verification.success) {
        return null;
    }

    const client = await getClient();
    try {
        const data = await client.request(SONGS_QUERY);
        return data.songs as SongInterface[];
    }
    catch (error: any) {
        console.error("Eroare GraphQL:", error.response?.errors);
        return null;
    }
}

//for genres page
export interface GenreInterface {
    id: string;
    name: string;
}

const GENRES_QUERY = gql`
  query Genres {
    genres {
      id,
      name
    }
  }
`;

export async function getAllGenres() {
    const verification = await verifyUserSession();
    if (!verification.success) {
        return null;
    }

    const client = await getClient();
    try {
        const data = await client.request(GENRES_QUERY);
        return data.genres as GenreInterface[];
    }
    catch (error: any) {
        console.error("Eroare GraphQL:", error.response?.errors);
        return null;
    }
}


//for genre page
export interface GenreDisplayInterface {
    id: string;
    name: string;
    subgenres?: GenreInterface[];
    songs?: SongInterface[];
}

const GENRE_DISPLAY_QUERY = gql`
  query GenreDisplay($id: ID!) {
    genreDisplay(id: $id) {
      id,
      name,
      subgenres {
        id,
        name
      },
      songs {
        id,
        name,
        spotifyLink
      }
    }
  }
`;

export async function getGenreDisplay(id: string) {
    const verification = await verifyUserSession();
    if (!verification.success) {
        return null;
    }

    const client = await getClient();
    try {
        const data = await client.request(GENRE_DISPLAY_QUERY, { id });
        return data.genreDisplay as GenreDisplayInterface;
    }
    catch (error: any) {
        console.error("Eroare GraphQL:", error.response?.errors);
        return null;
    }
}

export async function newSong(prevState: unknown, formData: FormData){
    const validatedFields = NewSongSchema.safeParse(Object.fromEntries(formData.entries()));
        
        if (!validatedFields.success) {
        return { errors: z.treeifyError(validatedFields.error) };
        }
    
        const variables = {
        name: validatedFields.data.name,
        length: parseInt(validatedFields.data.length),
        genre_ids: [validatedFields.data.genreId],
        artist_ids: [validatedFields.data.artistId],
        spotifyLink: validatedFields.data.spotifyLink,
        };
        
        console.log("Validated song data:", variables);

        const CREATE_SONG_MUTATION = gql`
        mutation CreateSong($input: SongInput!) {
            createSong(input: $input) {
            id
        }}
        `;
    
        const client = await getClient();
    
        try{
            const data = await client.request(CREATE_SONG_MUTATION, { input: variables });
    
            console.log("Song created:", data.createSong);
    
            return { success: true, song: data.createSong };
        }
        catch (error: any) {
            console.error("Eroare GraphQL:", error.response?.errors);
            return { success: false, message: "Eroare la crearea artistului." };
        }
}

export async function editSong(prevState: unknown, formData: FormData){
    const validatedFields = NewSongSchema.safeParse(Object.fromEntries(formData.entries()));
        
        if (!validatedFields.success) {
        return { errors: z.treeifyError(validatedFields.error) };
        }
    
        const id = parseInt(formData.get('id') as string);

        const variables = {
            name: validatedFields.data.name,
            length: parseInt(validatedFields.data.length),
            genre_ids: [validatedFields.data.genreId],
            artist_ids: [validatedFields.data.artistId],
            spotifyLink: validatedFields.data.spotifyLink,
        };

        console.log("Validated song data for edit:", variables);
    
        const EDIT_SONG_MUTATION = gql`
        mutation EditSongMutation($id: Int!, $input: SongInput!) {
            editSong(id: $id, input: $input) {
                id
            }
        }
        `;
        
        const client = await getClient();
    
        try{
            const data = await client.request(EDIT_SONG_MUTATION, { id: id, input: variables });
            console.log("Song updated:", data.editSong);
    
            return { success: true, song: data.editSong };
        }
        catch (error: any) {
            console.error("Eroare GraphQL:", error.response?.errors);
            return { success: false, message: "Eroare la actualizarea artistului." };
        }
}

export async function deleteSong(songId: number) {
    const verification = await verifyUserSession();
    if (!verification.success) {
        return verification;
    }

    const DELETE_SONG_MUTATION = gql`
    mutation DeleteSong($songId: ID!) {
      deleteSong(songId: $songId) {
      
      }
    }
    `;

    const client = await getClient();

    try{
        const data = await client.request(DELETE_SONG_MUTATION, { songId });

        return { success: true };
    }   
    catch (error: any) {
        console.error("Eroare GraphQL:", error.response?.errors);
        return { success: false, message: "Eroare la stergerea melodiei." };
    }
}