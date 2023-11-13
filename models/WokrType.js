module.exports=(sequalize,DataTypes)=>{
    const WorkType=sequalize.define('WorkType',{
        Name:{
            type:DataTypes.STRING(50),
            allowNull:false
        }
    },{
        tableName:"worktype",
        timestamps:false
    })
    return WorkType;
}