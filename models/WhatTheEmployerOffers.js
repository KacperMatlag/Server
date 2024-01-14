module.exports = (sequalize, DataTypes) => {
    const WhatTheEmployerOffers = sequalize.define('WhatTheEmployerOffers', {
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
        tableName: "WhatTheEmployerOffers",
        timestamps: false
    })

    WhatTheEmployerOffers.associate = (models) => {
        WhatTheEmployerOffers.belongsTo(models.Announcement, {
            foreignKey: 'AnnouncementID'
        })
    }

    return WhatTheEmployerOffers;
}