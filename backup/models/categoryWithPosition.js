module.exports=(sequelize,DataTypes)=>{
    const CategoryWithPosition=sequelize.define('CategoryWithPosition',{
        ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        JobPositionID:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
        },
        WorkCategoryID:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
        },
    },{
        tablename:"categorywithpositions",
        timestamps:false
    })

    CategoryWithPosition.associate = (models) => {
        CategoryWithPosition.belongsTo(models.JobPosition, { foreignKey: 'JobPositionID' });
        CategoryWithPosition.belongsTo(models.WorkCategory, { foreignKey: 'WorkCategoryID' });
    };

    return  CategoryWithPosition;
}