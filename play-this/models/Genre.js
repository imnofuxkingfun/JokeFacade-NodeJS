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
    }
  }, {
    tableName: 'genres',
    timestamps: false
  });

  return Genre;
};