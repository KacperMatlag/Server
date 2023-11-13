const express = require('express');
const router = express.Router();
const { JobLevel } = require('../models');

router.get('/',async(req,res)=>{
    res.json(await JobLevel.findAll());
})

module.exports = router;