module.exports = (sequalize, DataTypes) => {
    const UserLanguage = sequalize.define("UserLanguage", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        LanguageID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Level: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        ProfileID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: "userlanguages",
        timestamps: false,
    })

    UserLanguage.associate = (models) => {
        UserLanguage.belongsTo(models.Languages, {
            foreignKey: "LanguageID",
            as: "Language"
        });
    };


    return UserLanguage;
}