import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const STORAGE_KEY = "in-tech-config-loader";

/** Typed end-to-end with slower, human-ish pacing; ellipsis last. */
const FULL_TEXT = "Loading...";

/**
 * Delay before the character at `nextCharIndex` appears (ms).
 * Slower overall + slight hesitation on first key and before the first dot.
 */
const delayBeforeChar = (nextCharIndex) => {
  const r = () => Math.random();
  if (nextCharIndex === 0) return 220 + r() * 220;
  if (nextCharIndex < 7) return 105 + r() * 95;
  if (nextCharIndex === 7) return 380 + r() * 220;
  return 200 + r() * 160;
};

/**
 * Light first-visit splash: slowly types “Loading...” with a visible block cursor,
 * then fades out.
 */
const ConfigTypingLoader = ({ onDone }) => {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    try {
      return typeof sessionStorage !== "undefined" && sessionStorage.getItem(STORAGE_KEY) !== "1";
    } catch {
      return true;
    }
  });
  const [typed, setTyped] = useState("");
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);
  const finishScheduledRef = useRef(false);

  useEffect(() => {
    if (prefersReduced) {
      setVisible(false);
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
      return;
    }
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        setVisible(false);
        if (!doneRef.current) {
          doneRef.current = true;
          onDone?.();
        }
      }
    } catch {
      /* ignore */
    }
  }, [prefersReduced, onDone]);

  useEffect(() => {
    if (!visible) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  useEffect(() => {
    if (!visible || prefersReduced) return;
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "1") return;

    if (typed.length < FULL_TEXT.length) {
      const ms = delayBeforeChar(typed.length);
      const id = window.setTimeout(() => {
        setTyped(FULL_TEXT.slice(0, typed.length + 1));
      }, ms);
      return () => window.clearTimeout(id);
    }

    if (finishScheduledRef.current) return undefined;
    finishScheduledRef.current = true;

    const hold = window.setTimeout(() => {
      setExiting(true);
      window.setTimeout(() => {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* ignore */
        }
        setVisible(false);
        if (!doneRef.current) {
          doneRef.current = true;
          onDone?.();
        }
      }, 520);
    }, 780);

    return () => window.clearTimeout(hold);
  }, [visible, prefersReduced, typed, onDone]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background/92 backdrop-blur-md transition-opacity duration-[520ms] ease-out ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="px-6">
        <p className="inline-flex items-center gap-0.5 font-mono text-3xl font-semibold tracking-tight text-primary sm:text-4xl md:text-5xl">
          <span className="min-h-[1.2em]">{typed}</span>
          <span className="loader-block-caret" aria-hidden="true" />
        </p>
      </div>
    </div>
  );
};

export default ConfigTypingLoader;
