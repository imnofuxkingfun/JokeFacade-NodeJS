'use client';

import { useEffect, useState } from "react";
import { ArtistInterface, getArtistSongs } from "@/actions/songs";
import { useParams } from "next/navigation";

export default function ArtistPage() {
    const [artist, setArtist] = useState<ArtistInterface | null>(null);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params.id as string;

    useEffect(() => {
        const fetchArtist = async () => {
            if (id) {
                const data = await getArtistSongs(parseInt(id));
                setArtist(data.artist);
                setSongs(data.songs);
                setLoading(false);
            }
        };
        fetchArtist();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>{artist?.name}</h1>
            <p>{artist?.description}</p>

            <h2>Songs</h2>
            {songs.map((song: any) => (
                <div key={song.id} className="p-4">
                    <h3 className="text-lg font-semibold">{song.name}</h3>
                </div>
            ))}
        </div>
    );
}