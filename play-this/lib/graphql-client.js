// lib/graphql-client.ts
import { GraphQLClient } from 'graphql-request';
import { cookies } from 'next/headers';

const endpoint = 'http://localhost:4000/';

export const getClient = async () => {

    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    return new GraphQLClient(endpoint, {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        },
    });
};