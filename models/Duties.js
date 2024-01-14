module.exports = (sequelize, DataTypes) => {
    const Duties = sequelize.define('Duties', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        AnnouncementID: {
            type: DataTypes.INTEGER,
        }
    }, {
        tableName: "Duties",
        timestamps: false
    });

    Duties.associate = (models) => {
        Duties.belongsTo(models.Announcement, {
            foreignKey: 'AnnouncementID',
        });
    };

    return Duties;
};