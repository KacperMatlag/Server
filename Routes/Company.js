const express = require('express');
const router = express.Router();
const { Company, Address } = require('../models');

const commonIncludes = [
    {
        model: Address
    }
]

router.get("/", async (req, res) => {
    res.json(await Company.findAll({
        include: commonIncludes
    }));
});

router.post("/", async (req, res) => {
    const company = req.body;
    await Company.create(company);
    res.json(company);
});

module.exports = router;