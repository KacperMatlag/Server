const express = require('express');
const router = express.Router();
const { Address } = require('../models');


router.get("/", async (req, res) => {
    try {
        res.status(200).json(await Address.findAll())
    } catch (error) {
        res.status(500).json({ msg: "Intgernal server error" })
        console.log(error);
    }
})

module.exports = router;