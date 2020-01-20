module.exports = (sequelize, DataTypes) => {
    const UserStatus = sequelize.define('user_status', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            primaryKey: true
        },
        role: {
            type: DataTypes.ENUM("Admin", "Moderator", "User"),
            allowNull: false,
            defaultValue: "User"
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    UserStatus.associate = function (models) {
        UserStatus.hasMany(models.user, {
            foreignKey: 'status_id',
        });
    };
    return UserStatus;
}