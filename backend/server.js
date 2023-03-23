const express = require('express');
const app = express();
require('dotenv').config();
require("./config/db");
const cors = require('cors');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Les routes de l'appli
const universeRoutes = require('./routes/universe');
app.use('/api/universes', universeRoutes);
const questRoutes = require('./routes/quests');
app.use('/api/quests', questRoutes);

app.listen(3000);