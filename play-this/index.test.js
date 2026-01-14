const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZUlkIjoyLCJpYXQiOjE3NjgzNDUxNDUsImV4cCI6MTc2ODk0OTk0NX0.IS-Qllz0Q65KsgzMCmRPiyS1y0shD6tm7q0p2L2p-zs"

async function runGraphqlQuery(query, disableAuth = false) {
    const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(!disableAuth && { 'Authorization': AUTH_TOKEN })
        },
        body: JSON.stringify({ query }),
    });

    if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    return await response.json();
}
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

describe('GraphQL Artist Query - Non-existent', () => {
    test('should return null for non-existent artist', async () => {
        const query = `
            query {
                artist(artistId: 0) {
                    id
                    name
                    description
                }
            }
        `;

        const result = await runGraphqlQuery(query);

        expect(result).toEqual({
            data: {
                artist: null
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

test('should return null for non-existent blog', async () => {
    const query = `
    query {
        blog(id: 0) {
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
            blog: null
        }
    });
});


test('should return genre display with id 1', async () => {
    const query = `
        query {
            genreDisplay(id: 1) {
                id
                name
                subgenres {
                    id
                    name
                }
                songs {
                    id
                    name
                    length
                    spotifyLink
                }
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            genreDisplay: {
                id: "1",
                name: "Hip-Hop",
                subgenres: [
                    {
                        id: "2",
                        name: "Trap"
                    },
                    {
                        id: "18",
                        name: "Rap"
                    }
                ],
                songs: [
                    { id: "1", name: "112 Arabii", length: 3.45, spotifyLink: "https://open.spotify.com/track/6ryYkPaIuqPcnlWwJrdMBN" },
                    { id: "25", name: "Retro Drive", length: 3.7, spotifyLink: "https://open.spotify.com/track/0X2G0m6hIXc0CohTLM92MJ" },
                    { id: "40", name: "Verdansk", length: 4.15, spotifyLink: "https://open.spotify.com/track/3AEOrh7zWjV2rVS1yOd41q" },
                    { id: "51", name: "HUMBLE.", length: 3.54, spotifyLink: "https://open.spotify.com/track/7KXjTSCq5nL1LoYtL7XAwS" },
                    { id: "52", name: "DNA.", length: 3.02, spotifyLink: "https://open.spotify.com/track/6HZILIRieu8S0iqY8kIKhj" },
                    { id: "53", name: "The Blacker The Berry", length: 3.61, spotifyLink: "https://open.spotify.com/track/5Mtt6tZSZA9cXTHGSGpyh0" },
                    { id: "54", name: "King Kunta", length: 3.54, spotifyLink: "https://open.spotify.com/track/0N3W5peJUQtI4eyR6GJT5O" },
                    { id: "55", name: "No Role Modelz", length: 3.13, spotifyLink: "https://open.spotify.com/track/68Dni7IE4VyPkTOH9mRWHr" },
                    { id: "56", name: "Neighbors", length: 3.38, spotifyLink: "https://open.spotify.com/track/0utlOiJy2weVl9WTkcEWHy" },
                    { id: "57", name: "Power Trip", length: 3.33, spotifyLink: "https://open.spotify.com/track/2uwnP6tZVVmTovzX5ELooy" },
                    { id: "67", name: "Cherry Bomb", length: 3.04, spotifyLink: "https://open.spotify.com/track/1sJZgGyZJookIoyLi9jDOV" },
                    { id: "68", name: "LUMBERJACK", length: 3.37, spotifyLink: "https://open.spotify.com/track/0BiK5BbYNFLb88CCOxBFJe" },
                    { id: "69", name: "Earfquake", length: 3.18, spotifyLink: "https://open.spotify.com/track/1nXZnTALNXiPlvXotqHm66" },
                    { id: "70", name: "A Boy Is A Gun*", length: 3.16, spotifyLink: "https://open.spotify.com/track/4RVwu0g32PAqgUiJoXsdF8" }
                ]
            }
        }
    });
});


test('should return null for non-existent genre', async () => {
    const query = `
        query {
            genreDisplay(id: 0) {
                id
                name
                subgenres {
                    id
                    name
                }
                songs {
                    id
                    name
                    length
                    spotifyLink
                }
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            genreDisplay: null
        }
    });
});


test('should return genre with id 1', async () => {
    const query = `
        query {
            genre(id: 1) {
                id
                name
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            genre: {
                id: "1",
                name: "Hip-Hop"
            }
        }
    });
});

test('should return null for non-existent genre', async () => {
    const query = `
        query {
            genre(id: 0) {
                id
                name
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            genre: null
        }
    });
});

test('should return role with id 1', async () => {
    const query = `
        query {
            role(id: 1) {
                id
                name
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            role: {
                id: "1",
                name: "admin"
            }
        }
    });
});

test('should return null for non-existent role', async () => {
    const query = `
        query {
            role(id: 0) {
                id
                name
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            role: null
        }
    });
});

test('should return session user with valid token', async () => {
    const query = `
        query {
            sessionUser(token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZUlkIjoyLCJpYXQiOjE3NjgzNDUxNDUsImV4cCI6MTc2ODk0OTk0NX0.IS-Qllz0Q65KsgzMCmRPiyS1y0shD6tm7q0p2L2p-zs") {
                id
                email
                username
                role {
                    id
                    name
                }
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            sessionUser: {
                id: "2",
                email: "mihai@admin.com",
                username: "mihaidanaila",
                role: {
                    id: "1",
                    name: "admin"
                }
            }
        }
    });
});

test('should return null for user without valid token', async () => {
    const query = `
        query {
            sessionUser(token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZUlkIjoyLCJpYXQiOjE3NjgzNDUxNDUsImV4cCI6MTc2ODk0OTk0NX0.IS-Qllz0Q65KsgzMCmRPiyS1y0shD6tm7q0p2L2p-zs") {
                id
                email
                username
                role {
                    id
                    name
                }
            }
        }
    `;

    const result = await runGraphqlQuery(query, true);

    expect(result).toEqual({
        data: {
            sessionUser: null
        }
    });
});

test('should return song display with id 1', async () => {
    const query = `
        query {
            songDisplay(id: 1) {
                id
                name
                length
                spotifyLink
                artists {
                    id
                    name
                    description
                }
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            songDisplay: {
                id: "1",
                name: "112 Arabii",
                length: 3.45,
                spotifyLink: "https://open.spotify.com/track/6ryYkPaIuqPcnlWwJrdMBN",
                artists: [
                    {
                        id: "1",
                        name: "Alex Botea",
                        description: "Romanian artist blending hip-hop and pop."
                    }
                ]
            }
        }
    });
});

test('should return null for non-existent song display', async () => {
    const query = `
        query {
            songDisplay(id: 0) {
                id
                name
                length
                spotifyLink
                artists {
                    id
                    name
                    description
                }
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            songDisplay: null
        }
    });
});

test('should return song with id 1', async () => {
    const query = `
        query {
            song(id: 1) {
                id
                name
                length
                spotifyLink
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            song: {
                id: "1",
                name: "112 Arabii",
                length: 3.45,
                spotifyLink: "https://open.spotify.com/track/6ryYkPaIuqPcnlWwJrdMBN"
            }
        }
    });
});

test('should return null for non-existent song', async () => {
    const query = `
        query {
            song(id: 0) {
                id
                name
                length
                spotifyLink
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            song: null
        }
    });
});

test('should return liked songs', async () => {
    const query = `
        query {
            likedSongs {
                id
                name
                length
                spotifyLink
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            likedSongs: [
                {
                    id: "8",
                    name: "FE!N",
                    length: 3.1,
                    spotifyLink: "https://open.spotify.com/track/42VsgItocQwOQC3XWZ8JNA"
                },
                {
                    id: "14",
                    name: "Slumber Party",
                    length: 3,
                    spotifyLink: "https://open.spotify.com/track/11ZulcYY4lowvcQm4oe3VJ"
                },
                {
                    id: "51",
                    name: "HUMBLE.",
                    length: 3.54,
                    spotifyLink: "https://open.spotify.com/track/7KXjTSCq5nL1LoYtL7XAwS"
                },
                {
                    id: "54",
                    name: "King Kunta",
                    length: 3.54,
                    spotifyLink: "https://open.spotify.com/track/0N3W5peJUQtI4eyR6GJT5O"
                },
                {
                    id: "100",
                    name: "my boy only breaks his favourite toys",
                    length: 3.41,
                    spotifyLink: "https://open.spotify.com/track/7uGYWMwRy24dm7RUDDhUlD"
                }
            ]
        }
    });
});

test('should return error if not authed', async () => {
    const query = `
        query {
            likedSongs {
                id
                name
                length
                spotifyLink
            }
        }
    `;

    const result = await runGraphqlQuery(query, true);

    console.log(result);

    expect(result).toEqual({
        errors: expect.arrayContaining([
            expect.objectContaining({
                message: "Cannot read properties of null (reading 'id')",
                path: ["likedSongs"]
            })
        ]),
        data: {
            likedSongs: null
        }
    });
});

test('should return user with id 1', async () => {
    const query = `
        query {
            user(id: 1) {
                id
                email
                username
                role {
                    id
                    name
                }
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            user: {
                id: "1",
                email: "luca@admin.com",
                username: "imnofuxkingfun",
                role: {
                    id: "1",
                    name: "admin"
                }
            }
        }
    });
});

test('should return null to non-existent user', async () => {
    const query = `
        query {
            user(id: 0) {
                id
                email
                username
                role {
                    id
                    name
                }
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            user: null
        }
    });
});

test('should return artist songs with id 1', async () => {
    const query = `
        query {
            artistSongs(artistId: 1) {
                artist {
                    id
                    name
                    description
                }
                songs {
                    id
                    name
                    length
                    spotifyLink
                }
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            artistSongs: {
                artist: {
                    id: "1",
                    name: "Alex Botea",
                    description: "Romanian artist blending hip-hop and pop."
                },
                songs: [
                    {
                        id: "1",
                        name: "112 Arabii",
                        length: 3.45,
                        spotifyLink: "https://open.spotify.com/track/6ryYkPaIuqPcnlWwJrdMBN"
                    },
                    {
                        id: "2",
                        name: "Papusa Barbie",
                        length: 3.1,
                        spotifyLink: "https://open.spotify.com/track/5hlKmxQyK8TXVsuUBY0ZLo"
                    },
                    {
                        id: "22",
                        name: "SPAGHETTI",
                        length: 3.2,
                        spotifyLink: "https://open.spotify.com/track/6SiHINMCAPTGwojLqIP4ah"
                    },
                    {
                        id: "25",
                        name: "Retro Drive",
                        length: 3.7,
                        spotifyLink: "https://open.spotify.com/track/0X2G0m6hIXc0CohTLM92MJ"
                    }
                ]
            }
        }
    });
});

test('should return null for non-existent artist songs', async () => {
    const query = `
        query {
            artistSongs(artistId: 0) {
                artist {
                    id
                    name
                    description
                }
                songs {
                    id
                    name
                    length
                    spotifyLink
                }
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            artistSongs: null
        },
        errors: expect.arrayContaining([
            expect.objectContaining({
                message: "Artist not found"
            })
        ])
    });
});

test('should return all artists', async () => {
    const query = `
        query {
            artists {
                id
                name
                description
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            artists: [
                { id: "1", name: "Alex Botea", description: "Romanian artist blending hip-hop and pop." },
                { id: "2", name: "Young Thug", description: "Atlanta rapper and singer." },
                { id: "3", name: "Gunna", description: "Melodic trap artist from Atlanta." },
                { id: "4", name: "Playboi Carti", description: "Cloudy trap and avant vibes." },
                { id: "5", name: "TWRP", description: "Funk-fueled synthwave band." },
                { id: "6", name: "KMFDM", description: "Industrial pioneers." },
                { id: "7", name: "Ashnikko", description: "Alt-pop and hyperpop energy." },
                { id: "8", name: "LE SSERAFIM", description: "Bold K-pop group." },
                { id: "9", name: "Future", description: "Trap icon." },
                { id: "10", name: "Travis Scott", description: "Rapper and producer." },
                { id: "11", name: "Rosalía", description: "Flamenco-rooted pop innovator." },
                { id: "12", name: "Metro Boomin", description: "Producer architecting trap hits." },
                { id: "13", name: "Doja Cat", description: "Genre-bending rapper/singer." },
                { id: "14", name: "NewJeans", description: "Fresh K-pop collective." },
                { id: "15", name: "The Weeknd", description: "Alternative R&B trailblazer." },
                { id: "16", name: "Dan Avidan", description: "Vocalist featured with TWRP." },
                { id: "17", name: "Chappell Roan", description: "Genre-defying pop powerhouse." },
                { id: "18", name: "Lady Gaga", description: "Pop icon and innovator." },
                { id: "19", name: "Dave", description: "Grime and rap artist." },
                { id: "20", name: "The Smiths", description: "Iconic post-punk band." },
                { id: "21", name: "Morrissey", description: "The Smiths frontman." },
                { id: "22", name: "Johnny Marr", description: "The Smiths guitarist." },
                { id: "23", name: "Kendrick Lamar", description: "Grammy-winning rapper." },
                { id: "24", name: "J. Cole", description: "Conscious hip-hop artist." },
                { id: "25", name: "SZA", description: "Neo-soul and R&B singer." },
                { id: "26", name: "Tyler, The Creator", description: "Alternative hip-hop artist." },
                { id: "27", name: "Billie Eilish", description: "Alternative pop sensation." },
                { id: "28", name: "Ariana Grande", description: "Pop and R&B vocalist." },
                { id: "29", name: "Harry Styles", description: "Former One Direction member." },
                { id: "30", name: "Olivia Rodrigo", description: "Pop-rock songwriter." }
            ]
        }
    });
});
test('should return all blogs with associated data', async () => {
    const query = `
        query {
            blogs {
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

    expect(result.data.blogs).toHaveLength(30);

});

test('should return all genres', async () => {
    const query = `
        query {
            genres {
                id
                name
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            genres: [
                { id: "1", name: "Hip-Hop" },
                { id: "2", name: "Trap" },
                { id: "3", name: "Pop" },
                { id: "4", name: "K-Pop" },
                { id: "5", name: "Synthwave" },
                { id: "6", name: "Electro-Funk" },
                { id: "7", name: "Industrial" },
                { id: "8", name: "Alternative R&B" },
                { id: "9", name: "Hyperpop" },
                { id: "10", name: "Rock" },
                { id: "11", name: "Metal" },
                { id: "12", name: "Funk" },
                { id: "13", name: "Indie Pop" },
                { id: "14", name: "Alternative Rock" },
                { id: "15", name: "Brit-Pop" },
                { id: "16", name: "Electronic" },
                { id: "17", name: "Dance-Pop" },
                { id: "18", name: "Rap" },
                { id: "19", name: "Gospel" },
                { id: "20", name: "Soul" }
            ]
        }
    });
});

test('should return all roles', async () => {
    const query = `
        query {
            roles {
                id
                name
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            roles: [
                { id: "1", name: "admin" },
                { id: "2", name: "user" }
            ]
        }
    });
});
test('should return all songs', async () => {
    const query = `
        query {
            songs {
                id
                name
                length
                spotifyLink
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result.data.songs).toHaveLength(100);
    expect(result.data.songs[0]).toEqual(
        expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            length: expect.any(Number),
            spotifyLink: expect.any(String)
        })
    );
});

test('should return all users', async () => {
    const query = `
        query {
            users {
                id
                email
                username
                role {
                    id
                    name
                }
            }
        }
    `;

    const result = await runGraphqlQuery(query);

    expect(result).toEqual({
        data: {
            users: [
                { id: "1", email: "luca@admin.com", username: "imnofuxkingfun", role: { id: "1", name: "admin" } },
                { id: "2", email: "mihai@admin.com", username: "mihaidanaila", role: { id: "1", name: "admin" } },
                { id: "3", email: "dick.grayson@gotham.com", username: "dickgrayson", role: { id: "2", name: "user" } },
                { id: "4", email: "barbara.gordon@gcpd.com", username: "barbaragordon", role: { id: "2", name: "user" } },
                { id: "5", email: "jason.todd@outlaws.com", username: "jasontodd", role: { id: "2", name: "user" } },
                { id: "6", email: "tim.drake@wayne.com", username: "timdrake", role: { id: "2", name: "user" } },
                { id: "7", email: "damian.wayne@wayne.com", username: "damianwayne", role: { id: "2", name: "user" } },
                { id: "8", email: "harleen.quinzel@arkham.com", username: "harleyq", role: { id: "2", name: "user" } },
                { id: "9", email: "pamela.isley@botany.com", username: "poisonivy", role: { id: "2", name: "user" } },
                { id: "10", email: "edward.nygma@riddles.com", username: "theriddler", role: { id: "2", name: "user" } },
                { id: "11", email: "bruce.wayne@wayne.com", username: "brucewayne", role: { id: "2", name: "user" } },
                { id: "12", email: "selina.kyle@gotham.com", username: "selinakyle", role: { id: "2", name: "user" } },
                { id: "13", email: "joker@gotham.com", username: "thejoker", role: { id: "2", name: "user" } }
            ]
        }
    });
});


test('should return error', async () => {
    const query = `
        query {
            users {
                id
                email
                username
                role {
                    id
                    name
                }
            }
        }
    `;

    const result = await runGraphqlQuery(query, true);

    expect(result).toEqual({
        errors: expect.arrayContaining([
            expect.objectContaining({
                message: "Unauthorized"
            })
        ]),
        data: {
            users: null
        }
    });
});