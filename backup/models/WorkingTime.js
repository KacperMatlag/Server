module.exports=(sequalize,DataTypes)=>{
    const WorkingTime=sequalize.define('WorkingTime',{
        ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Name:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        tableName:"workingtime",
        timestamps:false
    })
    return WorkingTime;
}