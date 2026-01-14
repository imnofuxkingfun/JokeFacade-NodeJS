'use client'

import { getRandomSong, likeSong, SongInterface } from "@/actions/songs";
import { useState, useEffect } from "react";
import SongEmbedded from '@/components/shared/song';
import { getSongDisplay, SongDisplayInterface } from '@/actions/songs';
import styles from '../song/song.module.css';
import Link from "next/link";



export default function SwipePage() {
    const [song, setSong] = useState<SongDisplayInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [songsAvailable, setSongsAvailable] = useState(true);


    const fetchSong = async () => {
        setLoading(true);
        const randomSong = await getRandomSong();
        if (!randomSong) {
            setSongsAvailable(false);
            setLoading(false);
            return;
        }
        setSong(randomSong);
        setLoading(false);
    };

    const loveSongHandler = async () => {
        setLoading(true);
        await likeSong(song!);
        fetchSong();
    }

    useEffect(() => {
        fetchSong();
    }, []);

    return (
        <div>
            <h1>Swipe Page</h1>

            {songsAvailable ? (loading ? (
                <div>Loading...</div>
            ) : song && (
                <div>
                    <h2 className="text-xl"><Link href={`/song?id=${song.id}`}>{song.name}</Link></h2>
                    <div className="flex gap-2 items-center">
                        <h3 className="text-lg">
                            By {song.artists?.map((artist, index) => (
                                <span key={artist.id}>
                                    <a href={`/artist/${artist.id}`} className="hover:underline">
                                        {artist.name}
                                    </a>
                                    {index < song.artists.length - 1 && ', '}
                                </span>
                            ))}
                        </h3>
                    </div>

                    <SongEmbedded spotifyLink={song.spotifyLink} />

                    {loading ? (<></>) : (
                        <div className="flex gap-4" style={{ justifyContent: "center", alignItems: "center" }}>
                            <button onClick={fetchSong} disabled={loading} className="mt-4 bg-red-500 text-white p-2 rounded">
                                {'Dislike Song'}
                            </button>
                            <button onClick={loveSongHandler} disabled={loading} className="mt-4 bg-green-500 text-white p-2 rounded">
                                {'Love Song'}
                            </button>
                        </div>
                    )}


                </div>
            )) : (
                <div>
                    <h2>No more songs available to swipe.</h2>
                </div>
            )}
        </div>
    )
}