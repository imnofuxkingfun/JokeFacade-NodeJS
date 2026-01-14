'use client'

import { getRandomSong, likeSong, SongInterface } from "@/actions/songs";
import { useState, useEffect } from "react";
import SongEmbedded from '@/components/shared/song';
import { getSongDisplay, SongDisplayInterface } from '@/actions/songs';
import styles from '../song/song.module.css';



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

    return(
        <div>
            <h1>Swipe Page</h1>
            
            {songsAvailable ? (loading ? (
                <div>Loading...</div>
            ) : song && (
                <div>
                    <h2 className="text-xl">{song.name}</h2>
                    <a href = {`/artist/${song.artistId}`}><h3 className="text-lg">by {song.artistName}</h3></a>
                    <div className={styles.embedSection}>
                <SongEmbedded spotifyLink={song.spotifyLink} />
            </div>

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