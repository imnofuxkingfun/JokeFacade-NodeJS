import { NewArtist } from "@/actions/artist";
import { ArtistInterface, GenreInterface, getAllArtists, getAllGenres } from "@/actions/songs";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

type SongActionState = {
  success?: boolean;
  song?: { id: number };
  message?: string;
  errors?: any;
} | undefined;

type SongAction = (state: SongActionState, formData: FormData) => Promise<SongActionState>;

interface SongFormProps {
  name?: string;
  length?: string;
    spotifyLink?: string;
    
  actionFunction: SongAction;
}

export default function SongForm({ name = '', length = '', spotifyLink = '', actionFunction }: SongFormProps) {
const [state, action, pending] = useActionState(actionFunction, undefined);

    const [genres, setGenres] = useState<GenreInterface[]>([]);
    const [artists, setArtists] = useState<ArtistInterface[]>([]);

    const router = useRouter();

    useEffect(() => {
        if (state?.success && state?.song) {
          const songId = state.song.id;
          
          router.push('/song/?id=' + songId);
        }
      }, [state, router]);

    useEffect(() => {
        const fetchGenres = async () => {
            const genres = await getAllGenres();
            setGenres(genres || []);
        }

        const fetchArtists = async () => {
            const artists = await getAllArtists();
            setArtists(artists || []);
        }
        fetchGenres();
        fetchArtists();
    }, []);
    return(
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6">Add New Song</h1>
            <form className="space-y-4" action={action}>
                {state?.message && <p className="text-red-500">{state.message}</p>}
                <div>
                    <label className="block text-sm font-medium mb-1">Song Name</label>
                    <input 
                        type="text" 
                        name ="name"
                        defaultValue={name}
                        placeholder="Enter song name" 
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {state?.errors?.properties?.name?.errors && (
                        <p className="text-red-500">{state.errors.properties.name.errors}</p>
                    )}
                </div>

                <div>
                <label className="block text-sm font-medium mb-1">Song Length</label>
                <input 
                    type="number" 
                    name ="length"
                    defaultValue={length}
                    placeholder="Enter song length" 
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {state?.errors?.properties?.length?.errors && (
                    <p className="text-red-500">{state.errors.properties.length.errors}</p>
                )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Genre</label>
                    <select name="genreId" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {genres.map((genre) => (

                        <option key={genre.id} value={genre.id}>{genre.name}</option>

                    ))}
                    </select>
                    {state?.errors?.properties?.genreId?.errors && (
                        <p className="text-red-500">{state.errors.properties.genreId.errors}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Artist</label>
                    <select name="artistId" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {artists.map((artist) => (

                        <option key={artist.id} value={artist.id}>{artist.name}</option>

                    ))}
                    </select>
                    {state?.errors?.properties?.artistId?.errors && (
                        <p className="text-red-500">{state.errors.properties.artistId.errors}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Artist Name</label>
                    <input 
                        type="text" 
                        name ="spotifyLink"
                        defaultValue={spotifyLink}
                        placeholder="Enter Spotify link" 
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {state?.errors?.properties?.spotifyLink?.errors && (
                        <p className="text-red-500">{state.errors.properties.spotifyLink.errors}</p>
                    )}
                </div>

                <button 
                disabled={pending}
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Add Artist
                </button>
            </form>
        </div>
    )
}