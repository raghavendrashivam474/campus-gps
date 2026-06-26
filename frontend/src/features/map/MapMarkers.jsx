import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const typeColors = {
  gate: "#ef4444",
  building: "#2563eb",
  cafeteria: "#f59e0b",
  lab: "#8b5cf6",
  parking: "#6b7280",
  other: "#10b981"
};

const createIcon = (color, size = 14) => {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
};

const createPulseIcon = (color) => {
  return L.divIcon({
    className: "",
    html: `
      <div style="position: relative; width: 24px; height: 24px;">
        <div style="
          position: absolute;
          inset: 0;
          background: ${color};
          border-radius: 50%;
          opacity: 0.3;
          animation: mapPulse 1.5s infinite;
        "></div>
        <div style="
          position: absolute;
          inset: 6px;
          background: ${color};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        "></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const MapMarkers = ({ locations, route }) => {
  const isStart = (id) => route && route[0]?.id === id;
  const isEnd = (id) =>
    route && route[route.length - 1]?.id === id;

  return (
    <>
      {locations.map((loc) => {
        let icon;
        if (isStart(loc.id)) {
          icon = createIcon("#10b981", 22);
        } else if (isEnd(loc.id)) {
          icon = createPulseIcon("#ef4444");
        } else {
          icon = createIcon(typeColors[loc.type] || "#333", 12);
        }

        return (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={icon}
          >
            <Popup>
              <strong>{loc.name}</strong>
              <br />
              <span style={{ fontSize: "0.75rem", color: "#666" }}>
                {loc.type.toUpperCase()}
              </span>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default MapMarkers;
