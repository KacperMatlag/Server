const express = require('express');
const router = express.Router();
const axios = require("axios");
const { Op, Sequelize } = require('sequelize');
const {
    Announcement,
    JobPosition,
    WorkCategory,
    Company,
    JobLevel,
    TypeOfContract,
    WorkingTime,
    WorkType,
    Duties,
    Requirements,
    WhatTheEmployerOffers
} = require('../models');
const chalk = require('chalk');

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
        as: 'Company'
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

]
const commonAtributes = [
    'ID',
    'Title',
    'Description',
    'JobPositionID',
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
router.get('/', async (req, res) => {
    try {
        const announcements = await Announcement.findAll({
            include: commonIncludes,
            attributes: commonAtributes,
        });
        res.status(200).json(announcements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/filter', async (req, res) => {
    try {
        let filterOptions = {};

        if (req.query.JobPositionID) {
            filterOptions['JobPositionID'] = req.query.JobPositionID;
        }

        if (req.query.WorkCategoryID) {
            filterOptions['WorkCategoryID'] = req.query.WorkCategoryID;
        }

        if (req.query.JobLevelID) {
            filterOptions['JobLevelID'] = req.query.JobLevelID;
        }

        if (req.query.TypeOfContractID) {
            filterOptions['TypeOfContractID'] = req.query.TypeOfContractID;
        }

        if (req.query.WorkingTimeID) {
            filterOptions['WorkingTimeID'] = req.query.WorkingTimeID;
        }

        if (req.query.WorkTypeID) {
            filterOptions['WorkTypeID'] = req.query.WorkTypeID;
        }

        if (req.query.CompanyID) {
            filterOptions['CompanyID'] = req.query.CompanyID;
        }

        if (req.query.Title) {
            filterOptions['Title'] = {
                [Op.like]: `%${req.query.Title}%`
            };
        }

        if (req.query.MinWage) {
            filterOptions['MinWage'] = {
                [Op.gte]: req.query.MinWage,
            };
        }

        if (req.query.MaxWage) {
            filterOptions['MaxWage'] = {
                [Op.lte]: req.query.MaxWage,
            };
        }

        const announcements = await Announcement.findAll({
            where: filterOptions,
            include: commonIncludes,
            attributes: commonAtributes,
        });

        res.status(200).json(announcements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/random', async (req, res) => {

    const announcements = await Announcement.findOne({
        limit: 1,
        include: commonIncludes,
        attributes: commonAtributes,
        where: {
            expirationDate: {
                [Op.gte]: 0,
            },
        },
        order: [[Sequelize.literal('RAND()')]]
    });

    res.json(announcements);
})
router.get('/getCount', async (req, res) => {
    try {
        const countOfAnnouncements = await Announcement.count({
            include: commonIncludes,
            attributes: commonAtributes,
            where: {
                expirationDate: {
                    [Op.gte]: 0,
                },
            },
        });

        res.status(200).json({ count: countOfAnnouncements });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.get('/latest', async (req, res) => {
    console.log(chalk.red(JSON.stringify(req.session)));
    const announcements = await Announcement.findAll({
        include: commonIncludes,
        attributes: commonAtributes,
        where: {
            expirationDate: {
                [Op.gte]: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        },
        order: [['createdAt', 'DESC']],
        limit: 5,
    });
    res.json(announcements);
}
);
router.get('/:id', async (req, res) => {
    try {
        const announcement = await Announcement.findByPk(req.params.id, {
            include: commonIncludes,
            attributes: commonAtributes
        });
        if (!announcement) {
            res.status(404).json({ error: 'Resource not found' });
            return;
        }

        res.status(200).json(announcement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post("/", async (req, res) => {
    try {
        const announcement = await Announcement.create(req.body);
        res.status(201).json(announcement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;