module.exports=(sequelize,DataTypes)=>{
    const CategoryWithPosition=sequelize.define('CategoryWithPosition',{
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        JobPositionID:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        WorkCategoryID:{
            type:DataTypes.INTEGER,
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