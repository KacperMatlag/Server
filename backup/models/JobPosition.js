module.exports = (sequelize, DataTypes) => {
    const JobPosition = sequelize.define('JobPosition', {
        ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'jobposition',
        timestamps: false
    });
    return JobPosition;
};