import React, { useState } from "react";

const SearchBar = ({
  locations,
  from,
  to,
  setFrom,
  setTo,
  onFindRoute,
  onSwap,
  loading,
  error,
  currentLocationName
}) => {
  const [expanded, setExpanded] = useState(false);

  const groupByType = (locs) => {
    return locs.reduce((groups, location) => {
      const type = location.type;
      if (!groups[type]) groups[type] = [];
      groups[type].push(location);
      return groups;
    }, {});
  };

  const grouped = groupByType(locations);

  if (!expanded) {
    return (
      <div className="search-bar collapsed" onClick={() => setExpanded(true)}>
        <div className="search-icon">🔍</div>
        <div className="search-text">Where to?</div>
        <div className="search-avatar">👤</div>
      </div>
    );
  }

  return (
    <div className="search-bar expanded">
      <div className="search-header">
        <button
          className="search-close"
          onClick={() => setExpanded(false)}
        >
          ✕
        </button>
        <span className="search-title">Plan your route</span>
      </div>

      <div className="search-fields">
        <div className="search-field">
          <span className="field-dot dot-from"></span>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="">From</option>
            {Object.entries(grouped).map(([type, locs]) => (
              <optgroup key={type} label={type.toUpperCase()}>
                {locs.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <button className="swap-icon-btn" onClick={onSwap} title="Swap">
          ⇅
        </button>

        <div className="search-field">
          <span className="field-dot dot-to"></span>
          <select value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="">To</option>
            {Object.entries(grouped).map(([type, locs]) => (
              <optgroup key={type} label={type.toUpperCase()}>
                {locs.map((loc) => (
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
        className="search-go-btn"
        onClick={onFindRoute}
        disabled={loading}
      >
        {loading ? "Finding route..." : "Navigate"}
      </button>

      {error && <div className="search-error">{error}</div>}
    </div>
  );
};

export default SearchBar;
