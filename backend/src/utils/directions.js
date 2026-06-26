// Converts turn angles into human-readable directions
// Returns structured data with action, text, and icon

function getTurnInstruction(turnAngle) {
  const absAngle = Math.abs(turnAngle);

  if (absAngle < 15) {
    return {
      action: "continue_straight",
      icon: "arrow-up",
      text: "Continue straight",
      severity: "none"
    };
  }

  if (absAngle < 45) {
    if (turnAngle > 0) {
      return {
        action: "slight_right",
        icon: "arrow-up-right",
        text: "Slight right",
        severity: "slight"
      };
    }
    return {
      action: "slight_left",
      icon: "arrow-up-left",
      text: "Slight left",
      severity: "slight"
    };
  }

  if (absAngle < 120) {
    if (turnAngle > 0) {
      return {
        action: "turn_right",
        icon: "arrow-right",
        text: "Turn right",
        severity: "normal"
      };
    }
    return {
      action: "turn_left",
      icon: "arrow-left",
      text: "Turn left",
      severity: "normal"
    };
  }

  if (turnAngle > 0) {
    return {
      action: "sharp_right",
      icon: "arrow-down-right",
      text: "Sharp right",
      severity: "sharp"
    };
  }

  return {
    action: "sharp_left",
    icon: "arrow-down-left",
    text: "Sharp left",
    severity: "sharp"
  };
}

// Generate natural language instruction
function buildInstructionText(turn, distance, nextLocation) {
  if (turn.action === "continue_straight") {
    return `Continue straight for ${distance} towards ${nextLocation}`;
  }
  return `${turn.text} towards ${nextLocation}`;
}

module.exports = {
  getTurnInstruction,
  buildInstructionText
};
