module.exports=(sequalize,DataTypes)=>{
    const WorkCategory=sequalize.define('WorkCategory',{
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
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