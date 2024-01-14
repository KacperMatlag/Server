const express = require("express");
const mysql = require("mysql2")
const cors = require("cors");
const db = require("./models");


const app = express();
app.use(express.json());
app.use(cors());
app.set('trust proxy', 1)



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
];

routers.forEach(({ path, router }) => {
  app.use(path, router);
});

db.sequelize.sync().then(() => {
  app.listen(2137, () => {
    console.log("Server listen on 2137!");
  });
});

app.get('/logout', (req, res) => {
  // Sprawdź, czy użytkownik jest zalogowany
  if (req.session && req.session.user) {
    // Pobierz identyfikator sesji
    const sessionId = req.sessionID;

    // Usuń sesję z bazy danych
    sessionStorage.destroy(sessionId, (err) => {
      if (err) {
        console.error('Error during session deletion:', err);
        res.status(500).json({ error: 'Server error' });
      } else {
        // Usuń dane z sesji
        req.session.destroy((err) => {
          if (err) {
            console.error('Error during session data deletion:', err);
            res.status(500).json({ error: 'Server error' });
          } else {
            res.status(200).json({ message: 'Logout successful' });
          }
        });
      }
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});