// src/models/Location.js

const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ["building", "gate", "parking", "lab", "cafeteria", "other"],
      default: "other"
    },
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    },
    connectedTo: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Location", LocationSchema);