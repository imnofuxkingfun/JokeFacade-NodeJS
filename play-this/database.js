import { Sequelize } from 'sequelize';
import 'dotenv/config';

import RoleModel from './models/Role.js';
import UserModel from './models/User.js';
import ProfileModel from './models/Profile.js';
import GenreModel from './models/Genre.js';
import ArtistModel from './models/Artist.js';
import SongModel from './models/Song.js';
import UserLikedSongModel from './models/UserLikedSongs.js';
import BlogModel from './models/Blog.js';
import CommentModel from './models/Comment.js';

const sequelize =  new Sequelize('playThis', 'postgres', 'record44LABEL', {
  host: 'localhost',
  port: 7447,
  dialect: 'postgres'
});


// const sequelize =  new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialect: 'postgres',
// });

async function testConnection() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();



const Role = RoleModel(sequelize);
const User = UserModel(sequelize);
const Profile = ProfileModel(sequelize);
const Genre = GenreModel(sequelize);
const Artist = ArtistModel(sequelize);
const Song = SongModel(sequelize);
const UserLikedSong = UserLikedSongModel(sequelize);
const Blog = BlogModel(sequelize);
const Comment = CommentModel(sequelize);

// User <-> Role
User.belongsTo(Role, { foreignKey: 'role_id', onDelete: 'RESTRICT' });
Role.hasMany(User, { foreignKey: 'role_id' });

// User <-> Profile (One-to-One)
User.hasOne(Profile, { foreignKey: 'id_user', onDelete: 'CASCADE' });
Profile.belongsTo(User, { foreignKey: 'id_user' });

// Song <-> Genre
Song.belongsTo(Genre, { foreignKey: 'genre_id', onDelete: 'SET NULL' });
Genre.hasMany(Song, { foreignKey: 'genre_id' });

// Song <-> Artist
Song.belongsTo(Artist, { foreignKey: 'artist_id', onDelete: 'SET NULL' });
Artist.hasMany(Song, { foreignKey: 'artist_id' });

// User <-> Song (Many-to-Many through UserLikedSong)
User.belongsToMany(Song, { 
  through: UserLikedSong, 
  foreignKey: 'id_user',
  otherKey: 'id_song',
  onDelete: 'CASCADE'
});
Song.belongsToMany(User, { 
  through: UserLikedSong, 
  foreignKey: 'id_song',
  otherKey: 'id_user',
  onDelete: 'CASCADE'
});

// Blog <-> User
Blog.belongsTo(User, { foreignKey: 'id_user', onDelete: 'CASCADE' });
User.hasMany(Blog, { foreignKey: 'id_user' });

// Blog <-> Song
Blog.belongsTo(Song, { foreignKey: 'song_id', onDelete: 'SET NULL' });
Song.hasMany(Blog, { foreignKey: 'song_id' });

// Comment <-> User
Comment.belongsTo(User, { foreignKey: 'id_user', onDelete: 'CASCADE' });
User.hasMany(Comment, { foreignKey: 'id_user' });

// Comment <-> Blog
Comment.belongsTo(Blog, { foreignKey: 'id_blog', onDelete: 'CASCADE' });
Blog.hasMany(Comment, { foreignKey: 'id_blog' });

export {
  sequelize,
  Role,
  User,
  Profile,
  Genre,
  Artist,
  Song,
  UserLikedSong,
  Blog,
  Comment
};

export default {
  sequelize,
  Role,
  User,
  Profile,
  Genre,
  Artist,
  Song,
  UserLikedSong,
  Blog,
  Comment
};