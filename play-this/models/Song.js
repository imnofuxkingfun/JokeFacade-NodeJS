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
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'songs',
    timestamps: false
  });

  return Song;
};