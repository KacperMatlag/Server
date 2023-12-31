const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
const db = require("./models");
//Routers
const routers = [
  { path: "/jobpositions", router: require("./Routes/JobPositions") },
  { path: "/company", router: require("./Routes/Company") },
  { path: "/userProfile", router: require("./Routes/userProfile") },
  { path: "/workCategory", router: require("./Routes/workCategory") },
  { path: "/announcement", router: require("./Routes/Announcement") },
  { path: "/cwp", router: require("./Routes/CategoryWithPosition") },
  { path: "/JobLevel", router: require("./Routes/Joblevel") },
  { path: "/TypeOfContract", router: require("./Routes/TypeOfContract") },
  { path: "/WorkingTime", router: require("./Routes/WorkingTime") },
  { path: "/worktype", router: require("./Routes/WorkType") },
  { path: "/User", router: require("./Routes/User") },
  { path: "/profile", router: require("./Routes/Profile") },
];

routers.forEach(({ path, router }) => {
  app.use(path, router);
});

db.sequelize.sync().then(() => {
  app.listen(2137, () => {
    console.log("Server listen on 2137!");
  });
});
