import React from "react";

const ContextBadge = ({ locationName }) => {
  return (
    <div className="context-badge">
      <span className="context-icon">📍</span>
      <div className="context-info">
        <span className="context-label">Current</span>
        <span className="context-value">
          {locationName || "Main Gate"}
        </span>
      </div>
    </div>
  );
};

export default ContextBadge;
