// src/utils/buildGraph.js

const campusData = require("./campusData");
const haversine = require("./haversine");

function buildGraph() {
  const graph = {};

  // Initialize empty graph for all nodes
  campusData.forEach(location => {
    graph[location.id] = {};
  });

  // Create lookup map
  const locationMap = {};
  campusData.forEach(location => {
    locationMap[location.id] = location;
  });

  // Build BIDIRECTIONAL edges
  campusData.forEach(location => {
    location.connectedTo.forEach(neighborId => {
      const neighbor = locationMap[neighborId];

      if (neighbor) {
        const distance = haversine(
          location.lat,
          location.lng,
          neighbor.lat,
          neighbor.lng
        );

        // A → B
        graph[location.id][neighborId] = distance;

        // B → A (bidirectional)
        graph[neighborId][location.id] = distance;
      }
    });
  });

  return graph;
}

module.exports = buildGraph;