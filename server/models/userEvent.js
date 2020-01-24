module.exports = (sequelize, DataTypes) => {
  const UserEvent = sequelize.define(
    'user_event',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'event',
          key: 'id'
        }
      },
      event_status: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  UserEvent.associate = models => {
    UserEvent.belongsTo(models.users, {
      foreignKey: 'user_id'
    });
    UserEvent.belongsTo(models.event, {
      foreignKey: 'event_id'
    });
    UserEvent.hasMany(models.event_feedback, {
      foreignKey: 'user_event_id',
      onDelete: 'CASCADE'
    });
  };
  return UserEvent;
};
