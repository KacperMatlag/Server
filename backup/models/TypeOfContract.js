module.exports=(sequalize,DataTypes)=>{
    const TypeOfContract=sequalize.define('TypeOfContract',{
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
        tableName:"typeofcontract",
        timestamps:false
    })
    return TypeOfContract;
}