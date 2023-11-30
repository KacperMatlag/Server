module.exports=(sequalize,DataTypes)=>{
    const TypeOfContract=sequalize.define('TypeOfContract',{
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
        tableName:"typeofcontract",
        timestamps:false
    })
    return TypeOfContract;
}