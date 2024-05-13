const express = require('express');
const router = express.Router();
const { Op, Sequelize, where, } = require('sequelize');
const {
    Announcement,
    UserWithCompany,
    Duties,
    Requirements,
    WhatTheEmployerOffers
} = require('../models');
const chalk = require('chalk');
const {
    commonAtributes,
    commonIncludes,
    commonWhere,
    pageCount
} = require('../utils/Announcement');


router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * page;
        const totalAnnouncementsCount = await Announcement.count({
            where: { ...commonWhere }
        });
        const lastPage = Math.ceil(totalAnnouncementsCount / pageCount);
        const announcements = await Announcement.findAll({
            offset,
            limit: pageCount,
            include: commonIncludes,
            attributes: commonAtributes,
            where: { ...commonWhere }
        });
        res.status(200).json({
            page: page,
            maxPage: lastPage,
            data: announcements
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/filter', async (req, res) => {
    try {
        const filter = {
            JobPositionID: req.query.JobPositionID,
            WorkCategoryID: req.query.WorkCategoryID,
            JobLevelID: req.query.JobLevelID,
            TypeOfContractID: req.query.TypeOfContractID,
            WorkingTimeID: req.query.WorkingTimeID,
            WorkTypeID: req.query.WorkTypeID,
            CompanyID: req.query.CompanyID,
            Title: {
                [Op.like]: `%${req.query.Title ?? ""}%`
            },
        }

        const filterOptions = Object.fromEntries(
            Object.entries(filter).filter(([key, value]) => value !== "" && value !== undefined && value !== null)
        );

        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * pageCount;

        //console.log(chalk.red(JSON.stringify(`%${req.query.Title}%`)));

        const announcements = await Announcement.findAll({
            offset,
            limit: pageCount,
            where: { ...filterOptions, ...commonWhere },
            include: commonIncludes,
            attributes: commonAtributes,
        });


        const totalAnnouncementsCount = await Announcement.count({
            where: { ...filterOptions, ...commonWhere }
        });

        const lastPage = Math.ceil(totalAnnouncementsCount / pageCount);

        res.status(200).json({
            page: page,
            maxPage: lastPage,
            data: announcements
        });
    } catch (error) {
        console.error(chalk.red(JSON.stringify(error)));
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/userCompanies/:profileID', async (req, res) => {
    try {
        const profileID = req.params.profileID;
        const companies = await UserWithCompany.findAll({
            where: {
                ProfileID: profileID
            },
            attributes: ["CompanyID"]
        })
        const companyIDs = companies.map(c => c.CompanyID)
        const announcements = await Announcement.findAll({
            where: {
                CompanyID: {
                    [Op.in]: companyIDs
                }
            },
            attributes: commonAtributes,
            include: commonIncludes
        })
        res.status(200).json(announcements);
    } catch (error) {
        console.error(chalk.red(JSON.stringify(error)));
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/random', async (req, res) => {

    const announcements = await Announcement.findOne({
        limit: 1,
        include: commonIncludes,
        attributes: commonAtributes,
        where: commonWhere,
        order: [[Sequelize.literal('RAND()')]]
    });

    res.status(200).json(announcements);
})
router.get('/getCount', async (req, res) => {
    try {
        const countOfAnnouncements = await Announcement.count({
            where: commonWhere,
        });

        res.status(200).json(countOfAnnouncements);
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
        where: commonWhere,
        order: [['createdAt', 'DESC']],
        limit: 5,
    });

    res.json(announcements);
});
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
        await Duties.bulkCreate(req.body.Duties?.map(z => {
            return { Name: z, AnnouncementID: announcement.ID }
        }))
        await Requirements.bulkCreate(req.body.Requirements?.map(z => {
            return { Name: z, AnnouncementID: announcement.ID }
        }))
        await WhatTheEmployerOffers.bulkCreate(req.body.EmploeyOffers?.map(z => {
            return { Name: z, AnnouncementID: announcement.ID }
        }))
        res.status(201).json(announcement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.patch("/", async (req, res) => {
    try {
        const announcementId = req.body.ID;
        const announcement = await Announcement.findByPk(announcementId);

        if (!announcement) {
            return res.status(404).json({ error: "Announcement not found" });
        }

        await announcement.update(req.body);

        if (req.body.Duties) {
            const existingDuties = await Duties.findAll({ where: { AnnouncementID: announcementId } });
            const newDuties = req.body.Duties;

            await Promise.all(existingDuties.map(async (existingDuty) => {
                if (!newDuties.includes(existingDuty.Name)) {
                    await existingDuty.destroy();
                }
            }));

            const dutiesToAdd = newDuties.filter(duty => !existingDuties.some(existingDuty => existingDuty.Name === duty));
            await Duties.bulkCreate(dutiesToAdd.map(duty => ({ Name: duty, AnnouncementID: announcementId })));
        }

        if (req.body.Requirements) {
            const existingRequirements = await Requirements.findAll({ where: { AnnouncementID: announcementId } });
            const newRequirements = req.body.Requirements;

            await Promise.all(existingRequirements.map(async (existingRequirement) => {
                if (!newRequirements.includes(existingRequirement.Name)) {
                    await existingRequirement.destroy();
                }
            }));

            const requirementsToAdd = newRequirements.filter(requirement => !existingRequirements.some(existingRequirement => existingRequirement.Name === requirement));
            await Requirements.bulkCreate(requirementsToAdd.map(requirement => ({ Name: requirement, AnnouncementID: announcementId })));
        }

        if (req.body.WhatTheEmployerOffers) {
            const existingOffers = await WhatTheEmployerOffers.findAll({ where: { AnnouncementID: announcementId } });
            const newOffers = req.body.WhatTheEmployerOffers;

            await Promise.all(existingOffers.map(async (existingOffer) => {
                if (!newOffers.includes(existingOffer.Name)) {
                    await existingOffer.destroy();
                }
            }));

            const offersToAdd = newOffers.filter(offer => !existingOffers.some(existingOffer => existingOffer.Name === offer));
            await WhatTheEmployerOffers.bulkCreate(offersToAdd.map(offer => ({ Name: offer, AnnouncementID: announcementId })));
        }

        res.status(200).json(announcement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete("/:ID", async (req, res) => {
    try {
        const ID = req.params.ID;
        const toRemove = await Announcement.findByPk(ID);
        if (!toRemove)
            res.status(404).json("Resource not found");
        else {
            await Announcement.destroy({
                where: {
                    ID: ID
                }
            });
            res.status(200).json("Removed succesfuly")
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router;