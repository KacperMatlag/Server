module.exports = (sequalize, DataTypes) => {
    const WorkType = sequalize.define('WorkType', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: "worktype",
        timestamps: false
    })
    return WorkType;
}