'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  async up (queryInterface, Sequelize) {
  const now = new Date();
  const passwordHash = await bcrypt.hash('User!100', 10);

  // clean up existing data
  await queryInterface.bulkDelete('user_liked_songs', null, {});
  await queryInterface.bulkDelete('comments', null, {});
  await queryInterface.bulkDelete('blogs', null, {});
  await queryInterface.bulkDelete('songArtists', null, {});
  await queryInterface.bulkDelete('songGenres', null, {});
  await queryInterface.bulkDelete('profiles', null, {});
  await queryInterface.bulkDelete('users', null, {});
  await queryInterface.bulkDelete('roles', null, {});
  await queryInterface.bulkDelete('artists', null, {});
  await queryInterface.bulkDelete('genres', null, {});
  await queryInterface.bulkDelete('songs', null, {});

  const roles = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'user' }
  ];

  const users = [
    { id: 1, email: 'luca@admin.com', username: 'imnofuxkingfun', password: passwordHash, role_id: 1 },
    { id: 2, email: 'mihai@admin.com', username: 'mihaidanaila', password: passwordHash, role_id: 1 },
    { id: 3, email: 'dick.grayson@gotham.com', username: 'dickgrayson', password: passwordHash, role_id: 2 },
    { id: 4, email: 'barbara.gordon@gcpd.com', username: 'barbaragordon', password: passwordHash, role_id: 2 },
    { id: 5, email: 'jason.todd@outlaws.com', username: 'jasontodd', password: passwordHash, role_id: 2 },
    { id: 6, email: 'tim.drake@wayne.com', username: 'timdrake', password: passwordHash, role_id: 2 },
    { id: 7, email: 'damian.wayne@wayne.com', username: 'damianwayne', password: passwordHash, role_id: 2 },
    { id: 8, email: 'harleen.quinzel@arkham.com', username: 'harleyq', password: passwordHash, role_id: 2 },
    { id: 9, email: 'pamela.isley@botany.com', username: 'poisonivy', password: passwordHash, role_id: 2 },
    { id: 10, email: 'edward.nygma@riddles.com', username: 'theriddler', password: passwordHash, role_id: 2 },
    { id: 11, email: 'bruce.wayne@wayne.com', username: 'brucewayne', password: passwordHash, role_id: 2 },
    { id: 12, email: 'selina.kyle@gotham.com', username: 'selinakyle', password: passwordHash, role_id: 2 },
    { id: 13, email: 'joker@gotham.com', username: 'thejoker', password: passwordHash, role_id: 2 }
  ];

  const profiles = [
    { id: 1, display_name: 'imnofuxkingfun', dob: '2000-05-15', bio: 'Music enthusiast.' },
    { id: 2, display_name: 'mihaidanaila', dob: '2001-08-20', bio: 'Sound explorer.' },
    { id: 3, display_name: 'dickgrayson', dob: '1992-06-27', bio: 'Acrobat turned vigilante.' },
    { id: 4, display_name: 'barbaragordon', dob: '1990-08-10', bio: 'Info broker and tech wizard.' },
    { id: 5, display_name: 'jasontodd', dob: '1991-07-16', bio: 'Outlaw with a code.' },
    { id: 6, display_name: 'timdrake', dob: '1993-11-11', bio: 'Detective prodigy.' },
    { id: 7, display_name: 'damianwayne', dob: '2006-05-04', bio: 'Heir to the cowl.' },
    { id: 8, display_name: 'harleyq', dob: '1987-04-01', bio: 'Agent of chaos.' },
    { id: 9, display_name: 'poisonivy', dob: '1986-09-23', bio: 'Plant whisperer.' },
    { id: 10, display_name: 'theriddler', dob: '1984-12-12', bio: 'Puzzle solver.' },
    { id: 11, display_name: 'brucewayne', dob: '1980-02-19', bio: 'Dark Knight.' },
    { id: 12, display_name: 'selinakyle', dob: '1985-03-14', bio: 'Cat burglar.' },
    { id: 13, display_name: 'thejoker', dob: '1975-04-01', bio: 'Chaos incarnate.' }
  ];

  const genres = [
    { id: 1, name: 'Hip-Hop', parent_genre_id: null },
    { id: 2, name: 'Trap', parent_genre_id: 1 },
    { id: 3, name: 'Pop', parent_genre_id: null },
    { id: 4, name: 'K-Pop', parent_genre_id: 3 },
    { id: 5, name: 'Synthwave', parent_genre_id: null },
    { id: 6, name: 'Electro-Funk', parent_genre_id: 5 },
    { id: 7, name: 'Industrial', parent_genre_id: null },
    { id: 8, name: 'Alternative R&B', parent_genre_id: null },
    { id: 9, name: 'Hyperpop', parent_genre_id: 3 },
    { id: 10, name: 'Rock', parent_genre_id: null },
    { id: 11, name: 'Metal', parent_genre_id: 10 },
    { id: 12, name: 'Funk', parent_genre_id: 5 },
    { id: 13, name: 'Indie Pop', parent_genre_id: 3 },
    { id: 14, name: 'Alternative Rock', parent_genre_id: 10 },
    { id: 15, name: 'Brit-Pop', parent_genre_id: 10 },
    { id: 16, name: 'Electronic', parent_genre_id: null },
    { id: 17, name: 'Dance-Pop', parent_genre_id: 3 },
    { id: 18, name: 'Rap', parent_genre_id: 1 },
    { id: 19, name: 'Gospel', parent_genre_id: null },
    { id: 20, name: 'Soul', parent_genre_id: null }
  ];

  const artists = [
    { id: 1, name: 'Alex Botea', description: 'Romanian artist blending hip-hop and pop.' },
    { id: 2, name: 'Young Thug', description: 'Atlanta rapper and singer.' },
    { id: 3, name: 'Gunna', description: 'Melodic trap artist from Atlanta.' },
    { id: 4, name: 'Playboi Carti', description: 'Cloudy trap and avant vibes.' },
    { id: 5, name: 'TWRP', description: 'Funk-fueled synthwave band.' },
    { id: 6, name: 'KMFDM', description: 'Industrial pioneers.' },
    { id: 7, name: 'Ashnikko', description: 'Alt-pop and hyperpop energy.' },
    { id: 8, name: 'LE SSERAFIM', description: 'Bold K-pop group.' },
    { id: 9, name: 'Future', description: 'Trap icon.' },
    { id: 10, name: 'Travis Scott', description: 'Rapper and producer.' },
    { id: 11, name: 'Rosalía', description: 'Flamenco-rooted pop innovator.' },
    { id: 12, name: 'Metro Boomin', description: 'Producer architecting trap hits.' },
    { id: 13, name: 'Doja Cat', description: 'Genre-bending rapper/singer.' },
    { id: 14, name: 'NewJeans', description: 'Fresh K-pop collective.' },
    { id: 15, name: 'The Weeknd', description: 'Alternative R&B trailblazer.' },
    { id: 16, name: 'Dan Avidan', description: 'Vocalist featured with TWRP.' },
    { id: 17, name: 'Chappell Roan', description: 'Genre-defying pop powerhouse.' },
    { id: 18, name: 'Lady Gaga', description: 'Pop icon and innovator.' },
    { id: 19, name: 'Dave', description: 'Grime and rap artist.' },
    { id: 20, name: 'The Smiths', description: 'Iconic post-punk band.' },
    { id: 21, name: 'Morrissey', description: 'The Smiths frontman.' },
    { id: 22, name: 'Johnny Marr', description: 'The Smiths guitarist.' },
    { id: 23, name: 'Kendrick Lamar', description: 'Grammy-winning rapper.' },
    { id: 24, name: 'J. Cole', description: 'Conscious hip-hop artist.' },
    { id: 25, name: 'SZA', description: 'Neo-soul and R&B singer.' },
    { id: 26, name: 'Tyler, The Creator', description: 'Alternative hip-hop artist.' },
    { id: 27, name: 'Billie Eilish', description: 'Alternative pop sensation.' },
    { id: 28, name: 'Ariana Grande', description: 'Pop and R&B vocalist.' },
    { id: 29, name: 'Harry Styles', description: 'Former One Direction member.' },
    { id: 30, name: 'Olivia Rodrigo', description: 'Pop-rock songwriter.' }
  ];

const songs = [
  { id: 1, name: '112 Arabii', length: 3.45, spotifyLink: 'https://open.spotify.com/track/6ryYkPaIuqPcnlWwJrdMBN' },
  { id: 2, name: 'Papusa Barbie', length: 3.10, spotifyLink: 'https://open.spotify.com/track/5hlKmxQyK8TXVsuUBY0ZLo' },
  { id: 3, name: 'Digits', length: 3.50, spotifyLink: 'https://open.spotify.com/track/4cg1yakyRSIOjxKM2I7J1q' },
  { id: 4, name: 'Hot', length: 3.30, spotifyLink: 'https://open.spotify.com/track/7F1lHcpnTycnimQrCxDFI5' },
  { id: 5, name: 'Ski', length: 3.20, spotifyLink: 'https://open.spotify.com/track/0lEjxUUlKqjqXrVlIHFduD' },
  { id: 6, name: 'Pushin P', length: 3.00, spotifyLink: 'https://open.spotify.com/track/2wkVnwWcT3DgxQU0oifynE' },
  { id: 7, name: 'Magnolia', length: 3.05, spotifyLink: 'https://open.spotify.com/track/1e1JKLEDKP7hEQzJfNAgPl' },
  { id: 8, name: 'FE!N', length: 3.10, spotifyLink: 'https://open.spotify.com/track/42VsgItocQwOQC3XWZ8JNA' },
  { id: 9, name: 'Starlight Brigade', length: 4.20, spotifyLink: 'https://open.spotify.com/track/2HVie6QZfnDS2HVQiGZwU6' },
  { id: 10, name: 'Atomic Karate', length: 3.40, spotifyLink: 'https://open.spotify.com/track/7hFVFal4HDbZXt8gm1Li0v' },
  { id: 11, name: 'Megalomaniac', length: 4.90, spotifyLink: 'https://open.spotify.com/track/1d3iQh4fTm5D6iRtgrZPZ9' },
  { id: 12, name: 'A Drug Against War', length: 3.80, spotifyLink: 'https://open.spotify.com/track/0jHmidMFTjOSkzuHrNepY7' },
  { id: 13, name: 'Daisy', length: 2.90, spotifyLink: 'https://open.spotify.com/track/0AUvWawuP0ibk4SQ3sIZjk' },
  { id: 14, name: 'Slumber Party', length: 3.00, spotifyLink: 'https://open.spotify.com/track/11ZulcYY4lowvcQm4oe3VJ' },
  { id: 15, name: 'ANTIFRAGILE', length: 3.00, spotifyLink: 'https://open.spotify.com/track/0bMoNdAnxNR0OuQbGDovrr' },
  { id: 16, name: 'Eve, Psyche & The Bluebeard\'s Wife', length: 3.10, spotifyLink: 'https://open.spotify.com/track/4QhnNyKDsAkXPwHkSnuc89' },
  { id: 17, name: 'Super Shy', length: 2.60, spotifyLink: 'https://open.spotify.com/track/5sdQOyqq2IDhvmx2lHOpwd' },
  { id: 18, name: 'Blinding Lights', length: 3.20, spotifyLink: 'https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b' },
  { id: 19, name: 'Creepin\'', length: 3.50, spotifyLink: 'https://open.spotify.com/track/3gJqRkk7RprRf7g3ge3y1R' },
  { id: 20, name: 'Relationship', length: 3.40, spotifyLink: 'https://open.spotify.com/track/08lHFwOBB8FnLwzuGwYMEh' },
  { id: 21, name: 'Chrome Hearts', length: 3.00, spotifyLink: 'https://open.spotify.com/track/66mgjLeTSbdWU2z563zprC' },
  { id: 22, name: 'SPAGHETTI', length: 3.20, spotifyLink: 'https://open.spotify.com/track/6SiHINMCAPTGwojLqIP4ah' },
  { id: 23, name: 'Digital Love Letter', length: 3.30, spotifyLink: 'https://open.spotify.com/track/63jmYwULsFawHmn862yuVO' },
  { id: 24, name: 'Voltage', length: 3.60, spotifyLink: 'https://open.spotify.com/track/0fmoYqeibj3Dm4w9jMayJU' },
  { id: 25, name: 'Retro Drive', length: 3.70, spotifyLink: 'https://open.spotify.com/track/0X2G0m6hIXc0CohTLM92MJ' },
  { id: 26, name: 'Red Wine Supernova', length: 3.42, spotifyLink: 'https://open.spotify.com/track/7FOgcfdz9Nx5V9lCNXdBYv' },
  { id: 27, name: 'Femininomenon', length: 3.28, spotifyLink: 'https://open.spotify.com/track/53IRnAWx13PYmoVYtemUBS' },
  { id: 28, name: 'My Kink Is Karma', length: 3.15, spotifyLink: 'https://open.spotify.com/track/32fSZSbxeVoiZShMQKLc6Z' },
  { id: 29, name: 'Pink Pony Club', length: 3.05, spotifyLink: 'https://open.spotify.com/track/1k2pQc5i348DCHwbn5KTdc' },
  { id: 30, name: 'Bad Habit', length: 3.10, spotifyLink: 'https://open.spotify.com/track/1KAObz8ZfyuMj4YTxHIrfA' },
  { id: 31, name: 'Poker Face', length: 3.56, spotifyLink: 'https://open.spotify.com/track/1QV6tiMFM6fSOKOGLMHYYg' },
  { id: 32, name: 'Bad Romance', length: 5.04, spotifyLink: 'https://open.spotify.com/track/0SiywuOBRcynK0uKGWdCnn' },
  { id: 33, name: 'Born This Way', length: 4.21, spotifyLink: 'https://open.spotify.com/track/30XU4suKzCeoCK9YFzdufg' },
  { id: 34, name: 'Shallow', length: 3.38, spotifyLink: 'https://open.spotify.com/track/2VxeLyX666F8uXCJ0dZF8B' },
  { id: 35, name: 'Paparazzi', length: 3.32, spotifyLink: 'https://open.spotify.com/track/02XnQdf7sipaKBBHixz3Zp' },
  { id: 36, name: 'Interstellar', length: 3.58, spotifyLink: 'https://open.spotify.com/track/5F3qrwxuHSz88vXBGh3tNy' },
  { id: 37, name: 'Titanium', length: 3.59, spotifyLink: 'https://open.spotify.com/track/4lwavw59UjXUPJZtKNdFYp' },
  { id: 38, name: 'Samson', length: 3.45, spotifyLink: 'https://open.spotify.com/track/7psR7A4EYQPnplNPQmSKYB' },
  { id: 39, name: 'Backhand', length: 3.22, spotifyLink: 'https://open.spotify.com/track/6v5DCgJKetMFbhYsNHtP7D' },
  { id: 40, name: 'Verdansk', length: 4.15, spotifyLink: 'https://open.spotify.com/track/3AEOrh7zWjV2rVS1yOd41q' },
  { id: 41, name: 'How Much a Heart Can Hold', length: 3.52, spotifyLink: 'https://open.spotify.com/track/2vmoQHWfaBL1Q5FUlUhSUH' },
  { id: 42, name: 'There Is No Company', length: 4.08, spotifyLink: 'https://open.spotify.com/track/4Z7dnLxP5LP3ssTDdIZAIC' },
  { id: 43, name: 'Black Metal Parking Lot', length: 3.28, spotifyLink: 'https://open.spotify.com/track/0q9loMHMdjPrOhHClKtZF3' },
  { id: 44, name: 'This Is What You Look Like Now', length: 3.14, spotifyLink: 'https://open.spotify.com/track/2HBBM75Xv3o2Mqdyh1NcM0' },
  { id: 45, name: 'Houdini', length: 3.34, spotifyLink: 'https://open.spotify.com/track/67zYwIXFgaYy9VSjnK4BXg' },
  { id: 46, name: 'There Is a Light That Never Goes Out', length: 4.26, spotifyLink: 'https://open.spotify.com/track/4ovOJsYJX26DXjqWu1HhWR' },
  { id: 47, name: 'How Soon Is Now?', length: 4.28, spotifyLink: 'https://open.spotify.com/track/0Nmu7zxpMYNJ3N9YDY6VEN' },
  { id: 48, name: 'This Charming Man', length: 3.46, spotifyLink: 'https://open.spotify.com/track/1FvDJ9KGxcqwv1utyPL3JZ' },
  { id: 49, name: 'Bigmouth Strikes Again', length: 3.19, spotifyLink: 'https://open.spotify.com/track/1JXpzsOgH0lA3JU7wyRzwJ' },
  { id: 50, name: 'The Boy With The Thorn In His Side', length: 3.21, spotifyLink: 'https://open.spotify.com/track/7h2ErP3kwgbLbFsBHWLkS0' },
  { id: 51, name: 'HUMBLE.', length: 3.54, spotifyLink: 'https://open.spotify.com/track/7KXjTSCq5nL1LoYtL7XAwS' },
  { id: 52, name: 'DNA.', length: 3.02, spotifyLink: 'https://open.spotify.com/track/6HZILIRieu8S0iqY8kIKhj' },
  { id: 53, name: 'The Blacker The Berry', length: 3.61, spotifyLink: 'https://open.spotify.com/track/5Mtt6tZSZA9cXTHGSGpyh0' },
  { id: 54, name: 'King Kunta', length: 3.54, spotifyLink: 'https://open.spotify.com/track/0N3W5peJUQtI4eyR6GJT5O' },
  { id: 55, name: 'No Role Modelz', length: 3.13, spotifyLink: 'https://open.spotify.com/track/68Dni7IE4VyPkTOH9mRWHr' },
  { id: 56, name: 'Neighbors', length: 3.38, spotifyLink: 'https://open.spotify.com/track/0utlOiJy2weVl9WTkcEWHy' },
  { id: 57, name: 'Power Trip', length: 3.33, spotifyLink: 'https://open.spotify.com/track/2uwnP6tZVVmTovzX5ELooy' },
  { id: 58, name: 'The Story', length: 3.26, spotifyLink: 'https://open.spotify.com/track/70Za7zDqvVPouhqoxgVlo6' },
  { id: 59, name: 'Drew Barrymore', length: 3.33, spotifyLink: 'https://open.spotify.com/track/06u5LrUpbosQlQ1QJFhPpG' },
  { id: 60, name: 'Olean', length: 3.14, spotifyLink: 'https://open.spotify.com/track/1bjeWoagtHmUKputLVyDxQ' },
  { id: 61, name: 'Garden (Say It Like Dat)', length: 3.38, spotifyLink: 'https://open.spotify.com/track/19woxaSpjOefa2JnAOoqW5' },
  { id: 62, name: 'SOS', length: 3.51, spotifyLink: 'https://open.spotify.com/track/5xMw6qCcpd2gBXPGTegC4W' },
  { id: 63, name: 'The Weekend', length: 3.29, spotifyLink: 'https://open.spotify.com/track/4PhsKqMdgMEUSstTDAmMpg' },
  { id: 64, name: 'Good Days', length: 3.51, spotifyLink: 'https://open.spotify.com/track/4PMqSO5qyjpvzhlLI5GnID' },
  { id: 65, name: 'Blind', length: 3.43, spotifyLink: 'https://open.spotify.com/track/1pr9TZGOXeJUggIal1Wq3R' },
  { id: 66, name: 'Liquid Swords', length: 4.30, spotifyLink: 'https://open.spotify.com/track/5hVghJ4KaYES3BFUATCYn0' },
  { id: 67, name: 'Cherry Bomb', length: 3.04, spotifyLink: 'https://open.spotify.com/track/1sJZgGyZJookIoyLi9jDOV' },
  { id: 68, name: 'LUMBERJACK', length: 3.37, spotifyLink: 'https://open.spotify.com/track/0BiK5BbYNFLb88CCOxBFJe' },
  { id: 69, name: 'Earfquake', length: 3.18, spotifyLink: 'https://open.spotify.com/track/1nXZnTALNXiPlvXotqHm66' },
  { id: 70, name: 'A Boy Is A Gun*', length: 3.16, spotifyLink: 'https://open.spotify.com/track/4RVwu0g32PAqgUiJoXsdF8' },
  { id: 71, name: 'Happier Than Ever', length: 4.03, spotifyLink: 'https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m' },
  { id: 72, name: 'Bad Guy', length: 3.14, spotifyLink: 'https://open.spotify.com/track/43zdsphuZLzwA9k4DJhU0I' },
  { id: 73, name: 'When We All Fall Asleep, Where Do We Go?', length: 3.30, spotifyLink: 'https://open.spotify.com/track/4SSnFejRGlZikf02HLewEF' },
  { id: 74, name: 'Bury a Friend', length: 3.13, spotifyLink: 'https://open.spotify.com/track/73SpzrcaHk0RQPFP73vqVR' },
  { id: 75, name: 'No Time to Die', length: 3.18, spotifyLink: 'https://open.spotify.com/track/3e9HZxeyfWwjeyPAMmWSSQ' },
  { id: 76, name: 'thank u, next', length: 3.28, spotifyLink: 'https://open.spotify.com/track/6ocbgoVGwYJhOv1GgI9NsF' },
  { id: 77, name: '7 rings', length: 2.53, spotifyLink: 'https://open.spotify.com/track/5OCJzvD7sykQEKHH7qAC3C' },
  { id: 78, name: 'God is a Woman', length: 4.35, spotifyLink: 'https://open.spotify.com/track/1TEL6MlSSVLSdhOSddidlJ' },
  { id: 79, name: 'Needy', length: 3.22, spotifyLink: 'https://open.spotify.com/track/3jjujdWJ72nww5eGnfs2E7' },
  { id: 80, name: 'Adore You', length: 3.32, spotifyLink: 'https://open.spotify.com/track/5Ohxk2dO5COHF1krpoPigN' },
  { id: 81, name: 'Sign of the Times', length: 5.33, spotifyLink: 'https://open.spotify.com/track/6UelLqGlWMcVH1E5c4H7lY' },
  { id: 82, name: 'Watermelon Sugar', length: 2.52, spotifyLink: 'https://open.spotify.com/track/4Dvkj6JhhA12EX05fT7y2e' },
  { id: 83, name: 'As It Was', length: 2.51, spotifyLink: 'https://open.spotify.com/track/5LYMamLv12UPbemOaTPyeV' },
  { id: 84, name: 'Music for a Sushi Restaurant', length: 2.05, spotifyLink: 'https://open.spotify.com/track/5wANPM4fQCJwkGd4rN57mH' },
  { id: 85, name: 'drivers license', length: 3.52, spotifyLink: 'https://open.spotify.com/track/6HU7h9RYOaPRFeh0R3UeAr' },
  { id: 86, name: 'deja vu', length: 3.51, spotifyLink: 'https://open.spotify.com/track/4ZtFanR9U6ndgddUvNcjcG' },
  { id: 87, name: 'good 4 u', length: 3.38, spotifyLink: 'https://open.spotify.com/track/5CZ40GBx1sQ9agT82CLQCT' },
  { id: 88, name: 'traitor', length: 3.40, spotifyLink: 'https://open.spotify.com/track/1zejeOnykpCoyVSit6Bwp3' },
  { id: 89, name: 'hope ur ok', length: 3.27, spotifyLink: 'https://open.spotify.com/track/1kuGVB7EU95pJObxwvfwKS' },
  { id: 90, name: 'vampire', length: 3.11, spotifyLink: 'https://open.spotify.com/track/53dtP2iUMvaF28JZcHnFuU' },
  { id: 91, name: 'logical', length: 3.38, spotifyLink: 'https://open.spotify.com/track/3IX0yuEVvDbnqUwMBB3ouC' },
  { id: 92, name: 'bad idea right?', length: 3.18, spotifyLink: 'https://open.spotify.com/track/3Nl5OkkmS5DaBZvuYofpAt' },
  { id: 93, name: 'the grudge', length: 3.20, spotifyLink: 'https://open.spotify.com/track/34sOdxWu9FljH84UXdRwu1' },
  { id: 94, name: 'all-american bitch', length: 3.14, spotifyLink: 'https://open.spotify.com/track/2gyxAWHebV7xPYVxqoi86f' },
  { id: 95, name: 'get him back!', length: 3.34, spotifyLink: 'https://open.spotify.com/track/26QLJMK8G0M06sk7h7Fkse' },
  { id: 96, name: 'love is embarrassing', length: 3.05, spotifyLink: 'https://open.spotify.com/track/5CscrLqFBgPfZR8fGtikov' },
  { id: 97, name: 'making the bed', length: 3.45, spotifyLink: 'https://open.spotify.com/track/6QT6j7rKt7Vk3IuV2AUO9W' },
  { id: 98, name: 'lacy', length: 3.20, spotifyLink: 'https://open.spotify.com/track/6W9l02gRsXVxzIuQC1oc1X' },
  { id: 99, name: 'pretty isn\'t pretty', length: 3.34, spotifyLink: 'https://open.spotify.com/track/7uGYWMwRy24dm7RUDDhUlD' },
  { id: 100, name: 'my boy only breaks his favourite toys', length: 3.41, spotifyLink: 'https://open.spotify.com/track/7uGYWMwRy24dm7RUDDhUlD' }
];


  const songArtists = [
    // Alex Botea songs (1-2)
    { song_id: 1, artist_id: 1, createdAt: now, updatedAt: now },
    { song_id: 2, artist_id: 1, createdAt: now, updatedAt: now },
    { song_id: 2, artist_id: 7, createdAt: now, updatedAt: now },
    { song_id: 22, artist_id: 1, createdAt: now, updatedAt: now },
    { song_id: 22, artist_id: 8, createdAt: now, updatedAt: now },
    { song_id: 25, artist_id: 1, createdAt: now, updatedAt: now },
    
    // Young Thug songs (3-5, 20, 30)
    { song_id: 3, artist_id: 2, createdAt: now, updatedAt: now },
    { song_id: 4, artist_id: 2, createdAt: now, updatedAt: now },
    { song_id: 4, artist_id: 3, createdAt: now, updatedAt: now },
    { song_id: 5, artist_id: 2, createdAt: now, updatedAt: now },
    { song_id: 5, artist_id: 3, createdAt: now, updatedAt: now },
    { song_id: 20, artist_id: 9, createdAt: now, updatedAt: now },
    { song_id: 20, artist_id: 2, createdAt: now, updatedAt: now },
    { song_id: 30, artist_id: 2, createdAt: now, updatedAt: now },
    
    // Gunna songs (6)
    { song_id: 6, artist_id: 3, createdAt: now, updatedAt: now },
    { song_id: 6, artist_id: 9, createdAt: now, updatedAt: now },
    
    // Playboi Carti songs (7-8, 21)
    { song_id: 7, artist_id: 4, createdAt: now, updatedAt: now },
    { song_id: 8, artist_id: 10, createdAt: now, updatedAt: now },
    { song_id: 8, artist_id: 4, createdAt: now, updatedAt: now },
    { song_id: 21, artist_id: 4, createdAt: now, updatedAt: now },
    { song_id: 21, artist_id: 2, createdAt: now, updatedAt: now },
    
    // TWRP songs (9-10)
    { song_id: 9, artist_id: 5, createdAt: now, updatedAt: now },
    { song_id: 9, artist_id: 16, createdAt: now, updatedAt: now },
    { song_id: 10, artist_id: 5, createdAt: now, updatedAt: now },
    
    // KMFDM songs (11-12)
    { song_id: 11, artist_id: 6, createdAt: now, updatedAt: now },
    { song_id: 12, artist_id: 6, createdAt: now, updatedAt: now },
    
    // Ashnikko songs (13-14, 23)
    { song_id: 13, artist_id: 7, createdAt: now, updatedAt: now },
    { song_id: 14, artist_id: 7, createdAt: now, updatedAt: now },
    { song_id: 14, artist_id: 13, createdAt: now, updatedAt: now },
    { song_id: 23, artist_id: 7, createdAt: now, updatedAt: now },
    { song_id: 23, artist_id: 15, createdAt: now, updatedAt: now },
    
    // LE SSERAFIM songs (15-16)
    { song_id: 15, artist_id: 8, createdAt: now, updatedAt: now },
    { song_id: 16, artist_id: 8, createdAt: now, updatedAt: now },
    
    // NewJeans (17)
    { song_id: 17, artist_id: 14, createdAt: now, updatedAt: now },
    
    // The Weeknd songs (18-19)
    { song_id: 18, artist_id: 15, createdAt: now, updatedAt: now },
    { song_id: 19, artist_id: 12, createdAt: now, updatedAt: now },
    { song_id: 19, artist_id: 15, createdAt: now, updatedAt: now },
    { song_id: 19, artist_id: 9, createdAt: now, updatedAt: now },
    
    // Metro Boomin (24)
    { song_id: 24, artist_id: 6, createdAt: now, updatedAt: now },
    { song_id: 24, artist_id: 5, createdAt: now, updatedAt: now },
    
    // Chappell Roan songs (26-30)
    { song_id: 26, artist_id: 17, createdAt: now, updatedAt: now },
    { song_id: 27, artist_id: 17, createdAt: now, updatedAt: now },
    { song_id: 28, artist_id: 17, createdAt: now, updatedAt: now },
    { song_id: 29, artist_id: 17, createdAt: now, updatedAt: now },
    { song_id: 30, artist_id: 17, createdAt: now, updatedAt: now },
    
    // Lady Gaga songs (31-37)
    { song_id: 31, artist_id: 18, createdAt: now, updatedAt: now },
    { song_id: 32, artist_id: 18, createdAt: now, updatedAt: now },
    { song_id: 33, artist_id: 18, createdAt: now, updatedAt: now },
    { song_id: 34, artist_id: 18, createdAt: now, updatedAt: now },
    { song_id: 35, artist_id: 18, createdAt: now, updatedAt: now },
    { song_id: 36, artist_id: 18, createdAt: now, updatedAt: now },
    { song_id: 37, artist_id: 18, createdAt: now, updatedAt: now },
    
    // Dave songs (38-44)
    { song_id: 38, artist_id: 19, createdAt: now, updatedAt: now },
    { song_id: 39, artist_id: 19, createdAt: now, updatedAt: now },
    { song_id: 40, artist_id: 19, createdAt: now, updatedAt: now },
    { song_id: 41, artist_id: 19, createdAt: now, updatedAt: now },
    { song_id: 42, artist_id: 19, createdAt: now, updatedAt: now },
    { song_id: 43, artist_id: 19, createdAt: now, updatedAt: now },
    { song_id: 44, artist_id: 19, createdAt: now, updatedAt: now },
    
    // The Smiths songs (46-50)
    { song_id: 46, artist_id: 20, createdAt: now, updatedAt: now },
    { song_id: 46, artist_id: 21, createdAt: now, updatedAt: now },
    { song_id: 47, artist_id: 20, createdAt: now, updatedAt: now },
    { song_id: 48, artist_id: 20, createdAt: now, updatedAt: now },
    { song_id: 49, artist_id: 20, createdAt: now, updatedAt: now },
    { song_id: 50, artist_id: 20, createdAt: now, updatedAt: now },
    
    // Kendrick Lamar songs (51-54)
    { song_id: 51, artist_id: 23, createdAt: now, updatedAt: now },
    { song_id: 52, artist_id: 23, createdAt: now, updatedAt: now },
    { song_id: 53, artist_id: 23, createdAt: now, updatedAt: now },
    { song_id: 54, artist_id: 23, createdAt: now, updatedAt: now },
    
    // J. Cole songs (55-57)
    { song_id: 55, artist_id: 24, createdAt: now, updatedAt: now },
    { song_id: 56, artist_id: 24, createdAt: now, updatedAt: now },
    { song_id: 57, artist_id: 24, createdAt: now, updatedAt: now },
    
    // SZA songs (58-62)
    { song_id: 58, artist_id: 25, createdAt: now, updatedAt: now },
    { song_id: 59, artist_id: 25, createdAt: now, updatedAt: now },
    { song_id: 60, artist_id: 25, createdAt: now, updatedAt: now },
    { song_id: 62, artist_id: 25, createdAt: now, updatedAt: now },
    { song_id: 64, artist_id: 25, createdAt: now, updatedAt: now },
    
    // Tyler, The Creator songs (66-70)
    { song_id: 66, artist_id: 26, createdAt: now, updatedAt: now },
    { song_id: 67, artist_id: 26, createdAt: now, updatedAt: now },
    { song_id: 68, artist_id: 26, createdAt: now, updatedAt: now },
    { song_id: 69, artist_id: 26, createdAt: now, updatedAt: now },
    { song_id: 70, artist_id: 26, createdAt: now, updatedAt: now },
    
    // Billie Eilish songs (71-75)
    { song_id: 71, artist_id: 27, createdAt: now, updatedAt: now },
    { song_id: 72, artist_id: 27, createdAt: now, updatedAt: now },
    { song_id: 73, artist_id: 27, createdAt: now, updatedAt: now },
    { song_id: 74, artist_id: 27, createdAt: now, updatedAt: now },
    { song_id: 75, artist_id: 27, createdAt: now, updatedAt: now },
    
    // Ariana Grande songs (76-79)
    { song_id: 76, artist_id: 28, createdAt: now, updatedAt: now },
    { song_id: 77, artist_id: 28, createdAt: now, updatedAt: now },
    { song_id: 78, artist_id: 28, createdAt: now, updatedAt: now },
    { song_id: 79, artist_id: 28, createdAt: now, updatedAt: now },
    
    // Harry Styles songs (80-84)
    { song_id: 80, artist_id: 29, createdAt: now, updatedAt: now },
    { song_id: 81, artist_id: 29, createdAt: now, updatedAt: now },
    { song_id: 82, artist_id: 29, createdAt: now, updatedAt: now },
    { song_id: 83, artist_id: 29, createdAt: now, updatedAt: now },
    { song_id: 84, artist_id: 29, createdAt: now, updatedAt: now },
    
    // Olivia Rodrigo songs (85-100)
    { song_id: 85, artist_id: 30, createdAt: now, updatedAt: now },
    { song_id: 86, artist_id: 30, createdAt: now, updatedAt: now },
    { song_id: 87, artist_id: 30, createdAt: now, updatedAt: now },
    { song_id: 88, artist_id: 30, createdAt: now, updatedAt: now },
    { song_id: 89, artist_id: 30, createdAt: now, updatedAt: now },
    { song_id: 90, artist_id: 30, createdAt: now, updatedAt: now },
    { song_id: 91, artist_id: 30, createdAt: now, updatedAt: now },
    { song_id: 92, artist_id: 30, createdAt: now, updatedAt: now },
    { song_id: 93, artist_id: 30, createdAt: now, updatedAt: now },
    { song_id: 94, artist_id: 30, createdAt: now, updatedAt: now },
    { song_id: 95, artist_id: 30, createdAt: now, updatedAt: now },
    { song_id: 96, artist_id: 30, createdAt: now, updatedAt: now },
    { song_id: 97, artist_id: 30, createdAt: now, updatedAt: now },
    { song_id: 98, artist_id: 30, createdAt: now, updatedAt: now },
    { song_id: 99, artist_id: 30, createdAt: now, updatedAt: now },
    { song_id: 100, artist_id: 30, createdAt: now, updatedAt: now }
  ];

  const songGenres = [
    // Hip-Hop/Trap distribution
    { song_id: 1, genre_id: 2, createdAt: now, updatedAt: now },
    { song_id: 1, genre_id: 1, createdAt: now, updatedAt: now },
    { song_id: 2, genre_id: 2, createdAt: now, updatedAt: now },
    { song_id: 2, genre_id: 9, createdAt: now, updatedAt: now },
    { song_id: 3, genre_id: 2, createdAt: now, updatedAt: now },
    { song_id: 4, genre_id: 2, createdAt: now, updatedAt: now },
    { song_id: 5, genre_id: 2, createdAt: now, updatedAt: now },
    { song_id: 6, genre_id: 2, createdAt: now, updatedAt: now },
    { song_id: 7, genre_id: 2, createdAt: now, updatedAt: now },
    { song_id: 8, genre_id: 2, createdAt: now, updatedAt: now },
    { song_id: 20, genre_id: 2, createdAt: now, updatedAt: now },
    { song_id: 21, genre_id: 2, createdAt: now, updatedAt: now },
    { song_id: 30, genre_id: 2, createdAt: now, updatedAt: now },
    { song_id: 39, genre_id: 2, createdAt: now, updatedAt: now },
    { song_id: 40, genre_id: 1, createdAt: now, updatedAt: now },
    
    // Synthwave/Electro-Funk
    { song_id: 9, genre_id: 5, createdAt: now, updatedAt: now },
    { song_id: 9, genre_id: 6, createdAt: now, updatedAt: now },
    { song_id: 10, genre_id: 5, createdAt: now, updatedAt: now },
    { song_id: 10, genre_id: 12, createdAt: now, updatedAt: now },
    { song_id: 18, genre_id: 5, createdAt: now, updatedAt: now },
    { song_id: 18, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 24, genre_id: 5, createdAt: now, updatedAt: now },
    { song_id: 24, genre_id: 6, createdAt: now, updatedAt: now },
    { song_id: 25, genre_id: 5, createdAt: now, updatedAt: now },
    { song_id: 25, genre_id: 1, createdAt: now, updatedAt: now },
    
    // Industrial
    { song_id: 11, genre_id: 7, createdAt: now, updatedAt: now },
    { song_id: 12, genre_id: 7, createdAt: now, updatedAt: now },
    { song_id: 12, genre_id: 11, createdAt: now, updatedAt: now },
    { song_id: 24, genre_id: 7, createdAt: now, updatedAt: now },
    
    // Alternative R&B
    { song_id: 19, genre_id: 8, createdAt: now, updatedAt: now },
    { song_id: 19, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 23, genre_id: 8, createdAt: now, updatedAt: now },
    { song_id: 58, genre_id: 8, createdAt: now, updatedAt: now },
    { song_id: 62, genre_id: 8, createdAt: now, updatedAt: now },
    { song_id: 64, genre_id: 8, createdAt: now, updatedAt: now },
    
    // Hyperpop
    { song_id: 13, genre_id: 9, createdAt: now, updatedAt: now },
    { song_id: 14, genre_id: 9, createdAt: now, updatedAt: now },
    { song_id: 23, genre_id: 9, createdAt: now, updatedAt: now },
    { song_id: 27, genre_id: 9, createdAt: now, updatedAt: now },
    { song_id: 28, genre_id: 9, createdAt: now, updatedAt: now },
    
    // K-Pop
    { song_id: 15, genre_id: 4, createdAt: now, updatedAt: now },
    { song_id: 15, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 16, genre_id: 4, createdAt: now, updatedAt: now },
    { song_id: 17, genre_id: 4, createdAt: now, updatedAt: now },
    { song_id: 17, genre_id: 3, createdAt: now, updatedAt: now },
    
    // Pop / Dance-Pop
    { song_id: 26, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 26, genre_id: 17, createdAt: now, updatedAt: now },
    { song_id: 27, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 28, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 29, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 30, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 31, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 31, genre_id: 17, createdAt: now, updatedAt: now },
    { song_id: 32, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 33, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 34, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 35, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 36, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 37, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 76, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 76, genre_id: 20, createdAt: now, updatedAt: now },
    { song_id: 77, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 78, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 79, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 80, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 80, genre_id: 13, createdAt: now, updatedAt: now },
    { song_id: 81, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 82, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 83, genre_id: 3, createdAt: now, updatedAt: now },
    { song_id: 84, genre_id: 3, createdAt: now, updatedAt: now },
    
    // Grime/Rap (Dave)
    { song_id: 38, genre_id: 18, createdAt: now, updatedAt: now },
    { song_id: 41, genre_id: 18, createdAt: now, updatedAt: now },
    { song_id: 42, genre_id: 18, createdAt: now, updatedAt: now },
    { song_id: 43, genre_id: 18, createdAt: now, updatedAt: now },
    { song_id: 44, genre_id: 18, createdAt: now, updatedAt: now },
    
    // Brit-Pop/Rock (The Smiths)
    { song_id: 46, genre_id: 15, createdAt: now, updatedAt: now },
    { song_id: 46, genre_id: 14, createdAt: now, updatedAt: now },
    { song_id: 47, genre_id: 15, createdAt: now, updatedAt: now },
    { song_id: 48, genre_id: 15, createdAt: now, updatedAt: now },
    { song_id: 49, genre_id: 15, createdAt: now, updatedAt: now },
    { song_id: 50, genre_id: 15, createdAt: now, updatedAt: now },
    
    // Hip-Hop/Rap (Kendrick, J. Cole)
    { song_id: 51, genre_id: 1, createdAt: now, updatedAt: now },
    { song_id: 51, genre_id: 18, createdAt: now, updatedAt: now },
    { song_id: 52, genre_id: 1, createdAt: now, updatedAt: now },
    { song_id: 53, genre_id: 1, createdAt: now, updatedAt: now },
    { song_id: 54, genre_id: 1, createdAt: now, updatedAt: now },
    { song_id: 55, genre_id: 1, createdAt: now, updatedAt: now },
    { song_id: 56, genre_id: 1, createdAt: now, updatedAt: now },
    { song_id: 57, genre_id: 1, createdAt: now, updatedAt: now },
    
    // Alternative Rock (Tyler)
    { song_id: 66, genre_id: 14, createdAt: now, updatedAt: now },
    { song_id: 67, genre_id: 1, createdAt: now, updatedAt: now },
    { song_id: 68, genre_id: 1, createdAt: now, updatedAt: now },
    { song_id: 69, genre_id: 1, createdAt: now, updatedAt: now },
    { song_id: 70, genre_id: 1, createdAt: now, updatedAt: now },
    
    // Alternative Pop/Rock (Billie Eilish)
    { song_id: 71, genre_id: 13, createdAt: now, updatedAt: now },
    { song_id: 72, genre_id: 13, createdAt: now, updatedAt: now },
    { song_id: 73, genre_id: 13, createdAt: now, updatedAt: now },
    { song_id: 74, genre_id: 13, createdAt: now, updatedAt: now },
    { song_id: 75, genre_id: 13, createdAt: now, updatedAt: now },
    
    // Indie Pop/Alternative (Olivia Rodrigo)
    { song_id: 85, genre_id: 13, createdAt: now, updatedAt: now },
    { song_id: 86, genre_id: 13, createdAt: now, updatedAt: now },
    { song_id: 87, genre_id: 13, createdAt: now, updatedAt: now },
    { song_id: 88, genre_id: 13, createdAt: now, updatedAt: now },
    { song_id: 89, genre_id: 13, createdAt: now, updatedAt: now },
    { song_id: 90, genre_id: 13, createdAt: now, updatedAt: now },
    { song_id: 91, genre_id: 13, createdAt: now, updatedAt: now },
    { song_id: 92, genre_id: 13, createdAt: now, updatedAt: now },
    { song_id: 93, genre_id: 14, createdAt: now, updatedAt: now },
    { song_id: 94, genre_id: 13, createdAt: now, updatedAt: now },
    { song_id: 95, genre_id: 14, createdAt: now, updatedAt: now },
    { song_id: 96, genre_id: 13, createdAt: now, updatedAt: now },
    { song_id: 97, genre_id: 13, createdAt: now, updatedAt: now },
    { song_id: 98, genre_id: 13, createdAt: now, updatedAt: now },
    { song_id: 99, genre_id: 13, createdAt: now, updatedAt: now },
    { song_id: 100, genre_id: 13, createdAt: now, updatedAt: now }
  ];

  const blogs = [
    { id: 1, user_id: 1, song_id: 18, text: 'Blinding Lights is a masterpiece. Perfect for late night drives.', date: new Date('2024-01-03'), review: 9 },
    { id: 2, user_id: 2, song_id: 14, text: 'Slumber Party by Ashnikko stays on repeat.', date: new Date('2024-01-05'), review: 8 },
    { id: 3, user_id: 3, song_id: 8, text: 'Playboi Carti feature on FE!N goes crazy.', date: new Date('2024-01-08'), review: 9 },
    { id: 4, user_id: 4, song_id: 9, text: 'Starlight Brigade is pure hero anthem material.', date: new Date('2024-01-10'), review: 10 },
    { id: 5, user_id: 5, song_id: 6, text: 'Pushin P is absolute gym fuel.', date: new Date('2024-01-12'), review: 8 },
    { id: 6, user_id: 6, song_id: 15, text: 'ANTIFRAGILE choreography on infinite loop.', date: new Date('2024-01-14'), review: 9 },
    { id: 7, user_id: 7, song_id: 5, text: 'Ski hits different when you need energy.', date: new Date('2024-01-16'), review: 7 },
    { id: 8, user_id: 8, song_id: 13, text: 'Daisy energy is chaotic good vibes.', date: new Date('2024-01-18'), review: 8 },
    { id: 9, user_id: 9, song_id: 25, text: 'Retro Drive is perfect background soundtrack.', date: new Date('2024-01-20'), review: 8 },
    { id: 10, user_id: 10, song_id: 11, text: 'Megalomaniac is industrial perfection.', date: new Date('2024-01-22'), review: 9 },
    { id: 11, user_id: 1, song_id: 46, text: 'There Is No Company by The Smiths never gets old.', date: new Date('2024-01-24'), review: 10 },
    { id: 12, user_id: 2, song_id: 51, text: 'HUMBLE by Kendrick is bars on bars on bars.', date: new Date('2024-01-26'), review: 9 },
    { id: 13, user_id: 3, song_id: 72, text: 'Bad Guy by Billie Eilish is iconic.', date: new Date('2024-01-28'), review: 8 },
    { id: 14, user_id: 4, song_id: 31, text: 'Poker Face Lady Gaga: The definition of a bop.', date: new Date('2024-01-30'), review: 9 },
    { id: 15, user_id: 5, song_id: 26, text: 'Red Wine Supernova by Chappell Roan is infectious.', date: new Date('2024-02-01'), review: 8 },
    { id: 16, user_id: 6, song_id: 82, text: 'Watermelon Sugar is summer in audio form.', date: new Date('2024-02-03'), review: 8 },
    { id: 17, user_id: 7, song_id: 38, text: 'Dave is too underrated. Samson is a lyrical journey.', date: new Date('2024-02-05'), review: 9 },
    { id: 18, user_id: 8, song_id: 67, text: 'Cherry Bomb by Tyler is absolute madness.', date: new Date('2024-02-07'), review: 8 },
    { id: 19, user_id: 9, song_id: 71, text: 'Happier Than Ever hits different when angry.', date: new Date('2024-02-09'), review: 9 },
    { id: 20, user_id: 10, song_id: 85, text: 'drivers license by Olivia Rodrigo defined a generation.', date: new Date('2024-02-11'), review: 10 },
    { id: 21, user_id: 1, song_id: 78, text: 'God is a Woman: The anthem we all needed.', date: new Date('2024-02-13'), review: 9 },
    { id: 22, user_id: 2, song_id: 54, text: 'King Kunta is funk perfection.', date: new Date('2024-02-15'), review: 9 },
    { id: 23, user_id: 3, song_id: 62, text: 'SOS by SZA is silky smooth.', date: new Date('2024-02-17'), review: 8 },
    { id: 24, user_id: 4, song_id: 27, text: 'Femininomenon is hyperpop at its finest.', date: new Date('2024-02-19'), review: 8 },
    { id: 25, user_id: 5, song_id: 34, text: 'Shallow is a cinematic masterpiece.', date: new Date('2024-02-21'), review: 9 },
    { id: 26, user_id: 6, song_id: 83, text: 'As It Was: Harry Styles dominates 2022.', date: new Date('2024-02-23'), review: 9 },
    { id: 27, user_id: 7, song_id: 48, text: 'This Charming Man defined a generation.', date: new Date('2024-02-25'), review: 10 },
    { id: 28, user_id: 8, song_id: 55, text: 'No Role Modelz is Cole at his best.', date: new Date('2024-02-27'), review: 9 },
    { id: 29, user_id: 9, song_id: 90, text: 'vampire by Olivia Rodrigo hits too hard.', date: new Date('2024-02-29'), review: 9 },
    { id: 30, user_id: 10, song_id: 100, text: 'my boy only breaks his favourite toys is devastating.', date: new Date('2024-03-02'), review: 10 }
  ];

    const comments = [
    { id: 1, user_id: 2, blog_id: 1, text: 'Fits rooftop runs too.', date: new Date('2024-02-01') },
    { id: 2, user_id: 3, blog_id: 1, text: 'This is the one for midnight drives.', date: new Date('2024-02-02') },
    { id: 3, user_id: 5, blog_id: 2, text: 'Ashnikko never misses.', date: new Date('2024-02-03') },
    { id: 4, user_id: 1, blog_id: 3, text: 'Carti ad-libs are sonar pings.', date: new Date('2024-02-04') },
    { id: 5, user_id: 4, blog_id: 4, text: 'Heroes need choruses like this.', date: new Date('2024-02-05') },
    { id: 6, user_id: 6, blog_id: 5, text: 'Bench press approved 100%.', date: new Date('2024-02-06') },
    { id: 7, user_id: 7, blog_id: 6, text: 'K-pop training arc confirmed.', date: new Date('2024-02-07') },
    { id: 8, user_id: 8, blog_id: 7, text: 'Energy is unmatched.', date: new Date('2024-02-08') },
    { id: 9, user_id: 9, blog_id: 8, text: 'Chaos recognizes chaos.', date: new Date('2024-02-09') },
    { id: 10, user_id: 10, blog_id: 9, text: 'Retro but deadly accurate.', date: new Date('2024-02-10') },
    { id: 11, user_id: 3, blog_id: 10, text: 'Industrial noise is art.', date: new Date('2024-02-11') },
    { id: 12, user_id: 2, blog_id: 10, text: 'Powerful stuff for sure.', date: new Date('2024-02-12') },
    { id: 13, user_id: 1, blog_id: 11, text: 'The Smiths will always be timeless.', date: new Date('2024-02-13') },
    { id: 14, user_id: 4, blog_id: 12, text: 'Kendrick is unmatched in bars.', date: new Date('2024-02-14') },
    { id: 15, user_id: 5, blog_id: 13, text: 'Billie changed everything.', date: new Date('2024-02-15') },
    { id: 16, user_id: 6, blog_id: 14, text: 'Lady Gaga is a legend.', date: new Date('2024-02-16') },
    { id: 17, user_id: 7, blog_id: 15, text: 'Chappell Roan energy hits different.', date: new Date('2024-02-17') },
    { id: 18, user_id: 8, blog_id: 16, text: 'Harry Styles owns 2022.', date: new Date('2024-02-18') },
    { id: 19, user_id: 9, blog_id: 17, text: 'Dave is criminally underrated.', date: new Date('2024-02-19') },
    { id: 20, user_id: 10, blog_id: 18, text: 'Tyler is pure genius.', date: new Date('2024-02-20') },
    { id: 21, user_id: 1, blog_id: 19, text: 'Happier Than Ever slaps hard.', date: new Date('2024-02-21') },
    { id: 22, user_id: 2, blog_id: 20, text: 'Olivia Rodrigo understood us all.', date: new Date('2024-02-22') },
    { id: 23, user_id: 3, blog_id: 21, text: 'God Is A Woman is pure anthem.', date: new Date('2024-02-23') },
    { id: 24, user_id: 4, blog_id: 22, text: 'King Kunta deserves all the love.', date: new Date('2024-02-24') },
    { id: 25, user_id: 5, blog_id: 23, text: 'SZA is next level talent.', date: new Date('2024-02-25') },
    { id: 26, user_id: 6, blog_id: 24, text: 'Hyperpop revolution started here.', date: new Date('2024-02-26') },
    { id: 27, user_id: 7, blog_id: 25, text: 'Shallow is movie soundtrack gold.', date: new Date('2024-02-27') },
    { id: 28, user_id: 8, blog_id: 26, text: 'As It Was is perfection.', date: new Date('2024-02-28') },
    { id: 29, user_id: 9, blog_id: 27, text: 'This Charming Man forever iconic.', date: new Date('2024-02-29') },
    { id: 30, user_id: 10, blog_id: 28, text: 'Cole knows how to write bars.', date: new Date('2024-03-01') },
    { id: 31, user_id: 1, blog_id: 29, text: 'vampire gutted me emotionally.', date: new Date('2024-03-02') },
    { id: 32, user_id: 2, blog_id: 30, text: 'This song is devastating beautiful.', date: new Date('2024-03-03') }
  ];

  const likedSongs = [
    { user_id: 1, song_id: 18 },
    { user_id: 1, song_id: 9 },
    { user_id: 1, song_id: 31 },
    { user_id: 1, song_id: 46 },
    { user_id: 1, song_id: 78 },
    { user_id: 2, song_id: 14 },
    { user_id: 2, song_id: 8 },
    { user_id: 2, song_id: 51 },
    { user_id: 2, song_id: 54 },
    { user_id: 2, song_id: 100 },
    { user_id: 3, song_id: 7 },
    { user_id: 3, song_id: 21 },
    { user_id: 3, song_id: 72 },
    { user_id: 3, song_id: 36 },
    { user_id: 3, song_id: 66 },
    { user_id: 4, song_id: 9 },
    { user_id: 4, song_id: 15 },
    { user_id: 4, song_id: 27 },
    { user_id: 4, song_id: 31 },
    { user_id: 4, song_id: 85 },
    { user_id: 5, song_id: 6 },
    { user_id: 5, song_id: 26 },
    { user_id: 5, song_id: 34 },
    { user_id: 5, song_id: 62 },
    { user_id: 5, song_id: 90 },
    { user_id: 6, song_id: 5 },
    { user_id: 6, song_id: 17 },
    { user_id: 6, song_id: 82 },
    { user_id: 6, song_id: 83 },
    { user_id: 6, song_id: 71 },
    { user_id: 7, song_id: 4 },
    { user_id: 7, song_id: 38 },
    { user_id: 7, song_id: 48 },
    { user_id: 7, song_id: 73 },
    { user_id: 7, song_id: 88 },
    { user_id: 8, song_id: 13 },
    { user_id: 8, song_id: 67 },
    { user_id: 8, song_id: 68 },
    { user_id: 8, song_id: 55 },
    { user_id: 8, song_id: 79 },
    { user_id: 9, song_id: 25 },
    { user_id: 9, song_id: 71 },
    { user_id: 9, song_id: 90 },
    { user_id: 9, song_id: 64 },
    { user_id: 9, song_id: 99 },
    { user_id: 10, song_id: 11 },
    { user_id: 10, song_id: 12 },
    { user_id: 10, song_id: 100 },
    { user_id: 10, song_id: 53 },
    { user_id: 10, song_id: 74 },
    { user_id: 11, song_id: 30 },
    { user_id: 11, song_id: 75 },
    { user_id: 11, song_id: 80 },
    { user_id: 12, song_id: 45 },
    { user_id: 12, song_id: 86 },
    { user_id: 12, song_id: 92 },
    { user_id: 13, song_id: 50 },
    { user_id: 13, song_id: 61 },
    { user_id: 13, song_id: 98 }
  ];

  await queryInterface.bulkInsert('roles', roles);
  await queryInterface.bulkInsert('users', users);
  await queryInterface.bulkInsert('profiles', profiles);
  await queryInterface.bulkInsert('genres', genres);
  await queryInterface.bulkInsert('artists', artists);
  await queryInterface.bulkInsert('songs', songs);
  await queryInterface.bulkInsert('songGenres', songGenres);
  await queryInterface.bulkInsert('songArtists', songArtists);
  await queryInterface.bulkInsert('blogs', blogs);
  await queryInterface.bulkInsert('comments', comments);
  await queryInterface.bulkInsert('user_liked_songs', likedSongs);


  //index reset
  await queryInterface.sequelize.query(
    "SELECT setval(pg_get_serial_sequence('roles', 'id'), coalesce(max(id), 0) + 1, false) FROM roles;"
  );
  await queryInterface.sequelize.query(
    "SELECT setval(pg_get_serial_sequence('users', 'id'), coalesce(max(id), 0) + 1, false) FROM users;"
  );
  await queryInterface.sequelize.query(
    "SELECT setval(pg_get_serial_sequence('profiles', 'id'), coalesce(max(id), 0) + 1, false) FROM profiles;"
  );
  await queryInterface.sequelize.query(
    "SELECT setval(pg_get_serial_sequence('genres', 'id'), coalesce(max(id), 0) + 1, false) FROM genres;"
  );
  await queryInterface.sequelize.query(
    "SELECT setval(pg_get_serial_sequence('artists', 'id'), coalesce(max(id), 0) + 1, false) FROM artists;"
  );
  await queryInterface.sequelize.query(
    "SELECT setval(pg_get_serial_sequence('songs', 'id'), coalesce(max(id), 0) + 1, false) FROM songs;"
  );
  await queryInterface.sequelize.query(
    "SELECT setval(pg_get_serial_sequence('blogs', 'id'), coalesce(max(id), 0) + 1, false) FROM blogs;"
  );
  await queryInterface.sequelize.query(
    "SELECT setval(pg_get_serial_sequence('comments', 'id'), coalesce(max(id), 0) + 1, false) FROM comments;"
  );

},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_liked_songs', null, {});
    await queryInterface.bulkDelete('comments', null, {});
    await queryInterface.bulkDelete('blogs', null, {});
    await queryInterface.bulkDelete('songArtists', null, {});
    await queryInterface.bulkDelete('songGenres', null, {});
    await queryInterface.bulkDelete('profiles', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('artists', null, {});
    await queryInterface.bulkDelete('genres', null, {});
    await queryInterface.bulkDelete('songs', null, {});
  }
}