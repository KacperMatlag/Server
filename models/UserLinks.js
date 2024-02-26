module.exports = (sequalize, DataTypes) => {
    const UserLinks = sequalize.define("UserLinks", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ProfileID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ServiceID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Link: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
    }, {
        tableName: "userlinks",
        timestamps: false
    })

    UserLinks.associate = (models) => {
        UserLinks.belongsTo(models.Service, {
            foreignKey: "ServiceID",
            as: "Service"
        })
    }

    return UserLinks;
}