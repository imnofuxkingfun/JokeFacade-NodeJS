'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getGenreDisplay, GenreDisplayInterface } from '@/actions/songs';
import styles from '../song/song.module.css';

export default function GenrePage() {
    const searchParams = useSearchParams();
    const genreId = searchParams.get('id');
    const [genre, setGenre] = useState<GenreDisplayInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const songsPerPage = 10;

    useEffect(() => {
        async function fetchGenre() {
            if (!genreId) {
                setLoading(false);
                return;
            }
            const data = await getGenreDisplay(genreId);
            setGenre(data);
            setLoading(false);
        }
        fetchGenre();
    }, [genreId]);

    if (loading) {
        return <div className={styles.container}>Loading genre...</div>;
    }

    if (!genre) {
        return <div className={styles.container}>Genre not found</div>;
    }

    const totalPages = Math.ceil((genre.songs?.length || 0) / songsPerPage);
    const startIndex = (currentPage - 1) * songsPerPage;
    const displayedSongs = genre.songs?.slice(startIndex, startIndex + songsPerPage) || [];

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className={styles.container}>
            <h1>{genre.name}</h1>

            {/* Subgenres Section */}
            {genre.subgenres && genre.subgenres.length > 0 && (
                <div className={styles.artistsSection}>
                    <h2>Subgenres</h2>
                    <div className={styles.artistsList}>
                        {genre.subgenres.map((subgenre) => (
                            <div key={subgenre.id} className={styles.artistCard}>
                                <a href={`/genre?id=${subgenre.id}`} className={styles.artistLink}>
                                    <h3>{subgenre.name}</h3>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Songs Section */}
            {genre.songs && genre.songs.length > 0 ? (
                <div className={styles.blogsSection}>
                    <h2>Songs</h2>
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
            ) : (
                <div className={styles.noBlogs}>No songs in this genre yet</div>
            )}
        </div>
    );
}