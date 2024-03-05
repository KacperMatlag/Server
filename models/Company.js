module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define("Company", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        Description: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        Image: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        AddressID: {
            type: DataTypes.INTEGER(),
            allowNull: false
        }
    }, {
        tableName: "company",
        timestamps: false
    });

    Company.associate = (models) => {
        Company.belongsTo(models.Address, {
            foreignKey: "AddressID"
        })
    }

    return Company;
}