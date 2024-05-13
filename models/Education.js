
module.exports = (sequelize, DataTypes) => {
    const Education = sequelize.define('Education', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        SchoolName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        City: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        FieldOfStudy: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        StartDate: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        EndDate: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ProfileID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: "education",
        timestamps: false
    });

    Education.associate = (models) => {
        Education.belongsTo(models.SchoolType, {
            foreignKey: 'SchoolType',
            as: 'schoolType'
        });
    };

    return Education;
};