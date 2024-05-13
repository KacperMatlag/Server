const express = require('express');
const router = express.Router();
const { Application, Announcement, Profile } = require("../models");
const commonInclude = [
    {
        model: Announcement,
    },
    {
        model: Profile
    }
]
router.get("/", async (req, res) => {
    try {
        res.status(200).json(await Application.findAll({ include: commonInclude }))
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})

router.get("/:AID/:PID", async (req, res) => {
    try {
        res.status(200).json(await Application.findOne({
            where: {
                ProfileID: req.params.PID,
                AnnouncementID: req.params.AID
            }
        }))
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})



router.get("/:ID", async (req, res) => {
    try {
        res.status(200).json(
            { count: await Application.count() }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})



router.post("/", async (req, res) => {
    try {
        const { ProfileID, AnnouncementID } = req.body;
        const isExisting = await Application.findOne({
            where: {
                ProfileID: ProfileID,
                AnnouncementID: AnnouncementID
            }
        })
        if (isExisting)
            return res.status(409).json({ error: "Conflict" })
        if (!ProfileID || !AnnouncementID)
            return res.status(400).json({ error: "Bad request" })
        const applicationPost = await Application.create(req.body);
        res.status(201).json(applicationPost)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})


router.delete("/:ID", async (req, res) => {
    try {
        res.status(200).json(await Application.destroy({
            where: {
                ID: req.params.ID
            }
        }))
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})
module.exports = router;