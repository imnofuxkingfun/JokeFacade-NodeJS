import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    id_blog: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'blogs',
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
    }
  }, {
    tableName: 'comments',
    timestamps: false,
    indexes: [
      { fields: ['id_user'] },
      { fields: ['id_blog'] },
      { fields: ['date'] }
    ]
  });

  return Comment;
};