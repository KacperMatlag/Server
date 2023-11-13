const express = require('express');
const router = express.Router();
const { Company } = require('../models');

router.get("/", async (req, res) => {
    res.json(await Company.findAll());
});

router.post("/", async (req, res) => {
    const company = req.body;
    await Company.create(company);
    res.json(company);
});

module.exports = router;