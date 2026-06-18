// src/components/MapLegend.js

import React from 'react';

const typeColors = {
  gate: '#ef4444',
  building: '#2563eb',
  cafeteria: '#f59e0b',
  lab: '#8b5cf6',
  parking: '#6b7280',
  other: '#10b981'
};

const MapLegend = () => {
  return (
    <div className="map-legend">
      <h4>📍 Legend</h4>
      <div className="legend-items">
        {Object.entries(typeColors).map(([type, color]) => (
          <div key={type} className="legend-item">
            <div
              className="legend-dot"
              style={{ background: color }}
            />
            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </div>
        ))}
        <div className="legend-item">
          <div className="legend-line" />
          <span>Shortest Path</span>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;