module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Login: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        Password: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        ProfileID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true,
        }
    }, {
        tableName: "user",
        timestamps: false
    });

    User.associate = (models) => {
        User.belongsTo(models.Profile, { foreignKey: 'ProfileID' });
    };

    return User;
};