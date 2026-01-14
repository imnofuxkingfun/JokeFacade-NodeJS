'use client'

import { useEffect, useState } from 'react';
import { getAllArtists, ArtistInterface } from '@/actions/songs';
import styles from '../song/song.module.css';
import { useAuth } from '@/context/authContext';

export default function ArtistsPage() {
    const [artists, setArtists] = useState<ArtistInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const artistsPerPage = 12;

    const { user } = useAuth();

    useEffect(() => {
        console.log("User in ArtistsPage:", user);
        async function fetchArtists() {
            const data = await getAllArtists();
            setArtists(data || []);
            setLoading(false);
        }
        fetchArtists();
    }, []);

    const totalPages = Math.ceil(artists.length / artistsPerPage);
    const startIndex = (currentPage - 1) * artistsPerPage;
    const displayedArtists = artists.slice(startIndex, startIndex + artistsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    if (loading) {
        return <div className={styles.container}>Loading artists...</div>;
    }

    if (artists.length === 0) {
        return <div className={styles.container}>No artists found</div>;
    }

    return (
        <div className={styles.container}>
            <h1>Browse Artists</h1>
            {user?.role?.id === '2' && (
                <a href="/artists/new">
                    <button className="mb-4 bg-green-500 text-white p-2 rounded">
                        Add New Artist
                    </button>
                </a>
            )}
            <div className={styles.artistsGrid}>
                {displayedArtists.map((artist) => (
                    <div key={artist.id} className={styles.artistCard}>
                        <a href={`/artist/${artist.id}`} className={styles.artistLink}>
                            <h3>{artist.name}</h3>
                        </a>
                        {artist.description && (
                            <p className={styles.artistDescription}>{artist.description}</p>
                        )}
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