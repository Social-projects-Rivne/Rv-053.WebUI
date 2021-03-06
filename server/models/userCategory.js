module.exports = (sequelize, DataTypes) => {
  const userCategory = sequelize.define(
    'user_category',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      category_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'category',
          key: 'id'
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );

  userCategory.associate = models => {
    userCategory.belongsTo(models.users, {
      foreignKey: 'user_id'
    });
    userCategory.belongsTo(models.category, {
      foreignKey: 'category_id'
    });
  };
  return userCategory;
};
