const express = require('express');
const router = express.Router();
const { Education } = require('../models');
const chalk = require('chalk');
const { where } = require('sequelize');

router.get("/", async (req, res) => {
    try {
        res.status(200).json(await Education.findAll())
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})

router.get("/profile/:ID", async (req, res) => {
    try {
        res.status(200).json(await Education.findAll({
            where: {
                ProfileID: req.params.ID
            }
        }))
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})

router.post("/", async (req, res) => {
    try {
        const result = await Education.create(req.body)
        res.status(201).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})

router.delete("/:ID", async (req, res) => {
    try {
        await Education.destroy({
            where: {
                ID: req.params.ID
            }
        })
        res.status(200).json("ok")
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})

module.exports = router;