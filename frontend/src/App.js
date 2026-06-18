// src/App.js

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
      {/* Header */}
      <header className="header">
        <h1>🏫 Campus GPS</h1>
        <p>Find the shortest path between campus locations</p>
      </header>

      <div className="container">
        {/* Search Panel */}
        <div className="search-panel">
          <h2>Find Your Way</h2>

          <div className="form-row">
            <div className="form-group">
              <label>📍 From</label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              >
                <option value="">Select starting location</option>
                {Object.entries(grouped).map(([type, locs]) => (
                  <optgroup key={type} label={type.toUpperCase()}>
                    {locs.map(loc => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="swap-btn" onClick={() => {
              const temp = from;
              setFrom(to);
              setTo(temp);
            }}>
              ⇄
            </div>

            <div className="form-group">
              <label>🎯 To</label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
              >
                <option value="">Select destination</option>
                {Object.entries(grouped).map(([type, locs]) => (
                  <optgroup key={type} label={type.toUpperCase()}>
                    {locs.map(loc => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          <button
            className="btn-find"
            onClick={handleFindPath}
            disabled={loading}
          >
            {loading ? '⏳ Finding Path...' : '🔍 Find Shortest Path'}
          </button>

          {error && (
            <div className="error-box">❌ {error}</div>
          )}
        </div>

        {/* Map Panel */}
        <div className="map-panel">
          <div className="map-header">
            <h2>🗺️ Campus Map</h2>
            <MapLegend />
          </div>
          <CampusMap
            locations={locations}
            path={result ? result.path : null}
          />
        </div>

        {/* Result Panel */}
        {result && (
          <div className="result-panel">
            <h2>✅ Shortest Path Found</h2>

            <div className="result-summary">
              <div className="summary-card">
                <span className="summary-label">From</span>
                <span className="summary-value">{result.from}</span>
              </div>
              <div className="summary-arrow">→</div>
              <div className="summary-card">
                <span className="summary-label">To</span>
                <span className="summary-value">{result.to}</span>
              </div>
            </div>

            <div className="result-stats">
              <div className="stat">
                <span className="stat-icon">📏</span>
                <span className="stat-label">Distance</span>
                <span className="stat-value">{result.totalDistance}</span>
              </div>
              <div className="stat">
                <span className="stat-icon">👣</span>
                <span className="stat-label">Steps</span>
                <span className="stat-value">{result.steps}</span>
              </div>
            </div>

            <div className="path-steps">
              <h3>📍 Step by Step</h3>
              <div className="steps-list">
                {result.path.map((location, index) => (
                  <div key={location.id} className="step-item">
                    <div className="step-number">{index + 1}</div>
                    <div className="step-info">
                      <span className="step-name">{location.name}</span>
                      <span className="step-type">{location.type}</span>
                    </div>
                    {index < result.path.length - 1 && (
                      <div className="step-arrow">↓</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;