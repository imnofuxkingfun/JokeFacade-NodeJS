'use server';
import { getClient } from "@/lib/graphql-client";
import { gql } from "graphql-request";
import { cookies } from "next/headers";
import { success } from "zod";

export interface SongInterface {
    id: string;
    name: string;
    spotifyLink: string;
};

const RANDOM_SONG_QUERY = gql`
  query RandomSong {
    randomSong{
    id,
    name,
    spotifyLink
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

async function verifyUserSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) {
        console.error("Eroare: Utilizatorul nu este autentificat.");
        return { success: false, message: "Utilizatorul nu este autentificat." }
    }

    return { success: true };
}

export async function getRandomSong() {
    const verification = await verifyUserSession();
    if (!verification.success) {
        return verification;
    }

    const client = await getClient();
    try {
        const data = await client.request(RANDOM_SONG_QUERY);
        return data.randomSong;
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