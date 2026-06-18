// src/algorithms/dijkstra.js

function dijkstra(graph, startNode, endNode) {
  const distances = {};
  const visited = new Set();
  const previous = {};

  // Initialize all distances to Infinity
  Object.keys(graph).forEach(node => {
    distances[node] = Infinity;
    previous[node] = null;
  });

  distances[startNode] = 0;

  while (true) {
    // Find unvisited node with smallest distance
    let closestNode = null;
    Object.keys(distances).forEach(node => {
      if (!visited.has(node)) {
        if (
          closestNode === null ||
          distances[node] < distances[closestNode]
        ) {
          closestNode = node;
        }
      }
    });

    // No reachable node found
    if (closestNode === null) break;

    // Reached destination
    if (closestNode === endNode) break;

    // Skip if unreachable
    if (distances[closestNode] === Infinity) break;

    visited.add(closestNode);

    // Update neighbor distances
    Object.keys(graph[closestNode]).forEach(neighbor => {
      if (!visited.has(neighbor)) {
        const newDistance =
          distances[closestNode] + graph[closestNode][neighbor];

        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = closestNode;
        }
      }
    });
  }

  // Reconstruct path
  const path = [];
  let current = endNode;

  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  // If path doesn't start at startNode = no path found
  if (path[0] !== startNode) {
    return {
      distance: Infinity,
      path: []
    };
  }

  return {
    distance: distances[endNode],
    path
  };
}

module.exports = dijkstra;