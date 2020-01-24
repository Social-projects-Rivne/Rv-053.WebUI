module.exports = (sequelize, DataTypes) => {
  const UserStatus = sequelize.define(
    'user_status',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  UserStatus.associate = function(models) {
    UserStatus.hasMany(models.users, {
      foreignKey: 'status_id'
    });
  };
  return UserStatus;
};
