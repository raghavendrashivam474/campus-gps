// src/app.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();

// const connectDB = require("./database/db"); // ⏸ Skipping DB for now

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});