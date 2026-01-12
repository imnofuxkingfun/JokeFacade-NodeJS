import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const UserLikedSong = sequelize.define('UserLikedSong', {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    id_song: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'songs',
        key: 'id'
      }
    }
  }, {
    tableName: 'user_liked_songs',
    timestamps: false
  });

  return UserLikedSong;
};