const express = require('express');
const router = express.Router();
const { Employment } = require('../models');
const chalk = require('chalk');


router.post("/", async (req, res) => {
    try {
        const create = await Employment.create(req.body);
        res.status(201).json(create);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})

router.delete("/:ID", async (req, res) => {
    try {
        await Employment.destroy({
            where: {
                ID: req.params.ID
            }
        })
        req.status(200).json("Succes")
    } catch (error) {

    }
})

module.exports = router;