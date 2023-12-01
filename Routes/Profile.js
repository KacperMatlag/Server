const express = require('express');
const router = express.Router();
const { Profile } = require('../models');

router.post("/", async (req, res) => {
    const profile = req.body;
    const newProfile = await Profile.create(profile);
    res.status(201).json(newProfile);
});
module.exports = router;