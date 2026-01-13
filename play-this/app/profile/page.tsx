'use client'

import { useAuth } from "@/context/authContext";
// import { useRouter } from "next/router";
// import { useAuth } from "@/context/authContext";

const ProfilePage = async () => {

    const { logout, user } = useAuth();

    return(
        <div>
            <h1>Profile</h1>
            <h2>username: {user?.username}</h2>
            <h2>email: {user?.email}</h2>
            <button onClick={logout}>Logout</button>
        </div>

    ) ;
}

export default ProfilePage;