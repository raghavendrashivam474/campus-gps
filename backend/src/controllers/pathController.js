const buildGraph = require("../utils/buildGraph");
const dijkstra = require("../algorithms/dijkstra");
const campusData = require("../utils/campusData");
const { buildNavigation } = require("../utils/navigationEngine");

const getShortestPath = (req, res) => {
  try {
    const { from, to } = req.query;

    // ── Validation ───────────────────────────
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

    // ── Build Graph ──────────────────────────
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

    // ── Run Dijkstra ─────────────────────────
    const result = dijkstra(graph, from, to);

    if (result.distance === Infinity || result.path.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No route found between '${from}' and '${to}'`
      });
    }

    // ── Map IDs to full location objects ─────
    const locationMap = {};
    campusData.forEach(loc => {
      locationMap[loc.id] = loc;
    });

    const pathLocations = result.path.map(id => locationMap[id]);

    // ── Run Navigation Engine ────────────────
    const navigation = buildNavigation(pathLocations);

    // ── Send Response ────────────────────────
    res.status(200).json({
      success: true,
      route: {
        from: {
          id: from,
          name: locationMap[from].name,
          type: locationMap[from].type
        },
        to: {
          id: to,
          name: locationMap[to].name,
          type: locationMap[to].type
        }
      },
      summary: navigation.summary,
      instructions: navigation.instructions
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
