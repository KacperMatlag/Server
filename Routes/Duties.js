const express = require('express');
const router = express.Router();
const { Duties } = require('../models');

router.get("/", async (req, res) => {
    try {
        res.status(200).json(await Duties.findAll());
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log(error);
    }
})

router.get("/:id", async (req, res) => {
    try {
        res.status(200).json(await Duties.findAll({
            where: {
                AnnouncementID: req.params.id,
            }
        }));
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log(error);
    }
})

router.post("/", async (req, res) => {
    try {
        const duties = req.body;
        const result = [];
        duties.forEach(async e => {
            result.push(await Duties.create(e));
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log(error);
    }
})

module.exports = router;