'use client';

import { EditArtist } from "@/actions/artist";
import { ArtistInterface, getArtistSongs } from "@/actions/songs";
import ArtistForm from "@/components/artist/artistForm";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditArtistPage() {

    const params = useParams();
    const id = params.id as string;
    const [artist, setArtist] = useState<ArtistInterface | null>(null);
    const editHandler = (prevState: unknown, formData: FormData) => {
        formData.append('id', window.location.pathname.split('/').pop() || '');
        return EditArtist(prevState, formData);
    }

    useEffect(() => {
            const fetchArtist = async () => {
                if (id) {
                    const data = await getArtistSongs(parseInt(id));
                    setArtist(data.artist);
                }
            };
            fetchArtist();
        }, [id]);

    return(
        <ArtistForm actionFunction={editHandler} name={artist?.name || ''} description = {artist?.description || ''} />
    )
}