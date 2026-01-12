import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Artist = sequelize.define('Artist', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'artists',
    timestamps: false
  });

  return Artist;
};