module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define("Address", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Address: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        Longitude: {
            type: DataTypes.INTEGER(),
            allowNull: false
        },
        Latitude: {
            type: DataTypes.INTEGER(),
            allowNull: true
        }
    }, {
        tableName: "useraddress",
        timestamps: false
    });
    return Address;
}