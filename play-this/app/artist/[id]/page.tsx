'use client';

import { useEffect, useState } from "react";
import { ArtistInterface, getArtistSongs } from "@/actions/songs";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { DeleteArtist } from "@/actions/artist";

export default function ArtistPage() {
    const [artist, setArtist] = useState<ArtistInterface | null>(null);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params.id as string;

    const { user } = useAuth()

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

    const handleDelete = async () => {
        if(await DeleteArtist(parseInt(id))){
            window.location.href = '/artists';
            return;
        }
        else{
            return;
        }
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {user?.role?.id === '2' && (
                <a href={`/artist/edit/${id}`}>
                    <button className="mb-4 bg-green-500 text-white p-2 rounded">
                        Edit Artist
                    </button>

                    <button onClick={handleDelete} className="mb-4 bg-red-500 text-white p-2 rounded">
                        Delete Artist
                    </button>
                </a>
            )}
            <h1>{artist?.name}</h1>
            <p>{artist?.description}</p>

            <h2>Songs</h2>
            {songs.map((song: any) => (
                <div key={song.id} className="p-4">
                    <h3 className="text-lg font-semibold"><Link href={`/song?id=${song.id}`}>{song.name}</Link></h3>
                </div>
            ))}
        </div>
    );
}