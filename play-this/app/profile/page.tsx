'use client'

import { useAuth } from "@/context/authContext";
import LikedSongsList from "@/components/songs/likedSongsList";

export default function ProfilePage() {
    const { logout, user } = useAuth();

    return(
        <div>
            <h1>Profile</h1>
            <h2>username: {user?.username}</h2>
            <h2>email: {user?.email}</h2>

            <LikedSongsList />

            <button onClick={logout}>Logout</button>
        </div>
    );
}