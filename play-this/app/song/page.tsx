'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SongEmbedded from '@/components/shared/song';
import { deleteSong, getSongDisplay, SongDisplayInterface } from '@/actions/songs';
import { createBlog, createComment, editComment, deleteComment, editBlog, deleteBlog } from '@/actions/blog';
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

    // Comment form state
    const [showCommentForm, setShowCommentForm] = useState<{ [blogId: string]: boolean }>({});
    const [commentText, setCommentText] = useState<{ [blogId: string]: string }>({});
    const [submittingComment, setSubmittingComment] = useState<{ [blogId: string]: boolean }>({});
    const [commentError, setCommentError] = useState<{ [blogId: string]: string | null }>({});

    // Edit comment state
    const [editingComment, setEditingComment] = useState<{ [commentId: string]: boolean }>({});
    const [editCommentText, setEditCommentText] = useState<{ [commentId: string]: string }>({});
    const [submittingEdit, setSubmittingEdit] = useState<{ [commentId: string]: boolean }>({});
    const [editError, setEditError] = useState<{ [commentId: string]: string | null }>({});

    // Delete comment state
    const [deletingComment, setDeletingComment] = useState<{ [commentId: string]: boolean }>({});

    const [editingBlog, setEditingBlog] = useState<{ [blogId: string]: boolean }>({});
    const [editBlogText, setEditBlogText] = useState<{ [blogId: string]: string }>({});
    const [editBlogReview, setEditBlogReview] = useState<{ [blogId: string]: number }>({});
    const [submittingBlogEdit, setSubmittingBlogEdit] = useState<{ [blogId: string]: boolean }>({});
    const [blogEditError, setBlogEditError] = useState<{ [blogId: string]: string | null }>({});
    const [deletingBlog, setDeletingBlog] = useState<{ [blogId: string]: boolean }>({});

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
            
            const updatedSong = await getSongDisplay(songId);
            setSong(updatedSong);
            
            setBlogText('');
            setBlogReview(5);
            setShowBlogForm(false);
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'Failed to create blog');
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmitComment = async (blogId: string, e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText[blogId]?.trim()) return;

        setSubmittingComment({ ...submittingComment, [blogId]: true });
        setCommentError({ ...commentError, [blogId]: null });

        try {
            await createComment(parseInt(blogId), commentText[blogId]);
            
            if (songId) {
                const updatedSong = await getSongDisplay(songId);
                setSong(updatedSong);
            }
            
            setCommentText({ ...commentText, [blogId]: '' });
            setShowCommentForm({ ...showCommentForm, [blogId]: false });
        } catch (error) {
            setCommentError({ 
                ...commentError, 
                [blogId]: error instanceof Error ? error.message : 'Failed to create comment' 
            });
        } finally {
            setSubmittingComment({ ...submittingComment, [blogId]: false });
        }
    };

    const handleEditComment = async (commentId: string, e: React.FormEvent) => {
        e.preventDefault();
        if (!editCommentText[commentId]?.trim()) return;

        setSubmittingEdit({ ...submittingEdit, [commentId]: true });
        setEditError({ ...editError, [commentId]: null });

        try {
            await editComment(parseInt(commentId), editCommentText[commentId]);
            
            if (songId) {
                const updatedSong = await getSongDisplay(songId);
                setSong(updatedSong);
            }
            
            setEditingComment({ ...editingComment, [commentId]: false });
            setEditCommentText({ ...editCommentText, [commentId]: '' });
        } catch (error) {
            setEditError({ 
                ...editError, 
                [commentId]: error instanceof Error ? error.message : 'Failed to edit comment' 
            });
        } finally {
            setSubmittingEdit({ ...submittingEdit, [commentId]: false });
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        if (!confirm('Are you sure you want to delete this comment?')) return;

        setDeletingComment({ ...deletingComment, [commentId]: true });

        try {
            await deleteComment(parseInt(commentId));
            
            if (songId) {
                const updatedSong = await getSongDisplay(songId);
                setSong(updatedSong);
            }
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Failed to delete comment');
        } finally {
            setDeletingComment({ ...deletingComment, [commentId]: false });
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

    const handleEditBlog = async (blogId: string, e: React.FormEvent) => {
  e.preventDefault();
  const text = editBlogText[blogId]?.trim();
  const review = editBlogReview[blogId];
  if (!text || !songId) return;

  setSubmittingBlogEdit({ ...submittingBlogEdit, [blogId]: true });
  setBlogEditError({ ...blogEditError, [blogId]: null });

  try {
    await editBlog(parseInt(blogId), text, review);
    const updatedSong = await getSongDisplay(songId);
    setSong(updatedSong);

    setEditingBlog({ ...editingBlog, [blogId]: false });
    setEditBlogText({ ...editBlogText, [blogId]: '' });
    setEditBlogReview({ ...editBlogReview, [blogId]: 0 });
  } catch (error) {
    setBlogEditError({
      ...blogEditError,
      [blogId]: error instanceof Error ? error.message : 'Failed to edit blog',
    });
  } finally {
    setSubmittingBlogEdit({ ...submittingBlogEdit, [blogId]: false });
  }
};

const handleDeleteBlog = async (blogId: string) => {
  if (!confirm('Are you sure you want to delete this blog?')) return;
  if (!songId) return;

  setDeletingBlog({ ...deletingBlog, [blogId]: true });
  try {
    await deleteBlog(parseInt(blogId));
    const updatedSong = await getSongDisplay(songId);
    setSong(updatedSong);
  } catch (error) {
    alert(error instanceof Error ? error.message : 'Failed to delete blog');
  } finally {
    setDeletingBlog({ ...deletingBlog, [blogId]: false });
  }
};

    const handlePreviousPage = () => {
        setCurrentBlogPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentBlogPage((prev) => Math.min(prev + 1, totalPages));
    };

    const handleDelete = async () => {
        if(await deleteSong(parseInt(songId!))){
            window.location.href = '/songs';
            return;
        }
    }

    return (
        <div className={styles.container}>
            {user?.role?.id === '1' && (
                <a href={`/song/edit/${songId}`}>
                    <button className="mb-4 bg-green-500 text-white p-2 rounded">
                        Edit Artist
                    </button>

                    <button onClick={handleDelete} className="mb-4 bg-red-500 text-white p-2 rounded">
                        Delete Artist
                    </button>
                </a>
            )}
            <h1>{song.name}</h1>

            <div className={styles.embedSection}>
                <SongEmbedded spotifyLink={song.spotifyLink} />
            </div>

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

            {song.blogs && song.blogs.length > 0 && (
                <div className={styles.blogsSection}>
                    <h2>Reviews & Discussions</h2>
                    <div className={styles.blogsWindow}>
                        <div className={styles.blogsList}>
                            {displayedBlogs.map((blog) => (
                                <div key={blog.id} className={styles.blogCard}>
                                    <div className={styles.blogHeader}>
                                        <span className={styles.blogAuthor}>{blog.user.username}</span>
                                        <span className={styles.blogDate}>{new Date(blog.date).toLocaleDateString()}</span>
                                        <span className={styles.blogReview}>★ {blog.review}/10</span>
                                        {user && user.id === String(blog.user.id) && !editingBlog[blog.id] && (
                                            <div className={styles.commentActions}>
                                                <button
                                                    onClick={() => {
                                                        setEditingBlog({ ...editingBlog, [blog.id]: true });
                                                        setEditBlogText({ ...editBlogText, [blog.id]: blog.text });
                                                        setEditBlogReview({ ...editBlogReview, [blog.id]: typeof blog.review === 'number' ? blog.review : 5 });
                                                    }}
                                                    className={styles.editCommentBtn}
                                                    title="Edit blog"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteBlog(String(blog.id))}
                                                    className={styles.deleteCommentBtn}
                                                    disabled={deletingBlog[blog.id]}
                                                    title="Delete blog"
                                                >
                                                    {deletingBlog[blog.id] ? '...' : '🗑️'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <p className={styles.blogText}>{blog.text}</p>
                                    {editingBlog[blog.id] && (
                                        <form onSubmit={(e) => handleEditBlog(String(blog.id), e)} className={styles.editCommentForm}>
                                            <div className={styles.formGroup}>
                                                <label>Rating (1-10)</label>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    max={10}
                                                    value={editBlogReview[blog.id] ?? 5}
                                                    onChange={(e) => setEditBlogReview({ ...editBlogReview, [blog.id]: parseInt(e.target.value) })}
                                                    className={styles.reviewInput}
                                                    required
                                                />
                                            </div>
                                            <textarea
                                                value={editBlogText[blog.id] || ''}
                                                onChange={(e) => setEditBlogText({ ...editBlogText, [blog.id]: e.target.value })}
                                                className={styles.editCommentTextarea}
                                                rows={4}
                                                required
                                            />
                                            {blogEditError[blog.id] && <div className={styles.errorMessage}>{blogEditError[blog.id]}</div>}
                                            <div className={styles.editCommentActions}>
                                                <button type="submit" disabled={submittingBlogEdit[blog.id]} className={styles.saveEditBtn}>
                                                    {submittingBlogEdit[blog.id] ? 'Saving...' : 'Save'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setEditingBlog({ ...editingBlog, [blog.id]: false });
                                                        setEditBlogText({ ...editBlogText, [blog.id]: '' });
                                                        setEditBlogReview({ ...editBlogReview, [blog.id]: 0 });
                                                        setBlogEditError({ ...blogEditError, [blog.id]: null });
                                                    }}
                                                    className={styles.cancelEditBtn}
                                                    disabled={submittingBlogEdit[blog.id]}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {blog.comments && blog.comments.length > 0 && (
                                        <div className={styles.commentsSection}>
                                            <h4>Comments ({blog.comments.length})</h4>
                                            <div className={styles.commentsList}>
                                                {blog.comments.map((comment) => (
                                                    <div key={comment.id} className={styles.comment}>
                                                        {!editingComment[comment.id] ? (
                                                            <>
                                                                <div className={styles.commentHeader}>
                                                                    <p className={styles.commentText}>{comment.text}</p>
                                                                    {user && user.id === String(comment.user.id) && (
                                                                        <div className={styles.commentActions}>
                                                                            <button
                                                                                onClick={() => {
                                                                                    setEditingComment({ ...editingComment, [comment.id]: true });
                                                                                    setEditCommentText({ ...editCommentText, [comment.id]: comment.text });
                                                                                }}
                                                                                className={styles.editCommentBtn}
                                                                                title="Edit comment"
                                                                            >
                                                                                ✏️
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleDeleteComment(comment.id)}
                                                                                className={styles.deleteCommentBtn}
                                                                                disabled={deletingComment[comment.id]}
                                                                                title="Delete comment"
                                                                            >
                                                                                {deletingComment[comment.id] ? '...' : '🗑️'}
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <span className={styles.commentDate}>
                                                                    {new Date(comment.date).toLocaleDateString()}
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <form onSubmit={(e) => handleEditComment(comment.id, e)} className={styles.editCommentForm}>
                                                                <textarea
                                                                    value={editCommentText[comment.id] || ''}
                                                                    onChange={(e) => setEditCommentText({ ...editCommentText, [comment.id]: e.target.value })}
                                                                    className={styles.editCommentTextarea}
                                                                    rows={2}
                                                                    required
                                                                />
                                                                {editError[comment.id] && (
                                                                    <div className={styles.errorMessage}>{editError[comment.id]}</div>
                                                                )}
                                                                <div className={styles.editCommentActions}>
                                                                    <button
                                                                        type="submit"
                                                                        disabled={submittingEdit[comment.id]}
                                                                        className={styles.saveEditBtn}
                                                                    >
                                                                        {submittingEdit[comment.id] ? 'Saving...' : 'Save'}
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setEditingComment({ ...editingComment, [comment.id]: false });
                                                                            setEditCommentText({ ...editCommentText, [comment.id]: '' });
                                                                            setEditError({ ...editError, [comment.id]: null });
                                                                        }}
                                                                        className={styles.cancelEditBtn}
                                                                        disabled={submittingEdit[comment.id]}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {user && (
                                        <div className={styles.addCommentSection}>
                                            {!showCommentForm[blog.id] ? (
                                                <button
                                                    onClick={() => setShowCommentForm({ ...showCommentForm, [blog.id]: true })}
                                                    className={styles.addCommentBtn}
                                                >
                                                    Add Comment
                                                </button>
                                            ) : (
                                                <form onSubmit={(e) => handleSubmitComment(blog.id, e)} className={styles.commentForm}>
                                                    <textarea
                                                        value={commentText[blog.id] || ''}
                                                        onChange={(e) => setCommentText({ ...commentText, [blog.id]: e.target.value })}
                                                        placeholder="Write a comment..."
                                                        className={styles.commentTextarea}
                                                        rows={3}
                                                        required
                                                    />
                                                    {commentError[blog.id] && (
                                                        <div className={styles.errorMessage}>{commentError[blog.id]}</div>
                                                    )}
                                                    <div className={styles.commentFormActions}>
                                                        <button
                                                            type="submit"
                                                            disabled={submittingComment[blog.id]}
                                                            className={styles.submitCommentBtn}
                                                        >
                                                            {submittingComment[blog.id] ? 'Posting...' : 'Post Comment'}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setShowCommentForm({ ...showCommentForm, [blog.id]: false });
                                                                setCommentText({ ...commentText, [blog.id]: '' });
                                                                setCommentError({ ...commentError, [blog.id]: null });
                                                            }}
                                                            className={styles.cancelCommentBtn}
                                                            disabled={submittingComment[blog.id]}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

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