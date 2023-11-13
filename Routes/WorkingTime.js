const express = require('express');
const router = express.Router();
const { WorkingTime } = require('../models');

router.get('/',async(req,res)=>{
    res.json(await WorkingTime.findAll());
})

module.exports=router;