'use server';
import { gql } from 'graphql-request';
import { getClient } from '@/lib/graphql-client';

type UserDisplay = { id: string; username: string };
type Song = { id: string; name: string; length: number; spotifyLink?: string | null };
type Comment = { id: string; user_id: number; blog_id: number; text: string; date: string };
export type Blog = {
  id: number;
  text: string;
  date: string;
  review?: number | null;
  user: UserDisplay;
  song?: Song | null;
  comments: Comment[];
};

const BLOGS_QUERY = gql`
  query Blogs {
    blogs {
      id
      text
      date
      review
      user { id username }
      song { id name length spotifyLink }
      comments { id user_id blog_id text date }
    }
  }
`;

export async function getAllBlogs(page = 1, limit = 10) {
  const client = await getClient();
  const data = await client.request<{ blogs: Blog[] }>(BLOGS_QUERY);

  const total = data.blogs.length;
  const start = Math.max(0, (page - 1) * limit);
  const end = start + limit;
  const items = data.blogs.slice(start, end);

  return {
    items,
    total,
    page,
    limit,
    pageCount: Math.max(1, Math.ceil(total / limit)),
    hasPrev: page > 1,
    hasNext: end < total,
  };
}