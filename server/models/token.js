module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    "token", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      expiredAt: {
        type: DataTypes.DATE
      }
    }, {
      timestamps: false,
      freezeTableName: true
    }
  );
  Token.associate = function (models) {
    Token.belongsTo(models.users, {
      foreignKey: "user_id"
    });
  };
  return Token;
};