// src/controllers/pathController.js

const buildGraph = require("../utils/buildGraph");
const dijkstra = require("../algorithms/dijkstra");
const campusData = require("../utils/campusData");
const haversine = require("../utils/haversine");
const {
  calculateWalkingTime,
  calculateArrivalTime
} = require("../utils/walkingTime");

const getShortestPath = (req, res) => {
  try {
    const { from, to } = req.query;

    // ── Validation ───────────────────────────────
    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "Please provide both 'from' and 'to' parameters",
        example: "/api/path?from=G1&to=O5"
      });
    }

    if (from === to) {
      return res.status(400).json({
        success: false,
        message: "Source and destination cannot be the same"
      });
    }

    // ── Build Graph ──────────────────────────────
    const graph = buildGraph();

    if (!graph[from]) {
      return res.status(404).json({
        success: false,
        message: `Location '${from}' not found`
      });
    }

    if (!graph[to]) {
      return res.status(404).json({
        success: false,
        message: `Location '${to}' not found`
      });
    }

    // ── Run Dijkstra ─────────────────────────────
    const result = dijkstra(graph, from, to);

    if (result.distance === Infinity || result.path.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No route found between '${from}' and '${to}'`
      });
    }

    // ── Location Lookup Map ──────────────────────
    const locationMap = {};
    campusData.forEach(loc => {
      locationMap[loc.id] = loc;
    });

    // ── Build Detailed Path ──────────────────────
    const detailedPath = result.path.map((id, index) => {
      const loc = locationMap[id];

      let segmentDistanceRaw = 0;
      let segmentDistance = "0 m";

      if (index > 0) {
        const prevLoc = locationMap[result.path[index - 1]];
        segmentDistanceRaw = haversine(
          prevLoc.lat,
          prevLoc.lng,
          loc.lat,
          loc.lng
        );
        segmentDistance = segmentDistanceRaw >= 1000
          ? `${(segmentDistanceRaw / 1000).toFixed(2)} km`
          : `${segmentDistanceRaw.toFixed(0)} m`;
      }

      return {
        id: id,
        name: loc?.name || "Unknown",
        type: loc?.type || "other",
        lat: loc?.lat,
        lng: loc?.lng,
        segmentDistance: segmentDistance,
        segmentDistanceRaw: segmentDistanceRaw
      };
    });

    // ── Walking Time ─────────────────────────────
    const walkingTime = calculateWalkingTime(result.distance);
    const arrivalTime = calculateArrivalTime(walkingTime.minutes);

    // ── Format Total Distance ────────────────────
    const formattedDistance = result.distance >= 1000
      ? `${(result.distance / 1000).toFixed(2)} km`
      : `${result.distance.toFixed(0)} m`;

    // ── Final Response ───────────────────────────
    res.status(200).json({
      success: true,
      route: {
        from: {
          id: from,
          name: locationMap[from]?.name,
          type: locationMap[from]?.type
        },
        to: {
          id: to,
          name: locationMap[to]?.name,
          type: locationMap[to]?.type
        }
      },
      summary: {
        totalDistance: formattedDistance,
        totalDistanceRaw: result.distance,
        walkingTime: walkingTime.formatted,
        walkingSpeed: walkingTime.speed,
        stops: result.path.length,
        steps: result.path.length - 1,
        estimatedArrival: arrivalTime
      },
      path: detailedPath
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

module.exports = { getShortestPath };