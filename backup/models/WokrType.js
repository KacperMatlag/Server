module.exports=(sequalize,DataTypes)=>{
    const WorkType=sequalize.define('WorkType',{
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
        tableName:"worktype",
        timestamps:false
    })
    return WorkType;
}