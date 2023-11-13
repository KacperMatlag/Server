const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
const db = require("./models");
//Routers
const JobPositionsRouter = require('./Routes/JobPositions');
app.use("/jobpositions", JobPositionsRouter);
const CompanyRouter = require("./Routes/Company");
app.use("/company", CompanyRouter);
const userProfile = require("./Routes/userProfile");
app.use("/userProfile", userProfile);
const WorkCategory = require('./Routes/workCategory');
app.use("/workCategory",WorkCategory);
const Announcement=require('./Routes/Announcement');
app.use('/announcement',Announcement);
const CategoryWithPosition=require('./Routes/CategoryWithPosition');
app.use('/cwp',CategoryWithPosition);
const JobLevel=require('./Routes/Joblevel');
app.use('/JobLevel',JobLevel);
const TypeOfContract=require('./Routes/TypeOfContract');
app.use('/TypeOfContract',TypeOfContract);
const WorkingTime=require('./Routes/WorkingTime');
app.use('/WorkingTime',WorkingTime);
const WorkType=require('./Routes/WorkType');
app.use('/worktype',WorkType);
db.sequelize.sync().then(() => {
    app.listen(2137, () => {
        console.log("Server listen on 2137!");
    })
})