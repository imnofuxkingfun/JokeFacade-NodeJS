'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SongEmbedded from '@/components/shared/song';
import { getSongDisplay, SongDisplayInterface } from '@/actions/songs';
import { createBlog } from '@/actions/blog';
import { useAuth } from '@/context/authContext';
import styles from './song.module.css';

export default function SongDisplayPage() {
    const searchParams = useSearchParams();
    const songId = searchParams.get('id');
    const [song, setSong] = useState<SongDisplayInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentBlogPage, setCurrentBlogPage] = useState(1);
    const blogsPerPage = 3;
    
    // Blog form state
    const { user } = useAuth();
    const [showBlogForm, setShowBlogForm] = useState(false);
    const [blogText, setBlogText] = useState('');
    const [blogReview, setBlogReview] = useState(5);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

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

    const handleSubmitBlog = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!songId || !blogText.trim()) return;

        setSubmitting(true);
        setSubmitError(null);

        try {
            await createBlog(blogText, blogReview, songId);
            
            // Refresh song data to show the new blog
            const updatedSong = await getSongDisplay(songId);
            setSong(updatedSong);
            
            // Reset form
            setBlogText('');
            setBlogReview(5);
            setShowBlogForm(false);
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'Failed to create blog');
        } finally {
            setSubmitting(false);
        }
    };

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

            {/* Create Blog Section - Only for logged-in users */}
            {user && (
                <div className={styles.createBlogSection}>
                    {!showBlogForm ? (
                        <button 
                            onClick={() => setShowBlogForm(true)}
                            className={styles.createBlogBtn}
                        >
                            Write a Review
                        </button>
                    ) : (
                        <form onSubmit={handleSubmitBlog} className={styles.blogForm}>
                            <h3>Write Your Review</h3>
                            
                            <div className={styles.formGroup}>
                                <label htmlFor="review">Rating (1-10)</label>
                                <input
                                    type="number"
                                    id="review"
                                    min="1"
                                    max="10"
                                    value={blogReview}
                                    onChange={(e) => setBlogReview(parseInt(e.target.value))}
                                    className={styles.reviewInput}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="blogText">Your Review</label>
                                <textarea
                                    id="blogText"
                                    value={blogText}
                                    onChange={(e) => setBlogText(e.target.value)}
                                    placeholder="Share your thoughts about this song..."
                                    className={styles.blogTextarea}
                                    rows={6}
                                    required
                                />
                            </div>

                            {submitError && (
                                <div className={styles.errorMessage}>{submitError}</div>
                            )}

                            <div className={styles.formActions}>
                                <button 
                                    type="submit" 
                                    disabled={submitting}
                                    className={styles.submitBtn}
                                >
                                    {submitting ? 'Posting...' : 'Post Review'}
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setShowBlogForm(false);
                                        setBlogText('');
                                        setBlogReview(5);
                                        setSubmitError(null);
                                    }}
                                    className={styles.cancelBtn}
                                    disabled={submitting}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
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