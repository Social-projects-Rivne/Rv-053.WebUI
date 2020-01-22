module.exports = (sequelize, DataTypes) => {
    const EventGallery = sequelize.define('event_gallery', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        img_url: {
            type: DataTypes.STRING
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },
        is_deleted: {
            type: DataTypes.INTEGER,
        },
    }, {
        timestamps: false,
        freezeTableName: true
    });

    EventGallery.associate = (models) => {
        EventGallery.belongsTo(models.event, {
            foreignKey: 'event_id'
        });
    }

    return EventGallery;
}