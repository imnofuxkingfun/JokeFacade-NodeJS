import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Genre = sequelize.define('Genre', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    parent_genre_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'genres',
        key: 'id'
      }
    }
  }, {
    tableName: 'genres',
    timestamps: false
  });

  return Genre;
};