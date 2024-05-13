module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define("Profile", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Surname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        DateOfBirth: {
            type: DataTypes.DATE,
            allowNull: true
        },
        Email: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        PhoneNumber: {
            type: DataTypes.STRING(9)
        },
        ProfilePicture: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        AddressID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ProfessionalSummary: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        CurrentJobPositionID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        CurrentJobPositionDescription: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        Skills: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        ProfilePictureURL: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        }
    }, {
        tableName: "profile",
        timestamps: false
    });

    Profile.associate = (models) => {
        Profile.belongsTo(models.Address, {
            foreignKey: 'AddressID'
        })
        Profile.belongsTo(models.JobPosition, {
            foreignKey: 'CurrentJobPositionID',
            as: "JobPosition"
        });
        Profile.hasMany(models.UserLanguage, {
            foreignKey: 'ProfileID',
            as: "Languages"
        });
        Profile.hasMany(models.UserLinks, {
            foreignKey: "ProfileID",
            as: "Services",
            allowNull: true,
        })
        Profile.hasMany(models.UserWithCompany, {
            foreignKey: "ProfileID",
            as: "Companies",
        })
        Profile.hasMany(models.Education, {
            foreignKey: "ProfileID",
            allowNull: true
        })
        Profile.hasMany(models.Course, {
            foreignKey: "ProfileID",
            as: "Course"
        })
    }

    return Profile;
};