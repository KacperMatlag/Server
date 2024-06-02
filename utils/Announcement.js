const { JobPosition,
    Announcement,
    WorkCategory,
    Company,
    JobLevel,
    TypeOfContract,
    WorkingTime,
    WorkType,
    Duties,
    Requirements,
    WhatTheEmployerOffers,
    Address,
    Application } = require("../models")
const { Op, Sequelize } = require("sequelize");
const commonIncludes = [
    {
        model: JobPosition,
        as: 'JobPosition'
    },
    {
        model: WorkCategory,
        as: 'WorkCategory'
    },
    {
        model: Company,
        as: 'Company',
        include: [
            {
                model: Address
            }
        ]
    },
    {
        model: JobLevel,
        as: 'JobLevel'
    },
    {
        model: TypeOfContract,
        as: 'TypeOfContract'
    },
    {
        model: WorkingTime,
        as: "WorkingTime"
    },
    {
        model: WorkType,
        as: "WorkType"
    },
    {
        model: Duties,
        as: "Duties"
    },
    {
        model: Requirements,
        as: "Requirements"
    },
    {
        model: WhatTheEmployerOffers,
        as: "WhatTheEmployerOffers"
    },
    {
        model: Application,
        as: "Applications"
    }

]
const commonAtributes = [
    'ID',
    'Title',
    'Description',
    'JobPositionID',
    'CompanyID',
    'WorkCategoryID',
    'JobLevelID',
    'TypeOfContractID',
    'WorkingTimeID',
    'WorkTypeID',
    'WorkCategoryID',
    'MinWage',
    'MaxWage',
    'CreatedAt',
    'ExpirationDate',
    [
        // Calculate the number of days since the announcement date
        Announcement.sequelize.literal('DATEDIFF(NOW(), Announcement.createdAt)'),
        'daysSincePosted',
    ],
    [
        // Calculate the number of days until expiration (assuming you have an expiration date field)
        Announcement.sequelize.literal('DATEDIFF(Announcement.expirationDate, NOW())'),
        'daysUntilExpiration',
    ],
    [
        Announcement.sequelize.literal('RAND()'), 'randomID',
    ],
]

const commonWhere = {
    expirationDate: {
        [Op.gte]: Sequelize.literal('NOW()')
    }
};

const pageCount = 10;

module.exports = { commonAtributes, commonIncludes, commonWhere, pageCount }