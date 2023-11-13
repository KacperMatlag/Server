module.exports=(sequalize,DataTypes)=>{
    const TypeOfContract=sequalize.define('TypeOfContract',{
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