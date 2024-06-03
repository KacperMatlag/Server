module.exports = (sequalize, DataTypes) => {
    const Employment = sequalize.define('Employment', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Company: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        Position: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        StartDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        EndDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ProfileID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: "employment",
        timestamps: false
    })
    return Employment;
}