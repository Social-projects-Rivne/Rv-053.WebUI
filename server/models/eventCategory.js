module.exports = (sequelize, DataTypes) => {
    const EventCategory = sequelize.define('event_category', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'event',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'category',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        },
    }, {
        timestamps: false,
        freezeTableName: true
    });


    EventCategory.associate = (models) => {
        EventCategory.belongsTo(models.category, {
            foreignKey: 'category_id'
        });
        EventCategory.belongsTo(models.event, {
            foreignKey: 'event_id'
        });
    }
    return EventCategory;
}