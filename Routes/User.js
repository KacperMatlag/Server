const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const axios = require('axios');

router.post("/", async (req, res) => {
    try {
        const { Login, Password, ProfileID } = req.body;
        const user = { Login, Password, ProfileID };
        if (doesUserExistByLogin(user.Login)) {
            return res.status(400).json({ error: 'Użytkownik o podanym loginie już istnieje.' });
        }
        const Profile = { Name, Surname, Email };
        const { Name, Surname, Email } = req.body;
        const resultData = await axios.post('http://localhost:2137/profile/', Profile);
        user.ProfileID = resultData.data.ID;
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(user.Password, salt);
        User.create(user);
        res.status(201).json(user);

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', msg: error });
    }
})

router.post("/Login", async (req, res) => {
    try {
        const [Login, Password] = req.body;
        console.log(Login);
        const searchedUser = await User.FindOne({ where: { Login } });
        if (await bcrypt.compare(Password, searchedUser.Password)) {
            if (searchedUser) {
                res.status(200).json(searchedUser);
            } else {
                res.status(404).json({ error: "Not Found" });
            }
        } else {
            res.status(404).json({ error: "Not Found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Error" });
    }
})


const doesUserExistByLogin = async (login) => {
    try {
        const existingUser = await User.findOne({ where: { Login: login } });
        return existingUser !== null;
    } catch (error) {
        console.error('Błąd podczas sprawdzania istnienia użytkownika:', error);
        throw error;
    }
};

module.exports = router;