module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define("Company", {
        ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Image:{
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: "company",
        timestamps: false
    });
    return Company;
}