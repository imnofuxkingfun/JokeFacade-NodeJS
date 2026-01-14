// Update app/profile/page.tsx

'use client'

import { useAuth } from "@/context/authContext";
import LikedSongsList from "@/components/songs/likedSongsList";
import styles from './profile.module.css';

export default function ProfilePage() {
    const { logout, user } = useAuth();

    return(
        <div className={styles.container}>
            <div className={styles.profileHeader}>
                <h1>My Profile</h1>
                
                <div className={styles.userInfo}>
                    <div className={styles.infoCard}>
                        <label>Username</label>
                        <p>{user?.username}</p>
                    </div>
                    <div className={styles.infoCard}>
                        <label>Email</label>
                        <p>{user?.email}</p>
                    </div>
                </div>

                <button onClick={logout} className={styles.logoutBtn}>
                    Logout
                </button>
            </div>

            <LikedSongsList />
        </div>
    );
}