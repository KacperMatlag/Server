module.exports=(sequalize,DataTypes)=>{
    const JobLevel=sequalize.define('JobLevel',{
        Name:{
            type:DataTypes.STRING(50),
            allowNull:false
        }
    },{
        tableName:"joblevel",
        timestamps:false
    })
    return JobLevel;
}