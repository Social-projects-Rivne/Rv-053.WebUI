module.exports = (sequelize, DataTypes) => {
    const EventFeedback = sequelize.define('event_feedback', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        positive: {
            type: DataTypes.STRING,

        },
        negative: {
            type: DataTypes.STRING,

        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    EventFeedback.associate = function (models) {
        EventFeedback.belongsTo(models.event, {
            foreignKey: 'event_id'
        });
    };
    return EventFeedback;
}