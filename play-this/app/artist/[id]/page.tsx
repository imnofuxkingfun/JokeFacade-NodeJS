'use client';

import { useEffect, useState } from "react";
import { ArtistInterface, getArtistSongs } from "@/actions/songs";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from '@/app/song/song.module.css';

export default function ArtistPage() {
    const [artist, setArtist] = useState<ArtistInterface | null>(null);
    const [songs, setSongs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const songsPerPage = 10;
    const params = useParams();
    const id = params.id as string;

    useEffect(() => {
        const fetchArtist = async () => {
            if (id) {
                const data = await getArtistSongs(parseInt(id));
                setArtist(data.artist);
                setSongs(data.songs || []);
                setLoading(false);
            }
        };
        fetchArtist();
    }, [id]);

    if (loading) {
        return <div className={styles.container}>Loading artist...</div>;
    }

    if (!artist) {
        return <div className={styles.container}>Artist not found</div>;
    }

    const totalPages = Math.ceil(songs.length / songsPerPage);
    const startIndex = (currentPage - 1) * songsPerPage;
    const displayedSongs = songs.slice(startIndex, startIndex + songsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className={styles.container}>
            <h1>{artist.name}</h1>
            
            {artist.description && (
                <div className={styles.artistsSection}>
                    <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.6' }}>
                        {artist.description}
                    </p>
                </div>
            )}

            {songs.length > 0 ? (
                <div className={styles.blogsSection}>
                    <h2>Songs</h2>
                    <div className={styles.blogsWindow}>
                        <div className={styles.blogsList}>
                            {displayedSongs.map((song: any) => (
                                <div key={song.id} className={styles.blogCard}>
                                    <Link href={`/song?id=${song.id}`} className={styles.artistLink}>
                                        <h3 style={{ margin: 0 }}>{song.name}</h3>
                                    </Link>
                                    {song.length && (
                                        <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                                            Length: {Math.floor(song.length)} minutes
                                        </p>
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
                </div>
            ) : (
                <div className={styles.noBlogs}>No songs found for this artist</div>
            )}
        </div>
    );
}