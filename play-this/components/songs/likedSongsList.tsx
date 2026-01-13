'use client';

import { getAllLikedSongs, removeLikedSong } from "@/actions/songs";
import { useEffect, useState } from "react";

const LikedSongsList = () => {
    const [userLikedSongs, setUserLikedSongs] = useState<any[]>([]);

    const fetchLikedSongs = async () => {
        const likedSongs = await getAllLikedSongs();
        setUserLikedSongs(likedSongs);
    };

    const removeSongHandler = async (songId: number) => {
        const data = await removeLikedSong(songId);
        if(data.success){
            fetchLikedSongs();
        }
    }

    useEffect(() => {
        fetchLikedSongs();
    }, [])

    return (
        <>
            <h2>Liked Songs</h2>
            {userLikedSongs.map((song: any) => (
                <div key={song.id} className="p-4">
                    <h3 className="text-lg font-semibold">{song.name}</h3>
                    <button onClick={() => removeSongHandler(song.id)}>Remove</button>
                </div>
            ))}
        </>
    );
}

export default LikedSongsList;
