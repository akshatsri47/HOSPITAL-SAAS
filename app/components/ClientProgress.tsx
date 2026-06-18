"use client";

/**
 * ClientProgress
 * ─────────────────────────────────────────────────────────────────
 * Handles three global client-side concerns:
 *   1. Scroll progress bar (top of page, teal→blue gradient)
 *   2. Premium custom cursor system (desktop / fine-pointer only)
 *      • Smooth RAF-based trailing ring (spring-like lerp)
 *      • Context-aware states: default | hover | card | cta | text
 *      • Cursor label for CTAs / cards that accept data-cursor attr
 *   3. All effects disabled on touch / reduced-motion devices
 * ─────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState, useCallback } from "react";

/* ── spring lerp helper (0 = instant, 1 = never) ─────────────── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

type CursorState = "default" | "hover" | "card" | "cta" | "text";

export default function ClientProgress() {
  const [scrollWidth, setScrollWidth] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Cursor positions (raw = actual mouse, smooth = lagged ring)
  const rawPos = useRef({ x: -200, y: -200 });
  const smoothPos = useRef({ x: -200, y: -200 });
  const rafId = useRef<number>(0);

  // Cursor state & label
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [cursorLabel, setCursorLabel] = useState("");
  const [cursorVisible, setCursorVisible] = useState(false);

  // DOM refs for cursor elements (bypass React re-render for perf)
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  /* ── RAF animation loop ─────────────────────────────────────── */
  const animate = useCallback(() => {
    const LERP_SPEED = 0.10; // ring follows at 10% per frame → smooth lag

    smoothPos.current.x = lerp(smoothPos.current.x, rawPos.current.x, LERP_SPEED);
    smoothPos.current.y = lerp(smoothPos.current.y, rawPos.current.y, LERP_SPEED);

    const sx = smoothPos.current.x;
    const sy = smoothPos.current.y;
    const rx = rawPos.current.x;
    const ry = rawPos.current.y;

    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${rx - 3}px, ${ry - 3}px)`;
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${sx - 20}px, ${sy - 20}px)`;
    }
    if (labelRef.current) {
      labelRef.current.style.transform = `translate(${sx - 20}px, ${sy + 22}px)`;
    }
    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${rx - 180}px, ${ry - 180}px)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  /* ── Resolve cursor state from hovered element ─────────────── */
  const resolveCursorState = useCallback((target: HTMLElement): { state: CursorState; label: string } => {
    // Check explicit data-cursor attribute first
    const cursorAttr =
      (target.getAttribute("data-cursor") ||
       target.closest("[data-cursor]")?.getAttribute("data-cursor")) ?? "";

    if (cursorAttr) {
      return {
        state: cursorAttr as CursorState,
        label: target.getAttribute("data-cursor-label") ||
               (target.closest("[data-cursor-label]") as HTMLElement | null)?.getAttribute("data-cursor-label") || "",
      };
    }

    // CTA / primary buttons
    if (
      target.closest("[data-magnetic]") ||
      target.closest(".cta-magnetic") ||
      (target.tagName === "A" && target.classList.contains("cta-btn"))
    ) {
      return { state: "cta", label: "" };
    }

    // Generic interactive
    if (
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      target.closest("a") ||
      target.closest("button") ||
      target.classList.contains("cursor-pointer") ||
      target.closest(".cursor-pointer")
    ) {
      return { state: "hover", label: "" };
    }

    // Cards
    if (target.closest("[data-card]") || target.closest(".interactive-card")) {
      return { state: "card", label: "" };
    }

    return { state: "default", label: "" };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");

    setIsDesktop(mq.matches);
    setReducedMotion(rm.matches);

    if (!mq.matches || rm.matches) return;

    /* ── Scroll progress ──────────────────────────────────────── */
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setScrollWidth((window.scrollY / total) * 100);
    };

    /* ── Raw mouse position (no throttle needed — RAF handles it) */
    const handleMouseMove = (e: MouseEvent) => {
      rawPos.current = { x: e.clientX, y: e.clientY };
      if (!cursorVisible) setCursorVisible(true);
    };

    /* ── Cursor leave window ───────────────────────────────────── */
    const handleMouseLeave = () => setCursorVisible(false);
    const handleMouseEnter = () => setCursorVisible(true);

    /* ── Hover state detection (uses event delegation) ─────────── */
    const handleMouseOver = (e: MouseEvent) => {
      const { state, label } = resolveCursorState(e.target as HTMLElement);
      setCursorState(state);
      setCursorLabel(label);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    handleScroll();
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, [animate, resolveCursorState, cursorVisible]);

  /* ── Cursor size / color map per state ─────────────────────── */
  const ringSize: Record<CursorState, number> = {
    default: 40,
    hover: 54,
    card: 64,
    cta: 70,
    text: 48,
  };
  const ringBorder: Record<CursorState, string> = {
    default: "rgba(0,194,168,0.35)",
    hover: "rgba(0,194,168,0.70)",
    card: "rgba(91,141,239,0.55)",
    cta: "#00C2A8",
    text: "rgba(0,194,168,0.4)",
  };
  const ringBg: Record<CursorState, string> = {
    default: "transparent",
    hover: "rgba(0,194,168,0.04)",
    card: "rgba(91,141,239,0.06)",
    cta: "rgba(0,194,168,0.10)",
    text: "transparent",
  };
  const sz = ringSize[cursorState];

  return (
    <>
      {/* ── Scroll Progress Bar ────────────────────────────────── */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollWidth}%` }}
        aria-hidden="true"
      />

      {/* ── Custom Cursor (desktop only) ──────────────────────── */}
      {isDesktop && !reducedMotion && (
        <>
          {/* Dot — snaps exactly to cursor */}
          <div
            ref={dotRef}
            aria-hidden="true"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: cursorState === "cta" ? "#00C2A8" : "#0E1726",
              pointerEvents: "none",
              zIndex: 99999,
              opacity: cursorVisible ? 1 : 0,
              transition: "opacity 0.3s, background 0.2s, width 0.2s, height 0.2s",
              willChange: "transform",
            }}
          />

          {/* Smooth ring — lags behind cursor for spring feel */}
          <div
            ref={ringRef}
            aria-hidden="true"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: sz,
              height: sz,
              borderRadius: "50%",
              border: `1.5px solid ${ringBorder[cursorState]}`,
              background: ringBg[cursorState],
              pointerEvents: "none",
              zIndex: 99998,
              opacity: cursorVisible ? 1 : 0,
              transition:
                "opacity 0.3s, width 0.35s cubic-bezier(0.34,1.56,0.64,1), height 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s, background 0.25s",
              willChange: "transform",
              backdropFilter: cursorState === "card" ? "blur(2px)" : "none",
            }}
          />

          {/* Cursor label (shown when cursorLabel is set) */}
          {cursorLabel && (
            <div
              ref={labelRef}
              aria-hidden="true"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 99997,
                opacity: cursorVisible && cursorLabel ? 1 : 0,
                transition: "opacity 0.2s",
                willChange: "transform",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#00C2A8",
                  background: "rgba(14,23,38,0.85)",
                  border: "1px solid rgba(0,194,168,0.25)",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  whiteSpace: "nowrap",
                  backdropFilter: "blur(8px)",
                }}
              >
                {cursorLabel}
              </span>
            </div>
          )}

          {/* Soft ambient glow blob that follows mouse loosely (hero section only) */}
          <div
            ref={glowRef}
            aria-hidden="true"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: 360,
              height: 360,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0,194,168,0.055) 0%, rgba(91,141,239,0.03) 50%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 1,
              opacity: cursorVisible ? 1 : 0,
              transition: "opacity 0.4s",
              willChange: "transform",
            }}
          />
        </>
      )}
    </>
  );
}
