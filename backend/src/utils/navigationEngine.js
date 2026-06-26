// Navigation Engine - orchestrates all navigation calculations
// Takes a path array and returns rich navigation data

const haversine = require("./haversine");
const {
  calculateBearing,
  bearingToCompass,
  calculateTurnAngle
} = require("./bearing");
const {
  getTurnInstruction,
  buildInstructionText
} = require("./directions");
const {
  calculateWalkingTime,
  calculateArrivalTime
} = require("./walkingTime");

function formatDistance(meters) {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(2)} km`;
  }
  return `${meters.toFixed(0)} m`;
}

function buildNavigation(pathLocations) {
  if (!pathLocations || pathLocations.length === 0) {
    return null;
  }

  const instructions = [];
  let totalDistance = 0;
  const bearings = [];

  // Step 1: Calculate distance + bearing for each segment
  for (let i = 0; i < pathLocations.length - 1; i++) {
    const current = pathLocations[i];
    const next = pathLocations[i + 1];

    const distance = haversine(
      current.lat,
      current.lng,
      next.lat,
      next.lng
    );

    const bearing = calculateBearing(
      current.lat,
      current.lng,
      next.lat,
      next.lng
    );

    bearings.push({ distance, bearing });
    totalDistance += distance;
  }

  // Step 2: Build instruction for each stop
  for (let i = 0; i < pathLocations.length; i++) {
    const location = pathLocations[i];

    // First stop - starting point
    if (i === 0) {
      const firstBearing = bearings[0]?.bearing || 0;
      const compass = bearingToCompass(firstBearing);

      instructions.push({
        stepNumber: i + 1,
        location: {
          id: location.id,
          name: location.name,
          type: location.type,
          lat: location.lat,
          lng: location.lng
        },
        instruction: {
          action: "start",
          icon: compass.icon,
          text: `Head ${compass.dir}`,
          severity: "none"
        },
        distance: {
          toNext: formatDistance(bearings[0]?.distance || 0),
          toNextRaw: bearings[0]?.distance || 0
        },
        compass: compass.dir,
        bearing: firstBearing
      });
      continue;
    }

    // Last stop - destination
    if (i === pathLocations.length - 1) {
      instructions.push({
        stepNumber: i + 1,
        location: {
          id: location.id,
          name: location.name,
          type: location.type,
          lat: location.lat,
          lng: location.lng
        },
        instruction: {
          action: "arrived",
          icon: "flag",
          text: "You have arrived",
          severity: "none"
        },
        distance: {
          fromPrev: formatDistance(bearings[i - 1].distance),
          fromPrevRaw: bearings[i - 1].distance
        }
      });
      continue;
    }

    // Middle stops - calculate turn
    const bearingIn = bearings[i - 1].bearing;
    const bearingOut = bearings[i].bearing;
    const turnAngle = calculateTurnAngle(bearingIn, bearingOut);
    const turn = getTurnInstruction(turnAngle);
    const nextLocation = pathLocations[i + 1].name;
    const text = buildInstructionText(
      turn,
      formatDistance(bearings[i].distance),
      nextLocation
    );

    instructions.push({
      stepNumber: i + 1,
      location: {
        id: location.id,
        name: location.name,
        type: location.type,
        lat: location.lat,
        lng: location.lng
      },
      instruction: {
        action: turn.action,
        icon: turn.icon,
        text: text,
        severity: turn.severity
      },
      distance: {
        fromPrev: formatDistance(bearings[i - 1].distance),
        fromPrevRaw: bearings[i - 1].distance,
        toNext: formatDistance(bearings[i].distance),
        toNextRaw: bearings[i].distance
      },
      turnAngle: turnAngle,
      bearing: bearingOut
    });
  }

  // Step 3: Calculate summary
  const walkingTime = calculateWalkingTime(totalDistance);
  const arrivalTime = calculateArrivalTime(walkingTime.minutes);

  return {
    summary: {
      totalDistance: formatDistance(totalDistance),
      totalDistanceRaw: totalDistance,
      walkingTime: walkingTime.formatted,
      walkingSpeed: walkingTime.speed,
      stops: pathLocations.length,
      steps: pathLocations.length - 1,
      estimatedArrival: arrivalTime
    },
    instructions: instructions
  };
}

module.exports = { buildNavigation };
