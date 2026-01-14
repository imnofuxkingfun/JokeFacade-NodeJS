'use client';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { getAllBlogs, createComment, editComment, deleteComment, editBlog, deleteBlog, Blog } from '@/actions/blog';
import { useAuth } from '@/context/authContext';

type PageProps = {
  searchParams?: Promise<{ page?: string; limit?: string }>;
};

export default function BlogsPage({ searchParams }: PageProps) {
  const [blogs, setBlogs] = useState<{ items: Blog[], total: number, page: number, pageCount: number, hasPrev: boolean, hasNext: boolean }>({
    items: [],
    total: 0,
    page: 1,
    pageCount: 1,
    hasPrev: false,
    hasNext: false,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
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

  const params = searchParams ? use(searchParams) : {};
  const page = Number(params.page ?? '1');
  const limit = Number(params.limit ?? '7');

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      const data = await getAllBlogs(page, limit);
      setBlogs(data);
      setLoading(false);
    }
    fetchBlogs();
  }, [page, limit]);

  const handleSubmitComment = async (blogId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText[blogId]?.trim()) return;

    setSubmittingComment({ ...submittingComment, [blogId]: true });
    setCommentError({ ...commentError, [blogId]: null });

    try {
      await createComment(parseInt(blogId), commentText[blogId]);
      
      // Refresh blogs data to show the new comment
      const updatedData = await getAllBlogs(page, limit);
      setBlogs(updatedData);
      
      // Reset form
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
      
      const updatedData = await getAllBlogs(page, limit);
      setBlogs(updatedData);
      
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
      
      const updatedData = await getAllBlogs(page, limit);
      setBlogs(updatedData);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete comment');
    } finally {
      setDeletingComment({ ...deletingComment, [commentId]: false });
    }
  };

  if (loading) {
    return (
      <main style={{ padding: '1rem', maxWidth: 900, margin: '0 auto' }}>
        <p>Loading blogs...</p>
      </main>
    );
  }

  const handleEditBlog = async (blogId: string, e: React.FormEvent) => {
  e.preventDefault();
  const text = editBlogText[blogId]?.trim();
  const review = editBlogReview[blogId];
  if (!text) return;

  setSubmittingBlogEdit({ ...submittingBlogEdit, [blogId]: true });
  setBlogEditError({ ...blogEditError, [blogId]: null });

  try {
    await editBlog(parseInt(blogId), text, review);
    const updatedData = await getAllBlogs(page, limit);
    setBlogs(updatedData);

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

  setDeletingBlog({ ...deletingBlog, [blogId]: true });
  try {
    await deleteBlog(parseInt(blogId));
    const updatedData = await getAllBlogs(page, limit);
    setBlogs(updatedData);
  } catch (error) {
    alert(error instanceof Error ? error.message : 'Failed to delete blog');
  } finally {
    setDeletingBlog({ ...deletingBlog, [blogId]: false });
  }
};

  const { items, hasPrev, hasNext, pageCount, total } = blogs;
  const prevHref = `/blogs?page=${Math.max(1, page - 1)}&limit=${limit}`;
  const nextHref = `/blogs?page=${page + 1}&limit=${limit}`;

  return (
    <main style={{ padding: '1rem', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
        Blogs
      </h1>
      <p style={{ color: '#666', marginBottom: 12 }}>
        Total: {total} • Page {page} of {pageCount}
      </p>

      <ul style={{ display: 'grid', gap: 16 }}>
        {items.map((b) => (
          <li key={b.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <strong>@{b.user?.username}</strong>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#888' }}>{new Date(b.date).toLocaleDateString()}</span>
                {user && (user.id === String(b.user.id) || user?.role?.id === '1') && !editingBlog[b.id] && (
                  <div style={{ display: 'flex', gap: 4 }}>
                    {user.id === String(b.user.id) && (<button
                      onClick={() => {
                        setEditingBlog({ ...editingBlog, [b.id]: true });
                        setEditBlogText({ ...editBlogText, [b.id]: b.text });
                        setEditBlogReview({ ...editBlogReview, [b.id]: typeof b.review === 'number' ? b.review : 5 });
                      }}
                      style={{ padding: '4px 8px', fontSize: '0.8rem', background: '#fff', border: '1px solid #ddd', borderRadius: 4, cursor: 'pointer' }}
                      title="Edit blog"
                    >
                      ✏️
                    </button>)}
                    <button
                      onClick={() => handleDeleteBlog(String(b.id))}
                      disabled={deletingBlog[b.id]}
                      style={{ padding: '4px 8px', fontSize: '0.8rem', background: '#fff', border: '1px solid #ddd', borderRadius: 4, cursor: deletingBlog[b.id] ? 'not-allowed' : 'pointer', opacity: deletingBlog[b.id] ? 0.6 : 1 }}
                      title="Delete blog"
                    >
                      {deletingBlog[b.id] ? '...' : '🗑️'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {typeof b.review === 'number' && (
              <div style={{ marginBottom: 8 }}>Review: {b.review}/10</div>
            )}

            <p style={{ marginBottom: 8 }}>{b.text}</p>

            {b.song && (
              <div style={{ fontSize: 14, color: '#555', marginBottom: 8 }}>
                Song: {b.song.name} {b.song.spotifyLink ? (
                  <a href={`/song?id=${b.song.id}`} target="_blank" rel="noreferrer" style={{ color: '#1DB954' }}>[open]</a>
                ) : null}
              </div>
            )}

            {editingBlog[b.id] && (
              <form onSubmit={(e) => handleEditBlog(String(b.id), e)} style={{ background: '#fff', padding: '0.75rem', borderRadius: 6, border: '2px solid #1DB954', marginBottom: 8 }}>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', color: '#555' }}>Rating (1-10)</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={editBlogReview[b.id] ?? 5}
                    onChange={(e) => setEditBlogReview({ ...editBlogReview, [b.id]: parseInt(e.target.value) })}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: 4, color: '#222' }}
                    required
                  />
                  <textarea
                    value={editBlogText[b.id] || ''}
                    onChange={(e) => setEditBlogText({ ...editBlogText, [b.id]: e.target.value })}
                    rows={4}
                    required
                    style={{ width: '100%', padding: '0.5rem', fontSize: '0.9rem', fontFamily: 'inherit', lineHeight: 1.5, border: '1px solid #ddd', borderRadius: 4, resize: 'vertical', color: '#222' }}
                  />
                </div>
                {blogEditError[b.id] && (
                  <div style={{ padding: '0.5rem', marginTop: '0.5rem', background: '#fee', color: '#c33', border: '1px solid #fcc', borderRadius: 4, fontSize: '0.85rem' }}>
                    {blogEditError[b.id]}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button
                    type="submit"
                    disabled={submittingBlogEdit[b.id]}
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', fontWeight: 600, background: '#1DB954', color: 'white', border: 'none', borderRadius: 4, cursor: submittingBlogEdit[b.id] ? 'not-allowed' : 'pointer', opacity: submittingBlogEdit[b.id] ? 0.6 : 1 }}
                  >
                    {submittingBlogEdit[b.id] ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingBlog({ ...editingBlog, [b.id]: false });
                      setEditBlogText({ ...editBlogText, [b.id]: '' });
                      setEditBlogReview({ ...editBlogReview, [b.id]: 0 });
                      setBlogEditError({ ...blogEditError, [b.id]: null });
                    }}
                    disabled={submittingBlogEdit[b.id]}
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', background: 'white', color: '#666', border: '1px solid #ddd', borderRadius: 4, cursor: submittingBlogEdit[b.id] ? 'not-allowed' : 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <details open={!!showCommentForm[b.id]}>
              <summary style={{ cursor: 'pointer', marginBottom: 8 }}>
                Comments ({b.comments?.length ?? 0})
              </summary>
              <ul style={{ marginTop: 8, display: 'grid', gap: 8 }}>
                {b.comments?.map((c) => (
                  <li key={c.id} style={{ background: '#f5f5f5', padding: 8, borderRadius: 6, color: '#222' }}>
                    {!editingComment[c.id] ? (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, color: '#777', marginBottom: 4 }}>
                              {new Date(c.date).toLocaleString()} • @{c.user?.username}
                            </div>
                            <div>{c.text}</div>
                          </div>
                          {user && (user.id === String(c.user.id) || user?.role?.id === '1') && (
                            <div style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
                              {user.id === String(c.user.id) && (<button
                                onClick={() => {
                                  setEditingComment({ ...editingComment, [c.id]: true });
                                  setEditCommentText({ ...editCommentText, [c.id]: c.text });
                                }}
                                style={{
                                  padding: '4px 8px',
                                  fontSize: '0.8rem',
                                  background: '#fff',
                                  border: '1px solid #ddd',
                                  borderRadius: 4,
                                  cursor: 'pointer',
                                }}
                                title="Edit comment"
                              >
                                ✏️
                              </button>)}
                              <button
                                onClick={() => handleDeleteComment(c.id)}
                                disabled={deletingComment[c.id]}
                                style={{
                                  padding: '4px 8px',
                                  fontSize: '0.8rem',
                                  background: '#fff',
                                  border: '1px solid #ddd',
                                  borderRadius: 4,
                                  cursor: deletingComment[c.id] ? 'not-allowed' : 'pointer',
                                  opacity: deletingComment[c.id] ? 0.6 : 1,
                                }}
                                title="Delete comment"
                              >
                                {deletingComment[c.id] ? '...' : '🗑️'}
                              </button>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <form onSubmit={(e) => handleEditComment(c.id, e)} style={{ 
                        background: '#fff', 
                        padding: '0.75rem', 
                        borderRadius: 6,
                        border: '2px solid #1DB954'
                      }}>
                        <textarea
                          value={editCommentText[c.id] || ''}
                          onChange={(e) => setEditCommentText({ ...editCommentText, [c.id]: e.target.value })}
                          rows={2}
                          required
                          style={{
                            width: '100%',
                            padding: '0.5rem',
                            fontSize: '0.9rem',
                            fontFamily: 'inherit',
                            lineHeight: 1.5,
                            border: '1px solid #ddd',
                            borderRadius: 4,
                            marginBottom: '0.5rem',
                            resize: 'vertical',
                          }}
                        />
                        {editError[c.id] && (
                          <div style={{ 
                            padding: '0.5rem', 
                            marginBottom: '0.5rem', 
                            background: '#fee', 
                            color: '#c33', 
                            border: '1px solid #fcc', 
                            borderRadius: 4,
                            fontSize: '0.85rem'
                          }}>
                            {editError[c.id]}
                          </div>
                        )}
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            type="submit"
                            disabled={submittingEdit[c.id]}
                            style={{
                              padding: '0.4rem 0.8rem',
                              fontSize: '0.85rem',
                              fontWeight: 600,
                              background: '#1DB954',
                              color: 'white',
                              border: 'none',
                              borderRadius: 4,
                              cursor: submittingEdit[c.id] ? 'not-allowed' : 'pointer',
                              opacity: submittingEdit[c.id] ? 0.6 : 1,
                            }}
                          >
                            {submittingEdit[c.id] ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingComment({ ...editingComment, [c.id]: false });
                              setEditCommentText({ ...editCommentText, [c.id]: '' });
                              setEditError({ ...editError, [c.id]: null });
                            }}
                            disabled={submittingEdit[c.id]}
                            style={{
                              padding: '0.4rem 0.8rem',
                              fontSize: '0.85rem',
                              background: 'white',
                              color: '#666',
                              border: '1px solid #ddd',
                              borderRadius: 4,
                              cursor: submittingEdit[c.id] ? 'not-allowed' : 'pointer',
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </li>
                ))}
                {!b.comments?.length && <li style={{ color: '#777' }}>No comments yet.</li>}
              </ul>

              {/* Add Comment Form - Only for logged-in users */}
              {user && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #eee' }}>
                  {!showCommentForm[b.id] ? (
                    <button
                      onClick={() => setShowCommentForm({ ...showCommentForm, [b.id]: true })}
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.9rem',
                        color: '#1DB954',
                        background: 'transparent',
                        border: '1px solid #1DB954',
                        borderRadius: 4,
                        cursor: 'pointer',
                      }}
                    >
                      Add Comment
                    </button>
                  ) : (
                    <form onSubmit={(e) => handleSubmitComment(String(b.id), e)} style={{ 
                      background: '#f9f9f9', 
                      padding: '1rem', 
                      borderRadius: 6 
                    }}>
                      <textarea
                        value={commentText[b.id] || ''}
                        onChange={(e) => setCommentText({ ...commentText, [b.id]: e.target.value })}
                        placeholder="Write a comment..."
                        rows={3}
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          fontSize: '0.9rem',
                          fontFamily: 'inherit',
                          lineHeight: 1.5,
                          border: '2px solid #ddd',
                          borderRadius: 4,
                          marginBottom: '0.75rem',
                          resize: 'vertical',
                          color: '#222'
                        }}
                      />
                      {commentError[b.id] && (
                        <div style={{ 
                          padding: '0.5rem', 
                          marginBottom: '0.75rem', 
                          background: '#fee', 
                          color: '#c33', 
                          border: '1px solid #fcc', 
                          borderRadius: 4,
                          fontSize: '0.85rem'
                        }}>
                          {commentError[b.id]}
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button
                          type="submit"
                          disabled={submittingComment[b.id]}
                          style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            background: '#1DB954',
                            color: 'white',
                            border: 'none',
                            borderRadius: 4,
                            cursor: submittingComment[b.id] ? 'not-allowed' : 'pointer',
                            opacity: submittingComment[b.id] ? 0.6 : 1,
                          }}
                        >
                          {submittingComment[b.id] ? 'Posting...' : 'Post Comment'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowCommentForm({ ...showCommentForm, [b.id]: false });
                            setCommentText({ ...commentText, [b.id]: '' });
                            setCommentError({ ...commentError, [b.id]: null });
                          }}
                          disabled={submittingComment[b.id]}
                          style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.9rem',
                            background: 'white',
                            color: '#666',
                            border: '1px solid #ddd',
                            borderRadius: 4,
                            cursor: submittingComment[b.id] ? 'not-allowed' : 'pointer',
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </details>
          </li>
        ))}
      </ul>

      <nav style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <Link aria-disabled={!hasPrev} href={hasPrev ? prevHref : '#'} style={{
          pointerEvents: hasPrev ? 'auto' : 'none',
          opacity: hasPrev ? 1 : 0.5,
          border: '1px solid #eee',
          padding: '8px 12px',
          borderRadius: 6
        }}>
          ← Prev
        </Link>
        <Link aria-disabled={!hasNext} href={hasNext ? nextHref : '#'} style={{
          pointerEvents: hasNext ? 'auto' : 'none',
          opacity: hasNext ? 1 : 0.5,
          border: '1px solid #eee',
          padding: '8px 12px',
          borderRadius: 6
        }}>
          Next →
        </Link>
      </nav>
    </main>
  );
}