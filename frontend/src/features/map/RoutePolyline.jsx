import React from "react";
import { Polyline } from "react-leaflet";

const RoutePolyline = ({ route }) => {
  const coordinates = route.map((loc) => [loc.lat, loc.lng]);

  return (
    <>
      {/* White outline */}
      <Polyline
        positions={coordinates}
        color="white"
        weight={8}
        opacity={1}
      />
      {/* Blue line */}
      <Polyline
        positions={coordinates}
        color="#2563eb"
        weight={5}
        opacity={0.9}
      />
    </>
  );
};

export default RoutePolyline;
