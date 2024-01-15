const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User, Profile } = require('../models');
const axios = require('axios');
const chalk = require('chalk');
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const store = require("../sessionStorageMYSQL/sessionStorage");


const commonAtributes = [
  "ID",
  "Login",
  "ProfileID",
]
const commonIncludes = [
  {
    model: Profile,
    as: "Profile"
  }
]


router.get("/", async (req, res) => {
  try {
    res.status(200).json(await User.findAll({
      attributes: commonAtributes,
      include: commonIncludes,
    }));
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
})

router.post("/", async (req, res) => {
  try {
    const { Login, Password, ProfileID, Name, Surname, Email } = req.body;
    const user = { Login, Password, ProfileID };
    const existingUser = await doesUserExistByLogin(user.Login);
    if (existingUser) {
      return res.status(400).json({ error: 'Użytkownik o podanym loginie już istnieje.' });
    }
    const Profile = { Name, Surname, Email };
    const resultData = await axios.post('http://localhost:2137/profile/', Profile);
    user.ProfileID = resultData.data.ID;
    const salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(user.Password, salt);
    await User.create(user);
    res.status(201).json(user);
  } catch (error) {
    console.error("Błąd podczas rejestracji:", error);
    res.status(500).json({ error: "Wystąpił błąd podczas rejestracji." });
  }
})

router.post("/Login", async (req, res) => {
  try {
    const { Login, Password } = req.body;
    const user = await User.findOne({ where: { Login: Login } });
    if (!user) {
      return res.status(401).json({ error: 'Nieprawidłowy login lub hasło' });
    }
    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Nieprawidłowy login lub hasło' });
    }

    const loginUser = await User.findOne({
      where: { Login: Login },
      include: commonIncludes,
      attributes: commonAtributes
    });

    req.session.user = loginUser;
    req.session.save();

    res.status(200).json(
      loginUser
    );
  } catch (error) {
    console.error('Błąd podczas logowania:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

router.get("/check", (req, res) => {
  res.json(req.session)
})

router.get('/logout', (req, res) => {
  if (req.session && req.session.user) {
    const sessionId = req.sessionID;
    store.destroy(sessionId, (err) => {
      if (err) {
        console.error('Error during session deletion:', err);
        res.status(500).json({ error: 'Server error' });
      } else {
        res.clearCookie('connect.sid');
        req.session.destroy((err) => {
          if (err) {
            console.error('Error during session data deletion:', err);
            res.status(500).json({ error: 'Server error' });
          } else {
            res.status(200).json({ message: 'Logout successful' });
          }
        });
      }
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

const doesUserExistByLogin = async (login) => {
  try {
    const response = await User.findOne({
      where: { Login: login }
    })
    return response;
  } catch (error) {
    console.error("Błąd podczas sprawdzania istnienia użytkownika:", error);
    return false;
  }
};

module.exports = router;