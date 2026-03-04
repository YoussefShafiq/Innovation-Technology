import { useState, useEffect } from "react";

/**
 * Returns true when the given CSS media query matches.
 * Example: useMediaQuery("(min-width: 768px)")
 */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
};

export default useMediaQuery;
