module.exports = (sequelize, DataTypes) => {
    const JobPosition = sequelize.define('JobPosition', {
        Name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    }, {
        tableName: 'jobposition',
        timestamps: false
    });
    return JobPosition;
};