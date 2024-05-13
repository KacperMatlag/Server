module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define("Course", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        Organizer: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        StartDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        EndDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        ProfileID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: "course",
        timestamps: false
    });
    return Course;
}