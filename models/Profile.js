module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define("Profile", {
        Name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Surname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        DateOfBirth: {
            type: DataTypes.DATE
        },
        Email: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        PhoneNumber: {
            type: DataTypes.STRING(9)
        },
        ProfilePicture: {
            type: DataTypes.STRING(500)
        },
        AddressID: {
            type: DataTypes.INTEGER
        },
        ProfessionalSummary: {
            type: DataTypes.STRING(1000)
        },
        CurrentJobPositionID :{
            type: DataTypes.INTEGER,
            allowNull:true,
        },
        CurrentJobPositionDescription:{
            type: DataTypes.STRING(500),
            allowNull:true,
        },
        Skills:{
            type: DataTypes.STRING(1000),
            allowNull:true,
        }
    }, {
        tableName: "profile",
        timestamps: false
    });

    Profile.associate=(models)=>{
        Profile.belongsTo(models.JobPosition,{
            foreignKey: 'CurrentJobPositionID'
        })
    }

    return Profile;
};