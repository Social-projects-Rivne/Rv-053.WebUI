module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'category',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );

  Category.associate = models => {
    Category.belongsToMany(models.users, {
      foreignKey: 'category_id',
      through: 'user_category'
    });
    Category.belongsToMany(models.event, {
      foreignKey: 'category_id',
      through: 'event_category'
    });
  };
  return Category;
};
