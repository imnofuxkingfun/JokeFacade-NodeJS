import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Song = sequelize.define('Song', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'genres',
        key: 'id'
      }
    },
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'artists',
        key: 'id'
      }
    }
  }, {
    tableName: 'songs',
    timestamps: false,
    indexes: [
      { fields: ['genre_id'] },
      { fields: ['artist_id'] }
    ]
  });

  return Song;
};