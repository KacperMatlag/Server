const express = require('express');
const router = express.Router();
const { CategoryWithPosition,JobPosition,WorkCategory } = require('../models');
const commonIncludes=[
    {
        model: JobPosition,
        as: 'JobPosition',
    },
    {
        model: WorkCategory,
        as: 'WorkCategory',
    }
]
router.get('/',async(req,res)=>{
    res.json(await CategoryWithPosition.findAll({
        include:commonIncludes,
    }));
})
router.get('/:id',async(req,res)=>{
    res.json(await CategoryWithPosition.findAll({
        where:{
            WorkCategoryID:req.params.id,
        },
        include:commonIncludes
    }));
})
module.exports=router;