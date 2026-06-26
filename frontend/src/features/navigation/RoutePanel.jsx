import React, { useState, useEffect } from "react";
import DragHandle from "./DragHandle";
import RouteSummary from "./RouteSummary";
import RouteSteps from "./RouteSteps";

const RoutePanel = ({ routeData, onClose }) => {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // On desktop, auto-expand (directions always visible)
  useEffect(() => {
    if (!isMobile) setExpanded(true);
  }, [isMobile]);

  if (!routeData) return null;

  const handleExpand = () => setExpanded(!expanded);

  return (
    <div
      className={`route-panel ${
        isMobile ? "mobile" : "desktop"
      } ${expanded ? "expanded" : "collapsed"}`}
    >
      {isMobile && <DragHandle />}

      <div className="route-panel-content">
        <RouteSummary
          route={routeData.route}
          summary={routeData.summary}
          onClose={onClose}
          onExpand={handleExpand}
          expanded={expanded}
          showExpandBtn={isMobile}
        />

        {expanded && (
          <div className="route-panel-steps">
            <RouteSteps instructions={routeData.instructions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutePanel;
