const express = require('express');
const router = express.Router();
const { WorkCategory } = require('../models');

router.get('/',async (req,res)=>{
    res.json(await WorkCategory.findAll());
})

module.exports = router;