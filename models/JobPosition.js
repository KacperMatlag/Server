module.exports = (sequelize, DataTypes) => {
    const JobPosition = sequelize.define('JobPosition', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    }, {
        tableName: 'jobposition',
        timestamps: false
    });

    JobPosition.associate = (models) => {
        JobPosition.hasMany(models.Profile, {
            foreignKey: 'CurrentJobPositionID',
            as: "Profiles"
        });
    };
    return JobPosition;
};