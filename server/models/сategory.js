module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
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
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        timestamps: false,
        freezeTableName: true
    });

    Category.associate = (models) => {
        Category.belongsToMany(models.user, {
            foreignKey: 'category_id',
            through: 'user_category'
        });
        Category.belongsToMany(models.event, {
            foreignKey: 'category_id',
            through: 'event_category'
        });
    }
    return Category;
}