const express = require('express');
const router = express.Router();
const { TypeOfContract } = require('../models');

router.get('/',async(req,res)=>{
    res.json(await TypeOfContract.findAll());
})

module.exports = router;