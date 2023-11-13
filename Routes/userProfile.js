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
router.post("/addRandomUser", async (req, res) => {
    try {
        const randomUser = {
            Login: `user${Math.floor(Math.random() * 100)}`,
            Password: `password${Math.floor(Math.random() * 100)}`,
            Profile: {
                Name: 'John',
                Surname: 'Doe',
                DateOfBirth: '1990-01-01',
                Email: 'john.doe@example.com',
                PhoneNumber: '123456789',
                ProfilePicture: 'default.jpg',
                AddressID: 1,
                ProfessionalSummary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            }
        };

        console.log('Attempting to add random user:', randomUser);

        const createdUser = await User.create(randomUser, {
            include: [Profile]
        });

        console.log('Added random user:', createdUser);

        res.json(createdUser);
    } catch (error) {
        console.error('Error adding random user and profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;