module.exports = (sequalize, DataTypes) => {
    const Languages = sequalize.define("Languages", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        tableName: "language",
        timestamps: false,
    })
    return Languages;
}