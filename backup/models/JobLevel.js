module.exports=(sequalize,DataTypes)=>{
    const JobLevel=sequalize.define('JobLevel',{
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
        tableName:"joblevel",
        timestamps:false
    })
    return JobLevel;
}