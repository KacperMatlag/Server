module.exports=(sequalize,DataTypes)=>{
    const Announcement=sequalize.define('Announcement',{
        ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Title:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        Description:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        JobPositionID:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false
        },
        JobLevelID:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false
        },
        TypeOfContractID:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false
        },
        WorkingTimeID:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false
        },
        WorkTypeID:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false
        },
        WorkCategoryID:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false
        },
        ExpirationDate:{
            type:DataTypes.DATE,
            allowNull:false
        },
        MinWage:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        MaxWage:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        Requirements:{
            type:DataTypes.STRING,
            allowNull:false
        },
        WhatTheEmployerOffers:{
            type:DataTypes.STRING,
            allowNull:false
        },
        CompanyID:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false
        },
        CreatedAt:{
            type:DataTypes.DATE,
            allowNull: false
        }

    },{
        tableName: "announcement",
        timestamps: false
    })

    Announcement.associate = (models) => {
        Announcement.belongsTo(models.JobPosition, {
            foreignKey: 'JobPositionID'
        });
    
        Announcement.belongsTo(models.WorkCategory,{
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
    };
    return Announcement;
}