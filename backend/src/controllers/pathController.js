// src/controllers/pathController.js

const buildGraph = require("../utils/buildGraph");
const dijkstra = require("../algorithms/dijkstra");
const campusData = require("../utils/campusData");

const getShortestPath = (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "Please provide 'from' and 'to' query parameters"
      });
    }

    const graph = buildGraph();

    if (!graph[from] || !graph[to]) {
      return res.status(404).json({
        success: false,
        message: "Invalid location ID provided"
      });
    }

    const result = dijkstra(graph, from, to);

    const locationMap = {};
    campusData.forEach(loc => {
      locationMap[loc.id] = loc;
    });

    const detailedPath = result.path.map(id => ({
      id,
      name: locationMap[id]?.name,
      type: locationMap[id]?.type,
      lat: locationMap[id]?.lat,
      lng: locationMap[id]?.lng
    }));

    res.status(200).json({
      success: true,
      from: locationMap[from]?.name,
      to: locationMap[to]?.name,
      totalDistance: `${result.distance.toFixed(2)} meters`,
      steps: result.path.length - 1,
      path: detailedPath
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error calculating path",
      error: error.message
    });
  }
};

module.exports = { getShortestPath };