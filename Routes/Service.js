const express = require('express');
const router = express.Router();
const { Service, UserLinks } = require("../models");

const commonIncludes = [
    {
        model: Service,
        as: "Service"
    }
]

router.get("/services", async (req, res) => {
    try {
        res.status(200).json(await Service.findAll());
    } catch (error) {
        console.error('Error fetching users and profiles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get("/userLinks/:id", async (req, res) => {
    try {
        res.status(200).json(await UserLinks.findAll({
            include: commonIncludes
        }))
    } catch (error) {
        console.error('Error fetching users and profiles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post("/adduserlink", async (req, res) => {
    try {
        const data = req.body;
        res.status(200).json(await UserLinks.create(data));
    } catch (error) {
        console.error('Error fetching users and profiles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete("/deleteuserLink/:ID", async (req, res) => {
    try {
        res.status(200).json(await UserLinks.destroy({
            where: {
                ID: req.params.ID
            }
        }))
    } catch (error) {
        console.error('Error fetching users and profiles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.patch("/updateuserlink", async (req, res) => {
    try {
        const { ProfileID, ServiceID } = req.body;
        const link = await UserLinks.findOne({
            where: {
                ProfileID: ProfileID,
                ServiceID: ServiceID
            }
        })
        const update = link.set(req.body).save();
        res.status(200).json(update)
    } catch (error) {
        console.error('Error fetching users and profiles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;