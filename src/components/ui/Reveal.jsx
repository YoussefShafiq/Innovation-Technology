import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll-triggered fade + slide. Respects prefers-reduced-motion.
 *
 * `from` — where the element enters from:
 * - `up`    — rises into place (starts below; classic “from bottom”)
 * - `down`  — drops into place (starts above; “from top”)
 * - `left`  — slides in from the left
 * - `right` — slides in from the right
 */
const Reveal = ({
  children,
  className = "",
  delay = 0,
  /** @type {'up' | 'down' | 'left' | 'right'} */
  from = "up",
  /** Pixel offset for the slide (ignored axis stays 0). */
  distance = 28,
  /** @deprecated use `from` + `distance` instead */
  y: legacyY,
  once = true,
  amount = 0.15,
}) => {
  const prefersReduced = useReducedMotion();

  const d = typeof legacyY === "number" ? legacyY : distance;

  const initialOffset = (() => {
    switch (from) {
      case "down":
        return { x: 0, y: -d };
      case "left":
        return { x: -d, y: 0 };
      case "right":
        return { x: d, y: 0 };
      case "up":
      default:
        return { x: 0, y: d };
    }
  })();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-72px", amount }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
