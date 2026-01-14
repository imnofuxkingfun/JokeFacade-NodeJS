'use client';

import { NewArtist } from "@/actions/artist";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function NewArtistPage() {

    const [state, action, pending] = useActionState(NewArtist, undefined);

    const router = useRouter();

    useEffect(() => {
        if (state?.success && state?.artist) {
          const artistId = state.artist.id;
          
          router.push('/artist/' + artistId);
        }
      }, [state, router]);

    return(
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6">Add New Artist</h1>
            <form className="space-y-4" action={action}>
                {state?.message && <p className="text-red-500">{state.message}</p>}
                <div>
                    <label className="block text-sm font-medium mb-1">Artist Name</label>
                    <input 
                        type="text" 
                        name ="name"
                        placeholder="Enter artist name" 
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {state?.errors?.properties?.name?.errors && (
                        <p className="text-red-500">{state.errors.properties.name.errors}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea 
                        name="description"
                        placeholder="Enter artist description" 
                        rows={4}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {state?.errors?.properties?.description?.errors && (
                        <p className="text-red-500">{state.errors.properties.description.errors}</p>
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