module.exports=(sequalize,DataTypes)=>{
    const WorkingTime=sequalize.define('WorkingTime',{
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
        tableName:"workingtime",
        timestamps:false
    })
    return WorkingTime;
}