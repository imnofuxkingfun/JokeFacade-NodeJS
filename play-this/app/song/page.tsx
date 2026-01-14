'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SongEmbedded from '@/components/shared/song';
import { getSongDisplay, SongDisplayInterface } from '@/actions/songs';
import styles from './song.module.css';

export default function SongDisplayPage() {
    const searchParams = useSearchParams();
    const songId = searchParams.get('id');
    const [song, setSong] = useState<SongDisplayInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentBlogPage, setCurrentBlogPage] = useState(1);
    const blogsPerPage = 3;

    useEffect(() => {
        async function fetchSong() {
            if (!songId) {
                setLoading(false);
                return;
            }
            const data = await getSongDisplay(songId);
            setSong(data);
            setLoading(false);
        }
        fetchSong();
    }, [songId]);

    if (loading) {
        return <div className={styles.container}>Loading...</div>;
    }

    if (!song) {
        return <div className={styles.container}>Song not found</div>;
    }

    const totalPages = Math.ceil((song.blogs?.length || 0) / blogsPerPage);
    const startIndex = (currentBlogPage - 1) * blogsPerPage;
    const displayedBlogs = song.blogs?.slice(startIndex, startIndex + blogsPerPage) || [];

    const handlePreviousPage = () => {
        setCurrentBlogPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentBlogPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className={styles.container}>
            <h1>{song.name}</h1>

            {/* Spotify Embed */}
            <div className={styles.embedSection}>
                <SongEmbedded spotifyLink={song.spotifyLink} />
            </div>

            {/* Artists Section */}
            {song.artists && song.artists.length > 0 && (
                <div className={styles.artistsSection}>
                    <h2>Artists</h2>
                    <div className={styles.artistsList}>
                        {song.artists.map((artist) => (
                            <div key={artist.id} className={styles.artistCard}>
                                <a href={`/artist/${artist.id}`} className={styles.artistLink}>
                                    {artist.name}
                                </a>
                                {artist.description && (
                                    <p className={styles.artistDescription}>{artist.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Blogs Section */}
            {song.blogs && song.blogs.length > 0 && (
                <div className={styles.blogsSection}>
                    <h2>Reviews & Discussions</h2>
                    <div className={styles.blogsWindow}>
                        <div className={styles.blogsList}>
                            {displayedBlogs.map((blog) => (
                                <div key={blog.id} className={styles.blogCard}>
                                    <div className={styles.blogHeader}>
                                        <span className={styles.blogAuthor}>{blog.user.username}</span>
                                        <span className={styles.blogDate}>
                                            {new Date(blog.date).toLocaleDateString()}
                                        </span>
                                        <span className={styles.blogReview}>★ {blog.review}/10</span>
                                    </div>
                                    <p className={styles.blogText}>{blog.text}</p>

                                    {/* Comments */}
                                    {blog.comments && blog.comments.length > 0 && (
                                        <div className={styles.commentsSection}>
                                            <h4>Comments ({blog.comments.length})</h4>
                                            <div className={styles.commentsList}>
                                                {blog.comments.map((comment) => (
                                                    <div key={comment.id} className={styles.comment}>
                                                        <p className={styles.commentText}>{comment.text}</p>
                                                        <span className={styles.commentDate}>
                                                            {new Date(comment.date).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className={styles.pagination}>
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentBlogPage === 1}
                                    className={styles.paginationBtn}
                                >
                                    Previous
                                </button>
                                <span className={styles.pageInfo}>
                                    Page {currentBlogPage} of {totalPages}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentBlogPage === totalPages}
                                    className={styles.paginationBtn}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {(!song.blogs || song.blogs.length === 0) && (
                <div className={styles.noBlogs}>No reviews or discussions yet</div>
            )}
        </div>
    );
}