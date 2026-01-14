'use client';

import { getAllLikedSongs, removeLikedSong } from "@/actions/songs";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from '@/app/song/song.module.css';

const LikedSongsList = () => {
    const [userLikedSongs, setUserLikedSongs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const songsPerPage = 10;

    const fetchLikedSongs = async () => {
        setLoading(true);
        const likedSongs = await getAllLikedSongs();
        setUserLikedSongs(likedSongs || []);
        setLoading(false);
    };

    const removeSongHandler = async (songId: number) => {
        const data = await removeLikedSong(songId);
        if(data.success){
            fetchLikedSongs();
        }
    }

    useEffect(() => {
        fetchLikedSongs();
    }, [])

    if (loading) {
        return <div className={styles.container}>Loading liked songs...</div>;
    }

    const totalPages = Math.ceil(userLikedSongs.length / songsPerPage);
    const startIndex = (currentPage - 1) * songsPerPage;
    const displayedSongs = userLikedSongs.slice(startIndex, startIndex + songsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className={styles.blogsSection}>
            <h2>Liked Songs</h2>
            
            {userLikedSongs.length > 0 ? (
                <>
                    <div className={styles.blogsWindow}>
                        <div className={styles.blogsList}>
                            {displayedSongs.map((song: any) => (
                                <div key={song.id} className={styles.blogCard}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                                        <Link href={`/song?id=${song.id}`} className={styles.artistLink}>
                                            <h3 style={{ margin: 0 }}>{song.name}</h3>
                                        </Link>
                                        <button 
                                            onClick={() => removeSongHandler(song.id)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                background: '#ff4444',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                                whiteSpace: 'nowrap',
                                                transition: 'background 0.3s ease'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.background = '#cc0000'}
                                            onMouseOut={(e) => e.currentTarget.style.background = '#ff4444'}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className={styles.pagination}>
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    className={styles.paginationBtn}
                                >
                                    Previous
                                </button>
                                <span className={styles.pageInfo}>
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={styles.paginationBtn}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className={styles.noBlogs}>No liked songs yet</div>
            )}
        </div>
    );
}

export default LikedSongsList;