// src/app.js
const express = require("express");
const cors = require("cors");
const itemRoutes = require("./api/routes/items");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/items", itemRoutes);

module.exports = app;
