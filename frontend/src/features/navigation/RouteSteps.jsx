import React from "react";

const DirectionIcon = ({ icon }) => {
  const iconMap = {
    "arrow-up": "↑",
    "arrow-down": "↓",
    "arrow-left": "←",
    "arrow-right": "→",
    "arrow-up-left": "↖",
    "arrow-up-right": "↗",
    "arrow-down-left": "↙",
    "arrow-down-right": "↘",
    "flag": "🏁"
  };
  return <span className="dir-icon">{iconMap[icon] || "•"}</span>;
};

const RouteSteps = ({ instructions }) => {
  if (!instructions || instructions.length === 0) return null;

  return (
    <div className="route-steps-list">
      {instructions.map((step, index) => {
        const isFirst = index === 0;
        const isLast = index === instructions.length - 1;

        return (
          <div key={step.location.id} className="route-step">
            <div className="step-left">
              <div
                className={
                  isFirst
                    ? "step-circle start"
                    : isLast
                    ? "step-circle end"
                    : "step-circle mid"
                }
              >
                <DirectionIcon icon={step.instruction.icon} />
              </div>
              {!isLast && <div className="step-connector" />}
            </div>

            <div className="step-right">
              <div className="step-location-name">
                {step.location.name}
              </div>
              <div className={`step-instruction-text severity-${step.instruction.severity}`}>
                {step.instruction.text}
              </div>
              {step.distance && step.distance.toNext && (
                <div className="step-distance-text">
                  Walk {step.distance.toNext}
                </div>
              )}
              {isLast && step.distance && step.distance.fromPrev && (
                <div className="step-distance-text destination">
                  Final segment: {step.distance.fromPrev}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RouteSteps;
