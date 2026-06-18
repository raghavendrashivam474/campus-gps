// src/routes/locationRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAllLocations,
  getLocationById
} = require("../controllers/locationController");

// GET /api/locations       → All locations
// GET /api/locations/:id   → Single location
router.get("/", getAllLocations);
router.get("/:id", getLocationById);

module.exports = router;