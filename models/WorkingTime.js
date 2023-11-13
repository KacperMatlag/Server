module.exports=(sequalize,DataTypes)=>{
    const WorkingTime=sequalize.define('WorkingTime',{
        Name:{
            type:DataTypes.STRING(50),
            allowNull:false
        }
    },{
        tableName:"workingtime",
        timestamps:false
    })
    return WorkingTime;
}