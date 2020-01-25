module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING,

        },
        avatar: {
            type: DataTypes.STRING,

        },
        birthday: {
            type: DataTypes.DATEONLY,

        },
        sex: {
            type: DataTypes.ENUM("Male", "Female", "Unknown"),
            allowNull: false,
            defaultValue: "Unknown"
        },
        status_id: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        role: {
            type: DataTypes.ENUM("Admin", "Moderator", "User"),
            allowNull: false,
            defaultValue: "User"
        },
    }, {
        timestamps: false,
        freezeTableName: true
    });
    User.associate = function (models) {
        User.hasMany(models.followers, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        });
    };

    User.associate = function (models) {
        User.hasMany(models.hub, {
            foreignKey: 'owner_id',
            onDelete: 'CASCADE'
        });
    };

    User.associate = function (models) {
        User.belongsTo(models.user_status, {
            foreignKey: 'status_id',
            onDelete: 'CASCADE'
        });
    };

    User.associate = (models) => {
        User.hasMany(models.event, {
            foreignKey: 'owner_id',
            onDelete: 'CASCADE'
        });
    }

    User.associate = (models) => {
        User.belongsToMany(models.event, {
            foreignKey: 'user_id',
            through: 'user_event'
        });
    }

    User.associate = (models) => {
        User.belongsToMany(models.category, {
            foreignKey: 'user_id',
            through: 'user_category'
        });
    }

    return User;
}