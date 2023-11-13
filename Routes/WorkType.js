const express = require('express');
const router = express.Router();
const { WorkType } = require('../models');

router.get('/',async(req,res)=>{
    res.json(await WorkType.findAll());
})

module.exports = router;