module.exports = (sequalize, DataTypes) => {
    const Requirements = sequalize.define('Requirements', {
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
        tableName: "Requirements",
        timestamps: false
    })

    Requirements.associate = (models) => {
        Requirements.belongsTo(models.Announcement, {
            foreignKey: 'AnnouncementID',
        })
    }

    return Requirements;
}