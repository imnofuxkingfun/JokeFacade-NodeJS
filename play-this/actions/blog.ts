'use server';
import { gql } from 'graphql-request';
import { getClient } from '@/lib/graphql-client';

type UserDisplay = { id: string; username: string };
type Song = { id: string; name: string; length: number; spotifyLink?: string | null };
type Comment = { id: string; user_id: number; blog_id: number; text: string; date: Date };
export type Blog = {
  id: number;
  text: string;
  date: Date;
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

const CREATE_BLOG_MUTATION = gql`
  mutation CreateBlog($input: BlogInput!, $song_id: Int) {
    createBlog(input: $input, song_id: $song_id) {
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

export async function getAllBlogs(page = 1, limit = 5) {
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

export async function createBlog(text: string, review: number, songId?: string) {
  const client = await getClient();
  
  const variables = {
    input: {
      text,
      review,
    },
    song_id: songId ? parseInt(songId) : null,
  };

  const data = await client.request<{ createBlog: Blog }>(CREATE_BLOG_MUTATION, variables);
  return data.createBlog;
}