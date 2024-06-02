module.exports = (sequalize, DataTypes) => {
    const Announcement = sequalize.define('Announcement', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        Description: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        JobPositionID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        JobLevelID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        TypeOfContractID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        WorkingTimeID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        WorkTypeID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        WorkCategoryID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ExpirationDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        MinWage: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        MaxWage: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        CompanyID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        CreatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },

    }, {
        tableName: "announcement",
        timestamps: false
    })

    Announcement.associate = (models) => {
        Announcement.belongsTo(models.JobPosition, {
            foreignKey: 'JobPositionID',
        });

        Announcement.belongsTo(models.WorkCategory, {
            foreignKey: 'WorkCategoryID'
        })

        Announcement.belongsTo(models.Company, {
            foreignKey: 'CompanyID'
        });

        Announcement.belongsTo(models.JobLevel, {
            foreignKey: 'JobLevelID'
        });

        Announcement.belongsTo(models.TypeOfContract, {
            foreignKey: 'TypeOfContractID'
        });

        Announcement.belongsTo(models.WorkingTime, {
            foreignKey: 'WorkingTimeID'
        });

        Announcement.belongsTo(models.WorkType, {
            foreignKey: 'WorkTypeID'
        });

        Announcement.hasMany(models.Duties, {
            foreignKey: 'AnnouncementID',
            as: 'Duties',
        });

        Announcement.hasMany(models.Requirements, {
            foreignKey: 'AnnouncementID',
        });

        Announcement.hasMany(models.WhatTheEmployerOffers, {
            foreignKey: 'AnnouncementID',
        });

        Announcement.hasMany(models.Application, {
            foreignKey: "AnnouncementID"
        })

    };
    return Announcement;
}