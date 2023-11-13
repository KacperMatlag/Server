module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        Login: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ProfileID: {
            type: DataTypes.INTEGER,
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