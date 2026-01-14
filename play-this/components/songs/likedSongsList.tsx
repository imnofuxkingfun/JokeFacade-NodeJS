'use client';

import { getAllLikedSongs } from "@/actions/songs";
import Link from "next/link";
import { useEffect, useState } from "react";

const LikedSongsList = () => {
    const [userLikedSongs, setUserLikedSongs] = useState<any[]>([]);

    const fetchLikedSongs = async () => {
        const likedSongs = await getAllLikedSongs();
        setUserLikedSongs(likedSongs);
    };

    useEffect(() => {
        fetchLikedSongs();
    }, [])

    return (
        <>
            <h2>Liked Songs</h2>
            {userLikedSongs.map((song: any) => (
                <div key={song.id} className="p-4">
                    <h3 className="text-lg font-semibold"><Link href={`/song?id=${song.id}`}>{song.name}</Link></h3>
                </div>
            ))}
        </>
    );
}

export default LikedSongsList;
