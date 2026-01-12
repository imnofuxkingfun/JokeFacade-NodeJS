import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Profile = sequelize.define('Profile', {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    display_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'profiles',
    timestamps: false
  });

  return Profile;
};