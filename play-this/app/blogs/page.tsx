import Link from 'next/link';
import { getAllBlogs } from '@/actions/blog';

type PageProps = {
  searchParams?: { page?: string; limit?: string };
};

export default async function BlogsPage({ searchParams }: PageProps) {
  const page = Number(searchParams?.page ?? '1');
  const limit = Number(searchParams?.limit ?? '10');

  const { items, hasPrev, hasNext, pageCount, total } = await getAllBlogs(page, limit);

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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <strong>@{b.user?.username}</strong>
              <span style={{ color: '#888' }}>{new Date(b.date).toLocaleDateString()}</span>
            </div>

            {typeof b.review === 'number' && (
              <div style={{ marginBottom: 8 }}>Review: {b.review}/10</div>
            )}

            <p style={{ marginBottom: 8 }}>{b.text}</p>

            {b.song && (
              <div style={{ fontSize: 14, color: '#555', marginBottom: 8 }}>
                Song: {b.song.name} {b.song.spotifyLink ? (
                  <a href={b.song.spotifyLink} target="_blank" rel="noreferrer">[open]</a>
                ) : null}
              </div>
            )}

            <details>
              <summary>Comments ({b.comments?.length ?? 0})</summary>
              <ul style={{ marginTop: 8, display: 'grid', gap: 8 }}>
                {b.comments?.map((c) => (
                  <li key={c.id} style={{ background: '#fafafa', padding: 8, borderRadius: 6 }}>
                    <div style={{ fontSize: 12, color: '#777', marginBottom: 4 }}>
                      {new Date(c.date).toLocaleString()} • user #{c.user_id}
                    </div>
                    <div>{c.text}</div>
                  </li>
                ))}
                {!b.comments?.length && <li style={{ color: '#777' }}>No comments yet.</li>}
              </ul>
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