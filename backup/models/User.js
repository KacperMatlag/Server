module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ProfileID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
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