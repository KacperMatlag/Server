module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
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