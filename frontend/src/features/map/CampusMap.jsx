import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMap
} from "react-leaflet";
import L from "leaflet";
import MapMarkers from "./MapMarkers";
import RoutePolyline from "./RoutePolyline";

// Fix default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

// Auto-fit to route
const FitBounds = ({ positions }) => {
  const map = useMap();
  useEffect(() => {
    if (positions && positions.length > 0) {
      map.fitBounds(positions, { padding: [80, 80] });
    }
  }, [positions, map]);
  return null;
};

const CampusMap = ({ locations, route }) => {
  // Default campus center
  const CAMPUS_CENTER = [17.4451, 78.4952];
  const CAMPUS_ZOOM = 16;

  const pathCoordinates = route
    ? route.map((loc) => [loc.lat, loc.lng])
    : [];

  return (
    <div className="campus-map">
      <MapContainer
        center={CAMPUS_CENTER}
        zoom={CAMPUS_ZOOM}
        zoomControl={false}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {pathCoordinates.length > 0 && (
          <FitBounds positions={pathCoordinates} />
        )}

        <MapMarkers locations={locations} route={route} />

        {route && route.length > 1 && (
          <RoutePolyline route={route} />
        )}
      </MapContainer>
    </div>
  );
};

export default CampusMap;
