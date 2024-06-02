const {
    Profile,
    JobPosition,
    UserLanguage,
    Languages,
    UserLinks,
    Service,
    UserWithCompany,
    Address,
    Company,
    Education,
    SchoolType,
    Course
} = require('../models');

const { Sequelize } = require('sequelize');

const commonAtributes = [
    "ID",
    "Login",
    "ProfileID",
]
const commonIncludes = [
    {
        model: Profile,
        as: "Profile",
        include: [
            {
                model: UserWithCompany,
                as: "Companies",
                include: [
                    {
                        model: Company,
                        include: [
                            {
                                model: Address
                            }
                        ]
                    }
                ]
            },
            {
                model: JobPosition,
                as: "JobPosition"
            },
            {
                model: UserLinks,
                as: "Services",
                include: [
                    {
                        model: Service,
                        as: "Service"
                    }
                ]
            },
            {
                model: Address
            },
            {
                model: UserLanguage,
                as: "Languages",
                required: false,
                include: [
                    {
                        model: Languages,
                        as: "Language",
                    }
                ]
            },
            {
                model: Education,
                as: "Education",
                include: [
                    {
                        model: SchoolType,
                        as: "schoolType"
                    }
                ],
            },
            {
                model: Course,
                as: "Course"
            }
        ]
    },
];

const commonOrder = [
    [Sequelize.col('Profile.Education.StartDate'), 'ASC'],
    [Sequelize.col('Profile.Course.StartDate'), 'ASC']
];


module.exports = { commonAtributes, commonIncludes, commonOrder }