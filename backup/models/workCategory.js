module.exports=(sequalize,DataTypes)=>{
    const WorkCategory=sequalize.define('WorkCategory',{
        ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Name:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        tableName: "workcategory",
        timestamps: false
    })
    return WorkCategory;
}