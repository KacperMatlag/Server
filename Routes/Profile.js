const express = require('express');
const router = express.Router();
const { Profile, Address } = require('../models');
const chalk = require('chalk');
const { upload } = require("../Multer/upload")


router.post("/", async (req, res) => {
    const profile = req.body;
    const newProfile = await Profile.create(profile);
    res.status(201).json(newProfile);
});

router.get('/RemoveAvatar/:id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            where: {
                ID: req.query.id,
            }
        })
        profile.ProfilePictureURL = null;
        profile.save();
        res.status(200).json(profile);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Failed to update profile" });
    }
})

router.patch("/update", upload.single("files"), async (req, res) => {
    const profileId = req.body.ID;
    const updatedProfileData = req.body;
    try {
        const existingProfile = await Profile.findByPk(profileId);
        if (!existingProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        existingProfile.set(updatedProfileData);
        if (req.file) {
            const fullProfilePictureURL = `http://localhost:2137/uploads/${req.file.filename}`;
            existingProfile.ProfilePictureURL = fullProfilePictureURL;
        }
        const updatedProfile = await existingProfile.save();
        res.status(200).json(updatedProfile);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Failed to update profile" });
    }
});


router.post("/updatecurrentjob", async (req, res) => {
    try {
        const { ID, JobPosition, JobDescription } = req.body;
        const existingProfile = await Profile.findByPk(ID);
        // return console.log(chalk.red(JSON.stringify(req.body)));
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


router.post("/updateAddress", async (req, res) => {
    try {
        const exist = await Address.findOne({
            where: {
                Address: req.body.Address.Address
            }
        })
        const existingProfile = await Profile.findByPk(req.body.ProfileID);
        if (!existingProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        if (exist) {
            existingProfile.AddressID = exist.ID;
        } else {
            const createdAddress = await Address.create(req.body.Address);
            existingProfile.AddressID = createdAddress.ID;
        }
        existingProfile.save();
        res.status(200)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
        console.log(error);
    }
})

module.exports = router;