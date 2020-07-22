module.exports = (sequelize, DataTypes) => {
  const Hub = sequelize.define(
    'hub',
    {
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
      location: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      img: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      owner_id: {
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  Hub.associate = models => {
    Hub.belongsTo(models.users, {
      foreignKey: 'owner_id'
    });
  };
  return Hub;
};
