import React from "react";

const MapControls = ({ onLocate, onBuildings }) => {
  return (
    <div className="map-controls">
      <button
        className="map-control-btn"
        onClick={onLocate}
        title="Locate me"
      >
        <span className="control-icon">📍</span>
      </button>
      <button
        className="map-control-btn"
        onClick={onBuildings}
        title="Show buildings"
      >
        <span className="control-icon">🏢</span>
      </button>
    </div>
  );
};

export default MapControls;
