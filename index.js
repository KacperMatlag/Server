const express = require("express");
const mysql = require("mysql2")
const cors = require("cors");
const db = require("./models");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const store = require('./sessionStorageMYSQL/sessionStorage')

const app = express();

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 60000 * 30,
    httpOnly: true,
    secure: false
  }
}))
app.use('/uploads', express.static('./uploads'));
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:2137',
    'http://127.0.0.1:2137',
  ],
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'PATCH', 'DELETE'],
  credentials: true
}));

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
  { path: "/duties", router: require("./Routes/Duties") },
  { path: "/requirements", router: require("./Routes/Requirements") },
  { path: "/WhatTheEmployerOffers", router: require("./Routes/WhatTheEmployerOffers") },
  { path: "/Languages", router: require("./Routes/Languages") },
  { path: "/services", router: require("./Routes/Service") },
  { path: "/address", router: require("./Routes/Address") },
];

routers.forEach(({ path, router }) => {
  app.use(path, router);
});

db.sequelize.sync().then(() => {
  app.listen(2137, '0.0.0.0', () => {
    console.log("Server listen on 2137!");
  });
});
