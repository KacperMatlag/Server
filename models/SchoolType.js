module.exports = (sequelize, DataTypes) => {
    const SchoolType = sequelize.define("SchoolType", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    }, {
        tableName: "schooltype",
        timestamps: false
    });

    return SchoolType;
};