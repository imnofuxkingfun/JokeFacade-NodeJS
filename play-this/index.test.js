async function runGraphqlQuery(query) {
    const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
                id: "1",
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
                        blog_id: "1",
                        text: "Fits rooftop runs too.",
                        date: "2024-02-01T00:00:00.000Z"
                    },
                    {
                        id: "2",
                        user: {
                            id: "3",
                            username: "dickgrayson"
                        },
                        blog_id: "1",
                        text: "This is the one for midnight drives.",
                        date: "2024-02-02T00:00:00.000Z"
                    }
                ]
            }
        }
    });
});