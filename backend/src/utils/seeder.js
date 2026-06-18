// src/utils/seeder.js

require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
const mongoose = require("mongoose");
const connectDB = require("../database/db");
const Location = require("../models/Location");
const campusData = require("./campusData");

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Location.deleteMany();
    console.log("🗑️  Old data cleared");

    // Insert campus data
    await Location.insertMany(campusData);
    console.log("✅ Campus data seeded successfully!");

    process.exit();
  } catch (error) {
    console.error(`❌ Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();