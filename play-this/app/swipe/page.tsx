'use client'

import { getRandomSong, likeSong, SongInterface } from "@/actions/songs";
import { useState, useEffect } from "react";



export default function SwipePage() {
    const [song, setSong] = useState<SongInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [songsAvailable, setSongsAvailable] = useState(true);

    const fetchSong = async () => {
        setLoading(true);
        const randomSong = await getRandomSong();
        if(!randomSong){
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
                    <h2>{song.name}</h2>
                    <a href={song.spotifyLink} target="_blank" rel="noopener noreferrer">Listen on Spotify</a>
                    <br />
                    {loading ? (<></>) : (
                        <div>
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