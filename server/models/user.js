module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      first_name: {
        type: DataTypes.STRING
      },
      last_name: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.STRING
      },
      avatar: {
        type: DataTypes.STRING
      },
      birthday: {
        type: DataTypes.BIGINT
      },
      sex: {
        type: DataTypes.ENUM('Male', 'Female', 'Unknown'),
        allowNull: false,
        defaultValue: 'Unknown'
      },
      status_id: {
        type: DataTypes.INTEGER
      },
      role: {
        type: DataTypes.ENUM('Admin', 'Moderator', 'User'),
        allowNull: false,
        defaultValue: 'User'
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );

  User.associate = models => {
    User.hasMany(models.followers, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.hub, {
      foreignKey: 'owner_id',
      onDelete: 'CASCADE'
    });

    User.belongsTo(models.user_status, {
      foreignKey: 'status_id'
    });

    User.hasMany(models.event, {
      foreignKey: 'owner_id',
      onDelete: 'CASCADE'
    });

    User.belongsToMany(models.event, {
      foreignKey: 'user_id',
      through: 'user_event'
    });

    User.belongsToMany(models.category, {
      foreignKey: 'user_id',
      through: 'user_category'
    });

    User.hasMany(models.token, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
