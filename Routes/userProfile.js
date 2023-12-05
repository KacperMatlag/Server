const express = require('express');
const router = express.Router();
const { User, Profile } = require('../models');

router.get("/", async (req, res) => {
    try {
        // Pobierz wszystkich użytkowników wraz z ich profilami
        const usersWithProfiles = await User.findAll({
            include: Profile
        });

        res.json(usersWithProfiles);
    } catch (error) {
        console.error('Error fetching users and profiles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;