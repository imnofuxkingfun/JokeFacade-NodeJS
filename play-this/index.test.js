import { fa } from 'zod/v4/locales';

//admin user token
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZUlkIjoyLCJpYXQiOjE3NjgzNDUxNDUsImV4cCI6MTc2ODk0OTk0NX0.IS-Qllz0Q65KsgzMCmRPiyS1y0shD6tm7q0p2L2p-zs";

//non-admin user token
const AUTH_TOKEN_USER3 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZUlkIjoyLCJpYXQiOjE3NjgzODE0MzcsImV4cCI6MTc2ODk4NjIzN30.GZNtzU6Msjmi0OSxhscXGj2q3DI6B2eroI3SxU7B3_E";

async function runGraphqlQuery(query, disableAuth = false, customToken = null) {
    const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(!disableAuth && { 'Authorization': customToken || AUTH_TOKEN })
        },
        body: JSON.stringify({ query }),
    });

    if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    return await response.json();
}
beforeAll(async () => {
    const { execSync } = await import('child_process');
    console.log('Resetting database with seeds...');
    execSync('npx sequelize-cli db:seed:undo:all', { stdio: 'inherit' });
    execSync('npx sequelize-cli db:seed:all', { stdio: 'inherit' });
    console.log('Database seeded successfully!');
});

describe('GraphQL Artist Query', () => {
    test('should return artist with id 1', async () => {
        const query = `
            query {
                artist(artistId: 1) {
                    id
                    name
                    description
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result).toEqual({
            data: {
                artist: {
                    id: "1",
                    name: "Alex Botea",
                    description: "Romanian artist blending hip-hop and pop."
                }
            }
        });
    });
});

test('should return blog with id 1', async () => {
    const query = `
    query {
        blog(id: 1) {
    id
    user {
      id
      username
    }
    text
    date
    review
    song {
      id
      name
      length
      spotifyLink
    }
    comments {
      id
      user {
        id
        username
      }
      blog_id
      text
      date
    }
  }
}
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            blog: {
                id: 1,
                user: {
                    id: "1",
                    username: "imnofuxkingfun"
                },
                text: "Blinding Lights is a masterpiece. Perfect for late night drives.",
                date: "2024-01-03T00:00:00.000Z",
                review: 9,
                song: {
                    id: "18",
                    name: "Blinding Lights",
                    length: 3.2,
                    spotifyLink: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b"
                },
                comments: [
                    {
                        id: "1",
                        user: {
                            id: "2",
                            username: "mihaidanaila"
                        },
                        blog_id: 1,
                        text: "Fits rooftop runs too.",
                        date: "2024-02-01T00:00:00.000Z"
                    },
                    {
                        id: "2",
                        user: {
                            id: "3",
                            username: "dickgrayson"
                        },
                        blog_id: 1,
                        text: "This is the one for midnight drives.",
                        date: "2024-02-02T00:00:00.000Z"
                    }
                ]
            }
        }
    });
});

//LUCA!! MUTATIONS

//signup mutation tests
describe('GraphQL signupMutation', () => {
    test('should create a new user and return token', async () => {
        const query = `
            mutation {
                signup(email: "testuser@example.com", username: "testuser", password: "password123") {
                    token
                    user {
                        id
                        email
                        username
                    }
                }
            }
        `;

        const result = await runGraphqlQuery(query, true);

        expect(result.data.signup).toBeDefined();
        expect(result.data.signup.token).toBeDefined();
        expect(result.data.signup.user.email).toBe("testuser@example.com");
        expect(result.data.signup.user.username).toBe("testuser");
    });

    test('should throw error if email already in use', async () => {
        const query = `
            mutation {
                signup(email: "luca@admin.com", username: "newuser", password: "password123") {
                    token
                    user {
                        id
                        email
                        username
                    }
                }
            }
        `;

        const result = await runGraphqlQuery(query, true);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Email already in use');
    });

    test('should throw error if username already in use', async () => {
        const query = `
            mutation {
                signup(email: "newemail@example.com", username: "imnofuxkingfun", password: "password123") {
                    token
                    user {
                        id
                        email
                        username
                    }
                }
            }
        `;

        const result = await runGraphqlQuery(query, true);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Username already in use');
    });
});

//login mutation tests
describe('GraphQL loginMutation', () => {
    test('should login user with correct credentials', async () => {
        const query = `
            mutation {
                login(email: "luca@admin.com", password: "User!100") {
                    token
                    user {
                        id
                        email
                        username
                    }
                }
            }
        `;

        const result = await runGraphqlQuery(query, true);

        expect(result.data.login).toBeDefined();
        expect(result.data.login.token).toBeDefined();
        expect(result.data.login.user.email).toBe("luca@admin.com");
        expect(result.data.login.user.username).toBe("imnofuxkingfun");
    });

    test('should throw error with invalid email', async () => {
        const query = `
            mutation {
                login(email: "nonexistent@example.com", password: "User!100") {
                    token
                    user {
                        id
                        email
                        username
                    }
                }
            }
        `;

        const result = await runGraphqlQuery(query, true);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Invalid credentials');
    });

    test('should throw error with incorrect password', async () => {
        const query = `
            mutation {
                login(email: "luca@admin.com", password: "wrongpassword") {
                    token
                    user {
                        id
                        email
                        username
                    }
                }
            }
        `;

        const result = await runGraphqlQuery(query, true);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Invalid credentials');
    });
});


//role mutations tests
describe('GraphQL Role Mutations', () => {
    test('createRole: should create a new role as admin', async () => {
        const query = `
            mutation {
                createRole(name: "moderator") {
                    id
                    name
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.data.createRole).toBeDefined();
        expect(result.data.createRole.name).toBe("moderator");
    });

    test('createRole: should throw error if role name already exists', async () => {
        const query = `
            mutation {
                createRole(name: "admin") {
                    id
                    name
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Role name already exists');
    });

    test('editRole: should edit an existing role', async () => {
        const query = `
            mutation {
                editRole(id: 1, input: {name: "superadmin"}) {
                    id
                    name
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.data.editRole).toBeDefined();
        expect(result.data.editRole.id).toBe("1");
        expect(result.data.editRole.name).toBe("superadmin");
    });

    test('editRole: should throw error if role not found', async () => {
        const query = `
            mutation {
                editRole(id: 999, input: {name: "nonexistent"}) {
                    id
                    name
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Role not found');
    });

    test('deleteRole: should delete an existing role', async () => {
        const query = `
            mutation {
                deleteRole(id: 3) {
                    id
                    name
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.data.deleteRole).toBeDefined();
        expect(result.data.deleteRole.id).toBe("3");
    });

    test('deleteRole: should throw error if role not found', async () => {
        const query = `
            mutation {
                deleteRole(id: 999) {
                    id
                    name
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Role not found');
    });
});

//profile mutations tests
describe('GraphQL Profile Mutations', () => {
    test('editProfile: should edit own profile', async () => {
        const query = `
            mutation {
                editProfile(id: 2, input: {display_name: "Mihai Updated", bio: "Music lover and developer"}) {
                    user_id
                    display_name
                    bio
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.data.editProfile).toBeDefined();
        expect(result.data.editProfile.user_id).toBe("2");
        expect(result.data.editProfile.display_name).toBe("Mihai Updated");
        expect(result.data.editProfile.bio).toBe("Music lover and developer");
    });

    test('editProfile: should throw error when editing another profile', async () => {
        const query = `
            mutation {
                editProfile(id: 1, input: {display_name: "Hacker"}) {
                    user_id
                    display_name
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: only owners can edit profiles');
    });

    test('editProfile: should throw error for non-existent profile', async () => {
        const query = `
            mutation {
                editProfile(id: 999, input: {display_name: "Test"}) {
                    user_id
                    display_name
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Profile not found');
    });
});

//blog mutations tests
describe('GraphQL Blog Mutations', () => {
    test('createBlog: should create a blog when authenticated', async () => {
        const query = `
            mutation {
                createBlog(input: { text: "Great track", review: 9 }, song_id: 18) {
                    id
                    text
                    review
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeUndefined();
        expect(result.data.createBlog).toBeDefined();
        expect(result.data.createBlog.text).toBe("Great track");
        expect(result.data.createBlog.review).toBe(9);
    });

    test('createBlog: should fail when unauthenticated', async () => {
        const query = `
            mutation {
                createBlog(input: { text: "No auth", review: 5 }, song_id: 18) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query, true);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: you must be logged in to create a blog');
    });

    test('editBlog: should edit own blog', async () => {
        const createQuery = `
            mutation {
                createBlog(input: { text: "Temp text", review: 7 }, song_id: 18) {
                    id
                }
            }
        `;
        const createResult = await runGraphqlQuery(createQuery);
        const blogId = createResult.data.createBlog.id;

        const editQuery = `
            mutation {
                editBlog(id: ${blogId}, input: { text: "Edited text", review: 8 }) {
                    id
                    text
                    review
                }
            }
        `;

        const result = await runGraphqlQuery(editQuery);

        expect(result.errors).toBeUndefined();
        expect(result.data.editBlog).toBeDefined();
        expect(result.data.editBlog.id).toBe(blogId);
        expect(result.data.editBlog.text).toBe("Edited text");
        expect(result.data.editBlog.review).toBe(8);
    });

    test('editBlog: should fail when editing another user\'s blog', async () => {
        const query = `
            mutation {
                editBlog(id: 1, input: { text: "Hack", review: 1 }) {
                    id
                    text
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: can only edit your own blog');
    });

    test('editBlog: should fail when blog not found', async () => {
        const query = `
            mutation {
                editBlog(id: 9999, input: { text: "Missing", review: 5 }) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Blog not found');
    });

    test('deleteBlog: should delete own blog', async () => {
        const createQuery = `
            mutation {
                createBlog(input: { text: "Delete me", review: 6 }, song_id: 18) {
                    id
                }
            }
        `;
        const createResult = await runGraphqlQuery(createQuery);
        const blogId = createResult.data.createBlog.id;

        const deleteQuery = `
            mutation {
                deleteBlog(id: ${blogId}) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(deleteQuery);

        expect(result.errors).toBeUndefined();
        expect(result.data.deleteBlog).toBeDefined();
        expect(result.data.deleteBlog.id).toBe(blogId);
    });

    test('deleteBlog: should fail when deleting another user\'s blog', async () => {
        const query = `
            mutation {
                deleteBlog(id: 1) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query, false, AUTH_TOKEN_USER3);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: only admins or owners can delete blogs');
    });

    test('deleteBlog: should fail when blog not found', async () => {
        const query = `
            mutation {
                deleteBlog(id: 9999) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query,false, AUTH_TOKEN_USER3);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Blog not found');
    });
});

//comment mutations tests
describe('GraphQL Comment Mutations', () => {
    test('createComment: should create when authenticated', async () => {
        const query = `
            mutation {
                createComment(blog_id: 4, text: "Great blog") {
                    id
                    text
                    blog_id
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeUndefined();
        expect(result.data.createComment).toBeDefined();
        expect(result.data.createComment.text).toBe("Great blog");
        expect(result.data.createComment.blog_id).toBe(4);
    });

    test('createComment: should fail when unauthenticated', async () => {
        const query = `
            mutation {
                createComment(blog_id: 4, text: "No auth") {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query, true);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: you must be logged in to create a comment');
    });

    test('editComment: should edit own comment', async () => {
        const createQuery = `
            mutation {
                createComment(blog_id: 4, text: "Temp comment") {
                    id
                }
            }
        `;
        const createResult = await runGraphqlQuery(createQuery);
        const commentId = createResult.data.createComment.id;

        const editQuery = `
            mutation {
                editComment(id: ${commentId}, input: { text: "Updated comment" }) {
                    id
                    text
                }
            }
        `;

        const result = await runGraphqlQuery(editQuery);

        expect(result.errors).toBeUndefined();
        expect(result.data.editComment).toBeDefined();
        expect(result.data.editComment.id).toBe(commentId);
        expect(result.data.editComment.text).toBe("Updated comment");
    });

    test('editComment: should fail when editing another user\'s comment', async () => {
        const createQuery = `
            mutation {
                createComment(blog_id: 4, text: "Owner comment") {
                    id
                }
            }
        `;
        const createResult = await runGraphqlQuery(createQuery);
        const commentId = createResult.data.createComment.id;

        const editQuery = `
            mutation {
                editComment(id: ${commentId}, input: { text: "Hacked" }) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(editQuery, false, AUTH_TOKEN_USER3);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: can only edit your own comment');
    });

    test('editComment: should fail when comment not found', async () => {
        const query = `
            mutation {
                editComment(id: 9999, input: { text: "Missing" }) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Comment not found');
    });

    test('deleteComment: should delete own comment', async () => {
        const createQuery = `
            mutation {
                createComment(blog_id: 4, text: "Delete me comment") {
                    id
                }
            }
        `;
        const createResult = await runGraphqlQuery(createQuery,false, AUTH_TOKEN_USER3);
        const commentId = createResult.data.createComment.id;

        const deleteQuery = `
            mutation {
                deleteComment(id: ${commentId}) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(deleteQuery, false, AUTH_TOKEN_USER3);

        expect(result.errors).toBeUndefined();
        expect(result.data.deleteComment).toBeDefined();
        expect(result.data.deleteComment.id).toBe(commentId);
    });

    test('deleteComment: should fail when deleting another user\'s comment', async () => {
        const createQuery = `
            mutation {
                createComment(blog_id: 4, text: "Another\'s comment") {
                    id
                }
            }
        `;
        const createResult = await runGraphqlQuery(createQuery);
        const commentId = createResult.data.createComment.id;

        const deleteQuery = `
            mutation {
                deleteComment(id: ${commentId}) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(deleteQuery, false, AUTH_TOKEN_USER3);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: only admins or owners can delete blogs');
    });

    test('deleteComment: should fail when comment not found', async () => {
        const query = `
            mutation {
                deleteComment(id: 9999) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Comment not found');
    });
});

//genre mutations tests
describe('GraphQL Genre Mutations', () => {
    test('createGenre: should create when admin', async () => {
        const query = `
            mutation {
                createGenre(name: "Test Genre") {
                    id
                    name
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeUndefined();
        expect(result.data.createGenre).toBeDefined();
        expect(result.data.createGenre.name).toBe("Test Genre");
    });

    test('createGenre: should fail when not admin', async () => {
        const query = `
            mutation {
                createGenre(name: "NoAdmin") {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query, false, AUTH_TOKEN_USER3);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: only admins can create genres');
    });

    test('editGenre: should edit when admin', async () => {
        const createQuery = `
            mutation {
                createGenre(name: "Editable Genre") {
                    id
                }
            }
        `;
        const createResult = await runGraphqlQuery(createQuery);
        const genreId = createResult.data.createGenre.id;

        const editQuery = `
            mutation {
                editGenre(id: ${genreId}, input: { name: "Edited Genre" }) {
                    id
                    name
                }
            }
        `;

        const result = await runGraphqlQuery(editQuery);

        expect(result.errors).toBeUndefined();
        expect(result.data.editGenre).toBeDefined();
        expect(result.data.editGenre.id).toBe(genreId);
        expect(result.data.editGenre.name).toBe("Edited Genre");
    });

    test('editGenre: should fail when not admin', async () => {
        const query = `
            mutation {
                editGenre(id: 1, input: { name: "Hack" }) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query, false, AUTH_TOKEN_USER3);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: only admins can edit genres');
    });

    test('editGenre: should fail when genre not found', async () => {
        const query = `
            mutation {
                editGenre(id: 9999, input: { name: "Missing" }) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Genre not found');
    });

    test('deleteGenre: should delete when admin', async () => {
        const createQuery = `
            mutation {
                createGenre(name: "Delete Genre") {
                    id
                }
            }
        `;
        const createResult = await runGraphqlQuery(createQuery);
        const genreId = createResult.data.createGenre.id;

        const deleteQuery = `
            mutation {
                deleteGenre(id: ${genreId}) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(deleteQuery);

        expect(result.errors).toBeUndefined();
        expect(result.data.deleteGenre).toBeDefined();
        expect(result.data.deleteGenre.id).toBe(genreId);
    });

    test('deleteGenre: should fail when not admin', async () => {
        const query = `
            mutation {
                deleteGenre(id: 1) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query, false, AUTH_TOKEN_USER3);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: only admins can delete genres');
    });

    test('deleteGenre: should fail when genre not found', async () => {
        const query = `
            mutation {
                deleteGenre(id: 9999) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Genre not found');
    });
});

//artist mutations tests
describe('GraphQL Artist Mutations', () => {
    test('createArtist: should create when admin', async () => {
        const query = `
            mutation {
                createArtist(input: { name: "Test Artist", description: "New artist" }) {
                    id
                    name
                    description
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeUndefined();
        expect(result.data.createArtist).toBeDefined();
        expect(result.data.createArtist.name).toBe("Test Artist");
        expect(result.data.createArtist.description).toBe("New artist");
    });

    test('createArtist: should fail when not admin', async () => {
        const query = `
            mutation {
                createArtist(input: { name: "NoAdmin Artist", description: "Should fail" }) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query, false, AUTH_TOKEN_USER3);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: only admins can add artists');
    });

    test('editArtist: should edit when admin', async () => {
        const createQuery = `
            mutation {
                createArtist(input: { name: "Editable Artist", description: "Temp" }) {
                    id
                }
            }
        `;
        const createResult = await runGraphqlQuery(createQuery);
        const artistId = createResult.data.createArtist.id;

        const editQuery = `
            mutation {
                editArtist(id: ${artistId}, input: { name: "Edited Artist", description: "Updated" }) {
                    id
                    name
                    description
                }
            }
        `;

        const result = await runGraphqlQuery(editQuery);

        expect(result.errors).toBeUndefined();
        expect(result.data.editArtist).toBeDefined();
        expect(result.data.editArtist.id).toBe(artistId);
        expect(result.data.editArtist.name).toBe("Edited Artist");
        expect(result.data.editArtist.description).toBe("Updated");
    });

    test('editArtist: should fail when not admin', async () => {
        const query = `
            mutation {
                editArtist(id: 1, input: { name: "Hack", description: "Hacked" }) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query, false, AUTH_TOKEN_USER3);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: only admins can edit artists');
    });

    test('editArtist: should fail when artist not found', async () => {
        const query = `
            mutation {
                editArtist(id: 9999, input: { name: "Missing", description: "None" }) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Artist not found');
    });

    test('deleteArtist: should delete when admin', async () => {
        const createQuery = `
            mutation {
                createArtist(input: { name: "Delete Artist", description: "Temp" }) {
                    id
                }
            }
        `;
        const createResult = await runGraphqlQuery(createQuery);
        const artistId = createResult.data.createArtist.id;

        const deleteQuery = `
            mutation {
                deleteArtist(id: ${artistId}) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(deleteQuery);

        expect(result.errors).toBeUndefined();
        expect(result.data.deleteArtist).toBeDefined();
        expect(result.data.deleteArtist.id).toBe(artistId);
    });

    test('deleteArtist: should fail when not admin', async () => {
        const query = `
            mutation {
                deleteArtist(id: 1) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query, false, AUTH_TOKEN_USER3);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: only admins can delete artists');
    });

    test('deleteArtist: should fail when artist not found', async () => {
        const query = `
            mutation {
                deleteArtist(id: 9999) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Artist not found');
    });
});

//song mutations tests
describe('GraphQL Song Mutations', () => {
    test('createSong: should create when admin', async () => {
        const query = `
            mutation {
                createSong(input: { name: "Test Song", length: 3.5, genre_ids: [1], artist_ids: [1], spotifyLink: "https://example.com" }) {
                    id
                    name
                    length
                    spotifyLink
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeUndefined();
        expect(result.data.createSong).toBeDefined();
        expect(result.data.createSong.name).toBe("Test Song");
        expect(result.data.createSong.length).toBe(3.5);
        expect(result.data.createSong.spotifyLink).toBe("https://example.com");
    });

    test('createSong: should fail when not admin', async () => {
        const query = `
            mutation {
                createSong(input: { name: "NoAdmin Song", length: 3.1 }) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query, false, AUTH_TOKEN_USER3);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: only admins can create songs');
    });

    test('editSong: should edit when admin', async () => {
        const createQuery = `
            mutation {
                createSong(input: { name: "Editable Song", length: 2.9, spotifyLink: "https://test.jest"  }) {
                    id
                }
            }
        `;
        const createResult = await runGraphqlQuery(createQuery);
        const songId = createResult.data.createSong.id;

        const editQuery = `
            mutation {
                editSong(id: ${songId}, input: { name: "Edited Song", length: 3.0, spotifyLink: "https://edited" }) {
                    id
                    name
                    length
                    spotifyLink
                }
            }
        `;

        const result = await runGraphqlQuery(editQuery);

        expect(result.errors).toBeUndefined();
        expect(result.data.editSong).toBeDefined();
        expect(result.data.editSong.id).toBe(songId);
        expect(result.data.editSong.name).toBe("Edited Song");
        expect(result.data.editSong.length).toBe(3.0);
        expect(result.data.editSong.spotifyLink).toBe("https://edited");
    });

    test('editSong: should fail when not admin', async () => {
        const query = `
            mutation {
                editSong(id: 1, input: { name: "Hack", length: 3.3 }) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query, false, AUTH_TOKEN_USER3);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: only admins can edit songs');
    });

    test('editSong: should fail when song not found', async () => {
        const query = `
            mutation {
                editSong(id: 9999, input: { name: "Missing", length: 4.0 }) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Song not found');
    });

    test('deleteSong: should delete when admin', async () => {
        const createQuery = `
            mutation {
                createSong(input: { name: "Delete Song", length: 3.2, spotifyLink: "https://test.jest"  }) {
                    id
                }
            }
        `;
        const createResult = await runGraphqlQuery(createQuery);
        const songId = createResult.data.createSong.id;

        const deleteQuery = `
            mutation {
                deleteSong(id: ${songId}) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(deleteQuery);

        expect(result.errors).toBeUndefined();
        expect(result.data.deleteSong).toBeDefined();
        expect(result.data.deleteSong.id).toBe(songId);
    });

    test('deleteSong: should fail when not admin', async () => {
        const query = `
            mutation {
                deleteSong(id: 1) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query, false, AUTH_TOKEN_USER3);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: only admins can delete songs');
    });

    test('deleteSong: should fail when song not found', async () => {
        const query = `
            mutation {
                deleteSong(id: 9999) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Song not found');
    });
});

//liked songs mutations tests
describe('GraphQL Liked Songs Mutations', () => {
    test('addLikedSong: should add when authenticated', async () => {
        const query = `
            mutation {
                addLikedSong(songId: 18) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeUndefined();
        expect(result.data.addLikedSong).toBeDefined();
        expect(Array.isArray(result.data.addLikedSong)).toBe(true);
    });

    test('addLikedSong: should fail when unauthenticated', async () => {
        const query = `
            mutation {
                addLikedSong(songId: 18) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query, true);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: you must be logged in to like a song');
    });

    test('addLikedSong: should fail when song not found', async () => {
        const query = `
            mutation {
                addLikedSong(songId: 9999) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Song not found');
    });

    test('deleteLikedSong: should delete liked song', async () => {
        // ensure liked song exists
        const addQuery = `
            mutation {
                addLikedSong(songId: 18) {
                    id
                }
            }
        `;
        await runGraphqlQuery(addQuery);

        const deleteQuery = `
            mutation {
                deleteLikedSong(songId: 18) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(deleteQuery);

        expect(result.errors).toBeUndefined();
        expect(result.data.deleteLikedSong).toBeDefined();
        expect(Array.isArray(result.data.deleteLikedSong)).toBe(true);
    });

    test('deleteLikedSong: should fail when unauthenticated', async () => {
        const query = `
            mutation {
                deleteLikedSong(songId: 18) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query, true);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: you must be logged in to unlike a song');
    });

    test('deleteLikedSong: should fail when like not found', async () => {
        const query = `
            mutation {
                deleteLikedSong(songId: 9999) {
                    id
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Song not found');
    });
});

//user mutations tests
describe('GraphQL User Mutations', () => {
    test('editUser: should edit own user profile', async () => {
        const query = `
            mutation {
                editUser(id: 2, input: {username: "mihaidanaila_updated"}) {
                    id
                    email
                    username
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.data.editUser).toBeDefined();
        expect(result.data.editUser.id).toBe("2");
        expect(result.data.editUser.username).toBe("mihaidanaila_updated");
    });

    test('editUser: should throw error when editing another user', async () => {
        const query = `
            mutation {
                editUser(id: 1, input: {username: "newusername"}) {
                    id
                    email
                    username
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: can only edit your own profile');
    });

    test('editUser: should throw error for non-existent user', async () => {
        const query = `
            mutation {
                editUser(id: 999, input: {username: "test"}) {
                    id
                    email
                    username
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('User not found');
    });

    test('deleteUser: should throw error when deleting another user without admin', async () => {
        const query = `
            mutation {
                deleteUser(id: 1) {
                    id
                    email
                    username
                }
            }
        `;

        const result = await runGraphqlQuery(query, false, AUTH_TOKEN_USER3);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Unauthorized: only admins or owners can delete users');
    });

    test('deleteUser: should delete own user account', async () => {
        const query = `
            mutation {
                deleteUser(id: 3) {
                    id
                    email
                    username
                }
            }
        `;

        const result = await runGraphqlQuery(query, false, AUTH_TOKEN_USER3);

        expect(result.data.deleteUser).toBeDefined();
        expect(result.data.deleteUser.id).toBe("3");
    });

    test('deleteUser: should throw error for non-existent user', async () => {
        const query = `
            mutation {
                deleteUser(id: 999) {
                    id
                    email
                    username
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('User not found');
    });
});