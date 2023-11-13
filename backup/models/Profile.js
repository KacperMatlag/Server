module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define("Profile", {
        ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DateOfBirth: {
            type: DataTypes.DATE
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PhoneNumber: {
            type: DataTypes.STRING
        },
        ProfilePicture: {
            type: DataTypes.STRING
        },
        AddressID: {
            type: DataTypes.INTEGER
        },
        ProfessionalSummary: {
            type: DataTypes.STRING
        }
    }, {
        tableName: "profile",
        timestamps: false
    });

    return Profile;
};