'use server';
import { gql } from 'graphql-request';
import { getClient } from '@/lib/graphql-client';

type UserDisplay = { id: string; username: string };
type Song = { id: string; name: string; length: number; spotifyLink?: string | null };
type Comment = { id: string; user: { id: number; username: string }; blog_id: number; text: string; date: Date };
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
      comments {
            id
            blog_id
            text
            date
            user {
                id
                username
            }
        }
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
      comments {
            id
            blog_id
            text
            date
            user {
                id
                username
            }
        }
    }
  }
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($blog_id: Int!, $text: String!) {
    createComment(blog_id: $blog_id, text: $text) {
      id
      user { id username }
      blog_id
      text
      date
    }
  }
`;

const EDIT_COMMENT_MUTATION = gql`
  mutation EditComment($id: Int!, $input: CommentInput!) {
    editComment(id: $id, input: $input) {
      id
      user { id username }
      blog_id
      text
      date
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($id: Int!) {
    deleteComment(id: $id) {
      id
      user { id username }
      blog_id
      text
      date
    }
  }
`;

const EDIT_BLOG_MUTATION = gql`
  mutation EditBlog($id: Int!, $input: BlogInput!) {
    editBlog(id: $id, input: $input) {
      id
      text
      date
      review
      user { id username }
      song { id name length spotifyLink }
      comments {
        id
        blog_id
        text
        date
        user { id username }
      }
    }
  }
`;

const DELETE_BLOG_MUTATION = gql`
  mutation DeleteBlog($id: Int!) {
    deleteBlog(id: $id) {
      id
      text
      date
      review
      user { id username }
      song { id name length spotifyLink }
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

export async function createComment(blogId: number, text: string) {
  const client = await getClient();
  
  const variables = {
    blog_id: blogId,
    text,
  };

  const data = await client.request<{ createComment: Comment }>(CREATE_COMMENT_MUTATION, variables);
  return data.createComment;
}


export async function editComment(commentId: number, text: string) {
  const client = await getClient();
  
  const variables = {
    id: commentId,
    input: {
      text,
    },
  };

  const data = await client.request<{ editComment: Comment }>(EDIT_COMMENT_MUTATION, variables);
  return data.editComment;
}

export async function deleteComment(commentId: number) {
  const client = await getClient();
  
  const variables = {
    id: commentId,
  };

  const data = await client.request<{ deleteComment: Comment }>(DELETE_COMMENT_MUTATION, variables);
  return data.deleteComment;
}


export async function editBlog(blogId: number, text: string, review?: number | null) {
  const client = await getClient();
  const variables = {
    id: blogId,
    input: { text, review: review ?? null },
  };
  const data = await client.request<{ editBlog: Blog }>(EDIT_BLOG_MUTATION, variables);
  return data.editBlog;
}

export async function deleteBlog(blogId: number) {
  const client = await getClient();
  const data = await client.request<{ deleteBlog: Blog }>(DELETE_BLOG_MUTATION, { id: blogId });
  return data.deleteBlog;
}