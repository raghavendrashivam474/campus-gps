import React from "react";

const RouteSummary = ({
  route,
  summary,
  onClose,
  onExpand,
  expanded,
  showExpandBtn = true
}) => {
  if (!route || !summary) return null;

  return (
    <div className="route-summary-card">
      <div className="summary-main">
        <div className="summary-destination">
          <span className="destination-icon">📍</span>
          <div className="destination-info">
            <span className="destination-label">Destination</span>
            <span className="destination-name">{route.to.name}</span>
          </div>
        </div>

        <button className="summary-close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="summary-stats">
        <div className="summary-stat">
          <span className="stat-value">{summary.totalDistance}</span>
          <span className="stat-label">Distance</span>
        </div>
        <div className="stat-divider"></div>
        <div className="summary-stat">
          <span className="stat-value primary">{summary.walkingTime}</span>
          <span className="stat-label">Walking</span>
        </div>
        <div className="stat-divider"></div>
        <div className="summary-stat">
          <span className="stat-value">{summary.estimatedArrival}</span>
          <span className="stat-label">Arrive by</span>
        </div>
        <div className="stat-divider"></div>
        <div className="summary-stat">
          <span className="stat-value">{summary.stops}</span>
          <span className="stat-label">Stops</span>
        </div>
      </div>

      {showExpandBtn && (
        <button className="summary-expand-btn" onClick={onExpand}>
          {expanded ? "Hide directions ▼" : "Show directions ▲"}
        </button>
      )}
    </div>
  );
};

export default RouteSummary;
