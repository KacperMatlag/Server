const express = require('express');
const router = express.Router();
const { JobPosition } = require('../models');

router.get("/", async (req, res) => {
    res.json(await JobPosition.findAll());
});

router.post("/", async (req, res) => {
    try {
        const jobPosition = req.body;
        res.json(await JobPosition.create(jobPosition));
    } catch (error) {
        res.status(500).json({error:"Duplicate entry"})
    }
});

module.exports = router;