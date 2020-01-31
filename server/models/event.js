module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'event', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.STRING
      },
      datetime: {
        type: DataTypes.DATEONLY
      },
      duration: {
        type: DataTypes.STRING
      },
      max_participants: {
        type: DataTypes.DATEONLY
      },
      min_age: {
        type: DataTypes.INTEGER
      },
      cover: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.INTEGER
      },
      price: {
        type: DataTypes.STRING
      }
    }, {
      timestamps: false,
      freezeTableName: true
    }
  );

  Event.associate = models => {
    Event.belongsTo(models.users, {
      foreignKey: 'owner_id'
    });
    Event.hasMany(models.event_gallery, {
      foreignKey: 'event_id',
      onDelete: 'CASCADE'
    });
    Event.belongsToMany(models.users, {
      foreignKey: 'event_id',
      through: 'user_event'
    });
    Event.belongsToMany(models.category, {
      foreignKey: 'event_id',
      through: 'event_category'
    });
  };

  return Event;
};