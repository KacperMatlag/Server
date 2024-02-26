const express = require('express');
const { Languages, UserLanguage } = require('../models');
const chalk = require("chalk")
const router = express.Router();


router.get("/", async (req, res) => {
    try {
        res.status(200).json(await Languages.findAll(
            {
                order: [
                    ['Name', 'ASC']
                ]
            }
        ));
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
        console.log(error);
    }
})

router.get("/:UserID", async (req, res) => {
    try {
        res.status(200).json(await UserLanguage.findAll({
            where: {
                ProfileID: req.params.UserID
            }
        }))
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
        console.log(error);
    }
})

router.post("/", async (req, res) => {
    try {
        res.status(200).json(await UserLanguage.create(req.body));
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
        console.log(error);
    }
})

router.patch("/", async (req, res) => {
    try {
        const { ProfileID, LanguageID, Level } = req.body;
        const toUpdate = await UserLanguage.findOne({
            where: {
                ProfileID: ProfileID,
                LanguageID: LanguageID
            }
        })
        if (!toUpdate) return res.status(404).json({ message: "Not found such as language" })
        toUpdate.Level = Level;
        const updated = await toUpdate.save();
        res.status(200).json({ Language: updated })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
        console.log(error);
    }
})

router.delete("/userLanguage/:id", async (req, res) => {
    try {
        res.status(200).json(await UserLanguage.destroy({
            where: {
                ID: req.params.id
            }
        }));
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
        console.log(error);
    }
})

const languageCheck = async (language, _userID) => {
    try {
        const ll = await UserLanguage.findAll({
            where: {
                LanguageID: language,
                UserID: _userID
            }
        })
        return ll;

    } catch (error) {
        console.log(error);
    }
}


module.exports = router;