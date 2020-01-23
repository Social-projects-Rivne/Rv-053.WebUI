module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define(
    'followers',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      folowed_id: {
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  Followers.associate = function(models) {
    Followers.belongsTo(models.users, {
      foreignKey: 'user_id'
    });
  };

  return Followers;
};
