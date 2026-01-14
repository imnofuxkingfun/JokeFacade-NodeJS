'use server'

import { NewArtistSchema } from "@/lib/definitions";
import { getClient } from "@/lib/graphql-client";
import { gql } from "graphql-request";
import { z } from "zod";

export async function NewArtist(prevState: unknown, formData: FormData){
    const validatedFields = NewArtistSchema.safeParse(Object.fromEntries(formData.entries()));
    console.log("form data:", Object.fromEntries(formData.entries()));
    
    if (!validatedFields.success) {
    return { errors: z.treeifyError(validatedFields.error) };
    }

    const variables = {
    name: validatedFields.data.name,
    description: validatedFields.data.description,
    };

    const CREATE_ARTIST_MUTATION = gql`
    mutation CreateArtist($input: ArtistInput!) {
        createArtist(input: $input) {
            id
            name
            description
        }
    }
    `;

    const client = await getClient();

    try{
        const data = await client.request(CREATE_ARTIST_MUTATION, { input: variables });

        console.log("Artist created:", data.createArtist);

        return { success: true, artist: data.createArtist };
    }
    catch (error: any) {
        console.error("Eroare GraphQL:", error.response?.errors);
        return { success: false, message: "Eroare la crearea artistului." };
    }
}