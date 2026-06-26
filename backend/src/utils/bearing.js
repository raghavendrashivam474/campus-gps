// Calculates compass bearing between two GPS points
// Returns angle in degrees (0 = North, 90 = East, 180 = South, 270 = West)

function calculateBearing(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const toDeg = (rad) => (rad * 180) / Math.PI;

  const dLng = toRad(lng2 - lng1);
  const lat1Rad = toRad(lat1);
  const lat2Rad = toRad(lat2);

  const y = Math.sin(dLng) * Math.cos(lat2Rad);
  const x =
    Math.cos(lat1Rad) * Math.sin(lat2Rad) -
    Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);

  let bearing = toDeg(Math.atan2(y, x));
  bearing = (bearing + 360) % 360;

  return parseFloat(bearing.toFixed(2));
}

// Convert bearing degree to compass direction (N, NE, E, etc.)
function bearingToCompass(bearing) {
  const compassPoints = [
    { dir: "North", icon: "arrow-up" },
    { dir: "North-East", icon: "arrow-up-right" },
    { dir: "East", icon: "arrow-right" },
    { dir: "South-East", icon: "arrow-down-right" },
    { dir: "South", icon: "arrow-down" },
    { dir: "South-West", icon: "arrow-down-left" },
    { dir: "West", icon: "arrow-left" },
    { dir: "North-West", icon: "arrow-up-left" }
  ];

  const index = Math.round(bearing / 45) % 8;
  return compassPoints[index];
}

// Calculate the turn angle between 3 points
// Negative = turn left, Positive = turn right
function calculateTurnAngle(bearingIn, bearingOut) {
  let diff = bearingOut - bearingIn;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return parseFloat(diff.toFixed(2));
}

module.exports = {
  calculateBearing,
  bearingToCompass,
  calculateTurnAngle
};
