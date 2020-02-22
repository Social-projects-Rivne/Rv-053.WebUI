module.exports = (sequelize, DataTypes) => {
  const EventFeedback = sequelize.define(
    'event_feedback',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_event_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      positive: {
        type: DataTypes.STRING
      },
      negative: {
        type: DataTypes.STRING
      },
      date: {
        type: DataTypes.BIGINT,
        allowNull: false
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  EventFeedback.associate = models => {
    EventFeedback.belongsTo(models.user_event, {
      foreignKey: 'user_event_id'
    });
  };
  return EventFeedback;
};
