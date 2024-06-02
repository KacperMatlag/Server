const express = require('express');
const router = express.Router();
const { Company, Address, UserWithCompany } = require('../models');
const { upload } = require("../Multer/upload")
const { commonIncludes } = require("../utils/Company");
const chalk = require('chalk');

router.get("/", async (req, res) => {
    res.json(await Company.findAll({
        include: commonIncludes
    }));
});

router.get("/:ID", async (req, res) => {
    try {
        res.status(200).json(await Company.findOne({
            where: {
                ID: req.params.ID
            },
            include: [{ model: Address, as: "Address" }]
        }))
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" })
        console.log(error);
    }
})

router.post("/", upload.single("files"), async (req, res) => {
    try {
        const { address, Name, Description, Longitude, Latitude, ProfileID } = req.body;
        const existAddress = await Address.findOne({
            where: {
                Address: address
            }
        })
        const AddressID = existAddress ? existAddress.ID : (await Address.create({ Address: address, Longitude: Longitude, Latitude: Latitude })).ID;
        const Image = req.file ? `http://localhost:2137/uploads/${req.file.filename}` : null;
        const company = { Name: Name, Description: Description, Image: Image, AddressID: AddressID, };
        const insertedCompany = await Company.create(company);
        await UserWithCompany.create({ ProfileID: ProfileID, CompanyID: insertedCompany.ID, HierarchyID: null })
        res.status(200).json(insertedCompany)
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" })
        console.log(error);
    }
});

router.patch("/", upload.single("files"), async (req, res) => {
    try {
        const { Name, Description, ID } = req.body;
        if (!ID) {
            return res.status(400).json({ error: "ID is required" });
        }
        const existing = await Company.findByPk(ID);
        if (!existing) {
            return res.status(404).json({ error: "Company not found" });
        }
        await existing.update({ Name, Description });
        res.status(200).json(existing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:ID", async (req, res) => {
    try {
        const toRemove = await Company.findByPk(req.params.ID);
        if (!toRemove)
            res.status(404).json("Resource not found");
        else {
            await Company.destroy({
                where: {
                    ID: req.params.ID
                }
            })
            res.status(200).json("Removed succesfuly")
        }
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" })
        console.log(error);
    }
})

module.exports = router;