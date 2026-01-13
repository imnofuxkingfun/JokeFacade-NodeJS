import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Blog = sequelize.define('Blog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    review: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      validate: {
        min: 0,
        max: 10
      }
    },
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'songs',
        key: 'id'
      }
    }
  }, {
    tableName: 'blogs',
    timestamps: false,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['song_id'] },
      { fields: ['date'] }
    ]
  });

  return Blog;
};