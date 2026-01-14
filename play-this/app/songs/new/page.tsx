'use client';

import { newSong } from "@/actions/songs";
import SongForm from "@/components/songs/songForm";

export default async function NewSongPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Create New Song</h1>
            <SongForm actionFunction={newSong} />
        </div>
    );
}