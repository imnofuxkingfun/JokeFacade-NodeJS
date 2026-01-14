'use client'

import { useEffect, useState } from 'react';
import { getAllGenres, GenreInterface } from '@/actions/songs';
import styles from '../song/song.module.css';

export default function GenresPage() {
    const [genres, setGenres] = useState<GenreInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const genresPerPage = 12;

    useEffect(() => {
        async function fetchGenres() {
            const data = await getAllGenres();
            setGenres(data || []);
            setLoading(false);
        }
        fetchGenres();
    }, []);

    const totalPages = Math.ceil(genres.length / genresPerPage);
    const startIndex = (currentPage - 1) * genresPerPage;
    const displayedGenres = genres.slice(startIndex, startIndex + genresPerPage);

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    if (loading) {
        return <div className={styles.container}>Loading genres...</div>;
    }

    if (genres.length === 0) {
        return <div className={styles.container}>No genres found</div>;
    }

    return (
        <div className={styles.container}>
            <h1>Genres</h1>
            
            <div className={styles.artistsGrid}>
                {displayedGenres.map((genre) => (
                    <div key={genre.id} className={styles.artistCard}>
                        <a href={`/genre?id=${genre.id}`} className={styles.artistLink}>
                            <h3>{genre.name}</h3>
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