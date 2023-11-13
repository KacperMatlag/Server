module.exports=(sequalize,DataTypes)=>{
    const WorkCategory=sequalize.define('WorkCategory',{
        Name:{
            type: DataTypes.STRING(50),
            allowNull: false
        }
    },{
        tableName: "workcategory",
        timestamps: false
    })
    return WorkCategory;
}