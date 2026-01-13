import { Sequelize } from 'sequelize';
import 'dotenv/config';

import RoleModel from '../models/Role.js';
import UserModel from '../models/User.js';
import ProfileModel from '../models/Profile.js';
import GenreModel from '../models/Genre.js';
import ArtistModel from '../models/Artist.js';
import SongModel from '../models/Song.js';
import UserLikedSongModel from '../models/UserLikedSongs.js';
import BlogModel from '../models/Blog.js';
import CommentModel from '../models/Comment.js';

const sequelize =  new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
});



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
User.hasOne(Profile, { foreignKey: 'id', onDelete: 'CASCADE' });
Profile.belongsTo(User, { foreignKey: 'id' });

// Song <-> Genre (Many-to-Many)
Song.belongsToMany(Genre, { 
  through: 'SongGenres',
  foreignKey: 'song_id',
  otherKey: 'genre_id',
  onDelete: 'CASCADE'
});
Genre.belongsToMany(Song, { 
  through: 'SongGenres',
  foreignKey: 'genre_id',
  otherKey: 'song_id',
  onDelete: 'CASCADE'
});

// Genre self-reference (parent <-> subgenres)
Genre.hasMany(Genre, { 
  as: 'Subgenres',
  foreignKey: 'parent_genre_id',
  onDelete: 'SET NULL'
});
Genre.belongsTo(Genre, { 
  as: 'ParentGenre',
  foreignKey: 'parent_genre_id',
  onDelete: 'SET NULL'
});

// Song <-> Artist (Many-to-Many)
Song.belongsToMany(Artist, { 
  through: 'SongArtists',
  foreignKey: 'song_id',
  otherKey: 'artist_id',
  onDelete: 'CASCADE'
});
Artist.belongsToMany(Song, { 
  through: 'SongArtists',
  foreignKey: 'artist_id',
  otherKey: 'song_id',
  onDelete: 'CASCADE'
});

// User <-> Song (Many-to-Many through UserLikedSong)
User.belongsToMany(Song, { 
  through: UserLikedSong, 
  foreignKey: 'user_id',
  otherKey: 'song_id',
  onDelete: 'CASCADE'
});
Song.belongsToMany(User, { 
  through: UserLikedSong, 
  foreignKey: 'song_id',
  otherKey: 'user_id',
  onDelete: 'CASCADE'
});

// Blog <-> User
Blog.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Blog, { foreignKey: 'user_id' });

// Blog <-> Song
Blog.belongsTo(Song, { foreignKey: 'song_id', onDelete: 'SET NULL' });
Song.hasMany(Blog, { foreignKey: 'song_id' });

// Comment <-> User
Comment.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Comment, { foreignKey: 'user_id' });

// Comment <-> Blog
Comment.belongsTo(Blog, { foreignKey: 'blog_id', onDelete: 'CASCADE' });
Blog.hasMany(Comment, { foreignKey: 'blog_id' });

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