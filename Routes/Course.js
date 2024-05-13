const express = require('express');
const router = express.Router();
const { Op, Sequelize, where, } = require('sequelize');
const { Course } = require('../models');

router.get("/", async (req, res) => {
    try {
        res.status(200).json(await Course.findAll());
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post("/", async (req, res) => {
    try {
        const element = await Course.create(req.body);
        res.status(201).json(element)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete("/:ID", async (req, res) => {
    try {
        await Course.destroy({
            where: {
                ID: req.params.ID
            }
        });
        res.status(200).json({ ID: req.params.ID });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;