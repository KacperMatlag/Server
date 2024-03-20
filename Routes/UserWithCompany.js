const express = require('express');
const router = express.Router();
const { UserWithCompany, Company } = require('../models');
const chalk = require('chalk');

const commonIncludes = [
    {
        model: Company,
    }
]

router.get("/owner/:id", async (req, res) => {
    res.json(await UserWithCompany.findAll({
        include: commonIncludes
    }))
})

module.exports = router;