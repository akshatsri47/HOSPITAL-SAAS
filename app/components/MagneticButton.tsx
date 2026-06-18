"use client";

/**
 * MagneticButton
 * ────────────────────────────────────────────────────────────────
 * Wraps any child element with magnetic hover physics.
 * • Pulls the element toward the cursor on mouse-enter/move.
 * • Springs back to origin on mouse-leave.
 * • Uses Framer Motion spring physics for realistic feel.
 * • Disabled on touch / reduced-motion devices automatically.
 * ────────────────────────────────────────────────────────────────
 */

import { useRef, useEffect, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  /** How strongly the element is pulled toward the cursor (0–1, default 0.35) */
  strength?: number;
  /** Framer Motion spring stiffness (default 200) */
  stiffness?: number;
  /** Framer Motion spring damping (default 20) */
  damping?: number;
  className?: string;
}

export default function MagneticButton({
  children,
  strength = 0.35,
  stiffness = 200,
  damping = 20,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness, damping });
  const springY = useSpring(y, { stiffness, damping });

  useEffect(() => {
    // Skip on touch or reduced-motion
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasPointer || prefersReduced) return;

    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, strength]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
      data-magnetic="true"
    >
      {children}
    </motion.div>
  );
}
