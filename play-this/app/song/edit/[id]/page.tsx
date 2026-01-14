'use client';

import { editSong, getSongDisplay, SongDisplayInterface } from "@/actions/songs";
import SongForm from "@/components/songs/songForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditSongPage() {
    const params = useParams();
    const id = params.id as string;

    const [songDisplay, setSongDisplay] = useState<SongDisplayInterface | null>(null);

    useEffect(() => {
        async function fetchSong() {
            const songData = await getSongDisplay(id);
            setSongDisplay(songData);
        }
        fetchSong();
    }, [id]);

    const handleEditSong = (prevState: unknown, formData: FormData) => {
        formData.append('id', id);

        console.log("Editing song with ID:", id);

        return editSong(prevState, formData);
    }

    return(
        <SongForm actionFunction={handleEditSong}
        name= {songDisplay?.name}
        spotifyLink= {songDisplay?.spotifyLink}
        />
    )
}