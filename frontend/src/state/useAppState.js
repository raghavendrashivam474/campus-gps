import { useState, useCallback } from "react";

// Initial campus state
const INITIAL_STATE = {
  currentLocation: null,
  destination: null,
  currentRoute: null,
  searchQuery: "",
  selectedLocation: null,
  bottomSheetState: "hidden", // hidden | collapsed | expanded
  mapMode: "default", // default | searching | navigating
  showSearchPanel: false
};

export const useAppState = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const updateState = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetState = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return { state, updateState, resetState };
};
