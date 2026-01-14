'use client';

import { NewArtist } from "@/actions/artist";
import ArtistForm from "@/components/artist/artistForm";

export default function NewArtistPage() {
    return(
        <ArtistForm actionFunction={NewArtist} />
    )
}