const express = require('express');
const { SchoolType } = require('../models');
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        res.status(200).json(await SchoolType.findAll())
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
        console.log(error);
    }
})

module.exports = router;