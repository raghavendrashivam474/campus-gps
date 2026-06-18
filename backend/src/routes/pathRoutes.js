// src/routes/pathRoutes.js

const express = require("express");
const router = express.Router();
const { getShortestPath } = require("../controllers/pathController");

// GET /api/path?from=A1&to=A5
router.get("/", getShortestPath);

module.exports = router;