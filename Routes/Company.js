const express = require('express');
const router = express.Router();
const { Company, Address, UserWithCompany } = require('../models');
const chalk = require('chalk');
const { upload } = require("../Multer/upload")

const commonIncludes = [
    {
        model: Address
    }
]

router.get("/", async (req, res) => {
    res.json(await Company.findAll({
        include: commonIncludes
    }));
});

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

module.exports = router;