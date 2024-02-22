const express = require('express');
const router = express.Router();
const { Profile } = require('../models');
const chalk = require('chalk');
const { JobPosition } = require("./JobPositions")


router.post("/", async (req, res) => {
    const profile = req.body;
    const newProfile = await Profile.create(profile);
    res.status(201).json(newProfile);
});

router.patch("/update", async (req, res) => {
    const profileId = req.body.ID;
    const updatedProfileData = req.body;
    try {
        const existingProfile = await Profile.findByPk(profileId);
        if (!existingProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        existingProfile.set(updatedProfileData);
        const updatedProfile = await existingProfile.save();
        res.status(200).json({ profile: updatedProfile }); // Zmieniono status na 200
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Failed to update profile" });
    }
});

router.post("/updatecurrentjob", async (req, res) => {
    try {
        const { ID, JobPosition, JobDescription } = req.body;
        const existingProfile = await Profile.findByPk(ID);
        if (!existingProfile) return res.status(401).json({ message: "Unauthorized" })
        existingProfile.CurrentJobPositionID = JobPosition;
        existingProfile.CurrentJobPositionDescription = JobDescription;
        const updateProfile = await existingProfile.save();
        res.status(200).json(updateProfile);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
        console.log(error);
    }
})


module.exports = router;