// src/utils/walkingTime.js

const WALKING_SPEED_KMH = 5; // Average walking speed

const calculateWalkingTime = (distanceInMeters) => {
  const distanceKm = distanceInMeters / 1000;
  const timeInHours = distanceKm / WALKING_SPEED_KMH;
  const timeInMinutes = Math.ceil(timeInHours * 60);

  return {
    minutes: timeInMinutes,
    formatted: `${timeInMinutes} min`,
    speed: `${WALKING_SPEED_KMH} km/h`
  };
};

const calculateArrivalTime = (walkingTimeMinutes) => {
  const now = new Date();
  const arrival = new Date(
    now.getTime() + walkingTimeMinutes * 60000
  );
  return arrival.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
};

module.exports = { calculateWalkingTime, calculateArrivalTime };