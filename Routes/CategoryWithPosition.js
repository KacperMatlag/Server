const express = require('express');
const router = express.Router();
const { CategoryWithPosition } = require('../models');
const { commonIncludes } = require("../utils/CategoryWithPosition");
router.get('/', async (req, res) => {
    res.json(await CategoryWithPosition.findAll({
        include: commonIncludes,
    }));
})
router.get('/:id', async (req, res) => {
    res.json(await CategoryWithPosition.findAll({
        where: {
            WorkCategoryID: req.params.id,
        },
        include: commonIncludes
    }));
})

router.get("/category/:id", async (req, res) => {
    try {
        res.status(200).json(await CategoryWithPosition.findOne({
            where: {
                JobPositionID: req.params.id
            },
            include: commonIncludes
        }))
    } catch (error) {
        res.status(500);
        console.log(error);
    }
})
router.get("/position/:id", async (req, res) => {
    try {
        res.status(200).json(await CategoryWithPosition.findAll({
            where: {
                WorkCategoryID: req.params.id
            },
            include: commonIncludes
        }))
    } catch (error) {
        res.status(500);
        console.log(error);
    }
})
module.exports = router;