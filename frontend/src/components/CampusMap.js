// src/components/CampusMap.js

import React, { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from 'react-leaflet';
import L from 'leaflet';

// ─── Fix Leaflet default icon ─────────────────────
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// ─── Color by location type ───────────────────────
const typeColors = {
  gate: '#ef4444',        // red
  building: '#2563eb',    // blue
  cafeteria: '#f59e0b',   // yellow
  lab: '#8b5cf6',         // purple
  parking: '#6b7280',     // gray
  other: '#10b981'        // green
};

// ─── Custom colored marker ────────────────────────
const createColoredIcon = (color) => {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 16px;
        height: 16px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.4);
      "></div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10]
  });
};

// ─── Auto fit map to path ─────────────────────────
const FitBounds = ({ positions }) => {
  const map = useMap();
  useEffect(() => {
    if (positions && positions.length > 0) {
      map.fitBounds(positions, { padding: [50, 50] });
    }
  }, [positions, map]);
  return null;
};

// ─── Main Map Component ───────────────────────────
const CampusMap = ({ locations, path }) => {

  // Center of campus
  const center = [17.4451, 78.4952];

  // Path coordinates for polyline
  const pathCoordinates = path
    ? path.map(loc => [loc.lat, loc.lng])
    : [];

  return (
    <MapContainer
      center={center}
      zoom={15}
      style={{ height: '500px', width: '100%', borderRadius: '12px' }}
    >
      {/* Map tiles */}
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Auto fit to path */}
      {pathCoordinates.length > 0 && (
        <FitBounds positions={pathCoordinates} />
      )}

      {/* All location markers */}
      {locations.map(location => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          icon={createColoredIcon(typeColors[location.type] || '#333')}
        >
          <Popup>
            <div style={{ minWidth: '150px' }}>
              <strong style={{ fontSize: '1rem' }}>
                {location.name}
              </strong>
              <br />
              <span style={{
                fontSize: '0.8rem',
                background: typeColors[location.type],
                color: 'white',
                padding: '2px 8px',
                borderRadius: '4px',
                marginTop: '4px',
                display: 'inline-block'
              }}>
                {location.type}
              </span>
              <br />
              <small style={{ color: '#888', marginTop: '4px', display: 'block' }}>
                ID: {location.id}
              </small>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Draw path as polyline */}
      {pathCoordinates.length > 1 && (
        <Polyline
          positions={pathCoordinates}
          color="#2563eb"
          weight={4}
          opacity={0.8}
          dashArray="10, 5"
        />
      )}

      {/* Start marker (green) */}
      {pathCoordinates.length > 0 && (
        <Marker
          position={pathCoordinates[0]}
          icon={createColoredIcon('#10b981')}
        >
          <Popup>
            <strong>🟢 Start: {path[0].name}</strong>
          </Popup>
        </Marker>
      )}

      {/* End marker (red) */}
      {pathCoordinates.length > 1 && (
        <Marker
          position={pathCoordinates[pathCoordinates.length - 1]}
          icon={createColoredIcon('#ef4444')}
        >
          <Popup>
            <strong>🔴 End: {path[path.length - 1].name}</strong>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default CampusMap;