module.exports = (sequalize, DataTypes) => {
    const UserWithCompany = sequalize.define("UserWithCompany", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ProfileID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        CompanyID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        HierarchyID: {
            type: DataTypes.INTEGER,
            //allowNull: false
        }
    }, {
        tablename: "userwithcompany",
        timestamps: false
    })

    UserWithCompany.associate = (models) => {
        UserWithCompany.belongsTo(models.Company, {
            foreignKey: 'CompanyID'
        })
    }


    return UserWithCompany
}