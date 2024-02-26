module.exports = (Sequalize, DataTypes) => {
    const Service = Sequalize.define("Service", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        ImageUrl: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
    }, {
        tableName: "services",
        timestamps: false
    })
    return Service;
}