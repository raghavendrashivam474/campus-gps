import React, { useState, useEffect } from "react";
import { getAllLocations, getShortestPath } from "./services/api";
import CampusMap from "./features/map/CampusMap";
import MapControls from "./features/map/MapControls";
import SearchBar from "./features/search/SearchBar";
import ContextBadge from "./features/search/ContextBadge";
import RoutePanel from "./features/navigation/RoutePanel";
import "./App.css";

function App() {
  const [locations, setLocations] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [route, setRoute] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getAllLocations();
        setLocations(data.data);
      } catch (err) {
        setError("Failed to load campus locations");
      }
    };
    fetchLocations();
  }, []);

  const handleFindRoute = async () => {
    if (!from || !to) {
      setError("Please select both From and To");
      return;
    }
    if (from === to) {
      setError("From and To cannot be the same");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getShortestPath(from, to);
      const path = data.instructions.map((inst) => ({
        id: inst.location.id,
        name: inst.location.name,
        type: inst.location.type,
        lat: inst.location.lat,
        lng: inst.location.lng
      }));
      setRoute(path);
      setRouteData(data);
    } catch (err) {
      setError("Failed to calculate route");
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleCloseRoute = () => {
    setRoute(null);
    setRouteData(null);
  };

  const handleLocate = () => {
    alert("Locate feature coming in Stage C");
  };

  const handleBuildings = () => {
    alert("Buildings filter coming in Stage C");
  };

  const currentLocationName = locations.find((l) => l.id === from)?.name;
  const hasRoute = !!routeData;

  return (
    <div className={`app ${hasRoute ? "has-route" : ""}`}>
      <div className="map-section">
        <CampusMap locations={locations} route={route} />

        <div className="top-overlay">
          <SearchBar
            locations={locations}
            from={from}
            to={to}
            setFrom={setFrom}
            setTo={setTo}
            onFindRoute={handleFindRoute}
            onSwap={handleSwap}
            loading={loading}
            error={error}
            currentLocationName={currentLocationName}
          />

          {from && <ContextBadge locationName={currentLocationName} />}
        </div>

        <MapControls onLocate={handleLocate} onBuildings={handleBuildings} />
      </div>

      <RoutePanel routeData={routeData} onClose={handleCloseRoute} />
    </div>
  );
}

export default App;
