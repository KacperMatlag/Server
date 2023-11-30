module.exports=(sequalize,DataTypes)=>{
    const JobLevel=sequalize.define('JobLevel',{
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
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