// src/controllers/locationController.js

const campusData = require("../utils/campusData");

// GET all locations
const getAllLocations = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: campusData.length,
      data: campusData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching locations",
      error: error.message
    });
  }
};

// GET single location by ID
const getLocationById = (req, res) => {
  try {
    const location = campusData.find((loc) => loc.id === req.params.id);

    if (!location) {
      return res.status(404).json({
        success: false,
        message: `Location ${req.params.id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: location
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching location",
      error: error.message
    });
  }
};

module.exports = { getAllLocations, getLocationById };