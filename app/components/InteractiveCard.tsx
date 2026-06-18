"use client";

/**
 * InteractiveCard
 * ────────────────────────────────────────────────────────────────
 * Premium card wrapper with:
 *   • 3D tilt via spring physics (useMotionValue + useSpring)
 *   • Cursor-reactive glare/shimmer overlay
 *   • Gradient border glow that follows cursor position
 *   • Depth shadow intensifies on hover
 *   • All effects disabled on touch / reduced-motion
 * ────────────────────────────────────────────────────────────────
 */

import { useRef, useEffect, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  glareColor?: string;
  /** Accent color for the border glow */
  accentColor?: string;
  /** Max tilt degrees (default 8) */
  maxTilt?: number;
}

export default function InteractiveCard({
  children,
  className = "",
  glareColor = "rgba(255,255,255,0.12)",
  accentColor = "#00C2A8",
  maxTilt = 8,
}: InteractiveCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [borderGlow, setBorderGlow] = useState({ x: 50, y: 50 });
  const [enabled, setEnabled] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 260,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 260,
    damping: 28,
  });

  useEffect(() => {
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(hasPointer && !prefersReduced);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    mouseX.set(relX - 0.5);
    mouseY.set(relY - 0.5);

    // Glare position (percentage)
    setGlarePos({ x: relX * 100, y: relY * 100 });
    setBorderGlow({ x: relX * 100, y: relY * 100 });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    setGlarePos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={
        enabled
          ? {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              perspective: "1200px",
            }
          : {}
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-card="true"
      data-cursor="card"
      animate={
        isHovered
          ? {
              boxShadow: `0 28px 70px rgba(14,23,38,0.10), 0 0 0 1px ${accentColor}22`,
            }
          : {
              boxShadow: "0 8px 24px rgba(14,23,38,0.04)",
            }
      }
      transition={{ duration: 0.35 }}
    >
      {/* Glare overlay */}
      {enabled && isHovered && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            zIndex: 10,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${glareColor} 0%, transparent 55%)`,
            transition: "opacity 0.2s",
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Border glow */}
      {enabled && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            zIndex: 9,
            background: `radial-gradient(circle at ${borderGlow.x}% ${borderGlow.y}%, ${accentColor}18 0%, transparent 60%)`,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.35s",
          }}
        />
      )}

      {/* Content */}
      <div style={{ transform: "translateZ(12px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}
