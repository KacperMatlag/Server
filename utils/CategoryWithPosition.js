const { JobPosition, WorkCategory } = require('../models');
const commonIncludes = [
    {
        model: JobPosition,
        as: 'JobPosition',
    },
    {
        model: WorkCategory,
        as: 'WorkCategory',
    }
]

module.exports = { commonIncludes }