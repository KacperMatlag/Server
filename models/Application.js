module.exports = (sequelize, DataTypes) => {
    const Application = sequelize.define("Application", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        AnnouncementID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ProfileID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: "application",
        timestamps: true
    });

    Application.associate = (models) => {
        Application.belongsTo(models.Profile, {
            foreignKey: 'ProfileID',
        });
        Application.belongsTo(models.Announcement, {
            foreignKey: 'AnnouncementID',
        });
    }
    return Application;
}