'use client'

import { useEffect, useState } from 'react';
import { getAllSongs, SongInterface } from '@/actions/songs';
import styles from '../song/song.module.css';

export default function SongsPage() {
    const [songs, setSongs] = useState<SongInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const songsPerPage = 12;

    useEffect(() => {
        async function fetchSongs() {
            const data = await getAllSongs();
            setSongs(data || []);
            setLoading(false);
        }
        fetchSongs();
    }, []);

    const totalPages = Math.ceil(songs.length / songsPerPage);
    const startIndex = (currentPage - 1) * songsPerPage;
    const displayedSongs = songs.slice(startIndex, startIndex + songsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    if (loading) {
        return <div className={styles.container}>Loading songs...</div>;
    }

    if (songs.length === 0) {
        return <div className={styles.container}>No songs found</div>;
    }

    return (
        <div className={styles.container}>
            <h1>Songs</h1>
            
            <div className={styles.artistsGrid}>
                {displayedSongs.map((song) => (
                    <div key={song.id} className={styles.artistCard}>
                        <a href={`/song?id=${song.id}`} className={styles.artistLink}>
                            <h3>{song.name}</h3>
                        </a>
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
    );
}