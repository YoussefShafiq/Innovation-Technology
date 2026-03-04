import { useState, useEffect } from "react";

/**
 * Returns the current vertical scroll position.
 * Useful for showing/hiding elements based on scroll depth.
 */
const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
};

export default useScrollPosition;
