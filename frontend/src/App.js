import React, { useState, useEffect } from 'react';
import { getAllLocations, getShortestPath } from './services/api';
import CampusMap from './components/CampusMap';
import MapLegend from './components/MapLegend';
import './App.css';

function App() {
  const [locations, setLocations] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getAllLocations();
        setLocations(data.data);
      } catch (err) {
        setError('Failed to load locations');
      }
    };
    fetchLocations();
  }, []);

  const handleFindPath = async () => {
    if (!from || !to) {
      setError('Please select both From and To locations');
      return;
    }
    if (from === to) {
      setError('From and To cannot be the same location');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await getShortestPath(from, to);
      setResult(data);
    } catch (err) {
      setError('Failed to calculate path');
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setResult(null);
  };

  const groupByType = (locations) => {
    return locations.reduce((groups, location) => {
      const type = location.type;
      if (!groups[type]) groups[type] = [];
      groups[type].push(location);
      return groups;
    }, {});
  };

  const grouped = groupByType(locations);

  return (
    <div className="app">
      <header className="header">
        <h1>🏫 Campus GPS</h1>
        <p>Find the shortest path between campus locations</p>
      </header>

      <div className="container">
        <div className="search-panel">
          <h2>Find Your Way</h2>

          <div className="form-row">
            <div className="form-group">
              <label>📍 From</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)}>
                <option value="">Select starting location</option>
                {Object.entries(grouped).map(([type, locs]) => (
                  <optgroup key={type} label={type.toUpperCase()}>
                    {locs.map(loc => (
                      <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="swap-btn" onClick={handleSwap}>⇄</div>

            <div className="form-group">
              <label>🎯 To</label>
              <select value={to} onChange={(e) => setTo(e.target.value)}>
                <option value="">Select destination</option>
                {Object.entries(grouped).map(([type, locs]) => (
                  <optgroup key={type} label={type.toUpperCase()}>
                    {locs.map(loc => (
                      <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          <button className="btn-find" onClick={handleFindPath} disabled={loading}>
            {loading ? '⏳ Finding Path...' : '🔍 Find Shortest Path'}
          </button>

          {error && <div className="error-box">❌ {error}</div>}
        </div>

        {result && result.summary && (
          <div className="summary-panel">
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-icon">🎯</span>
                <span className="summary-label">Destination</span>
                <span className="summary-value">{result.route.to.name}</span>
              </div>
              <div className="summary-item">
                <span className="summary-icon">📏</span>
                <span className="summary-label">Distance</span>
                <span className="summary-value">{result.summary.totalDistance}</span>
              </div>
              <div className="summary-item">
                <span className="summary-icon">🚶</span>
                <span className="summary-label">Walking Time</span>
                <span className="summary-value">{result.summary.walkingTime}</span>
              </div>
              <div className="summary-item">
                <span className="summary-icon">⏰</span>
                <span className="summary-label">Arrive By</span>
                <span className="summary-value">{result.summary.estimatedArrival}</span>
              </div>
            </div>
          </div>
        )}

        <div className="map-panel">
          <div className="map-header">
            <h2>🗺️ Campus Map</h2>
            <MapLegend />
          </div>
          <CampusMap locations={locations} path={result ? result.path : null} />
        </div>

        {result && result.path && (
          <div className="result-panel">
            <h2>📍 Step by Step Directions</h2>
            <div className="directions-list">
              {result.path.map((location, index) => (
                <div key={location.id} className="direction-item">
                  <div className="direction-left">
                    <div className={`direction-dot ${
                      index === 0 ? 'dot-start' :
                      index === result.path.length - 1 ? 'dot-end' : 'dot-mid'
                    }`}/>
                    {index < result.path.length - 1 && <div className="direction-line"/>}
                  </div>
                  <div className="direction-content">
                    <div className="direction-header">
                      <span className="direction-name">{location.name}</span>
                      <span className="direction-type">{location.type}</span>
                    </div>
                    {index === 0 && (
                      <span className="direction-action">Start here</span>
                    )}
                    {index > 0 && index < result.path.length - 1 && (
                      <span className="direction-action">
                        Walk {location.segmentDistance} → Continue
                      </span>
                    )}
                    {index === result.path.length - 1 && (
                      <span className="direction-action destination">
                        🎉 You have arrived! ({location.segmentDistance})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;