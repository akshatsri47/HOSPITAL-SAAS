"use client";

import { useEffect, useState, useRef } from "react";

export default function ClientProgress() {
  const [scrollWidth, setScrollWidth] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsDesktop(mediaQuery.matches);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const percentage = (window.scrollY / totalScroll) * 100;
        setScrollWidth(percentage);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!mediaQuery.matches) return;
      const x = e.clientX;
      const y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${x}px`;
        ringRef.current.style.top = `${y}px`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (!mediaQuery.matches) return;
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("a") || 
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer");

      if (isInteractive) {
        dotRef.current?.classList.add("scale-150");
        ringRef.current?.classList.add("scale-[1.8]", "border-secondary");
      } else {
        dotRef.current?.classList.remove("scale-150");
        ringRef.current?.classList.remove("scale-[1.8]", "border-secondary");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Initial run
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Indicator at Top */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollWidth}%` }} 
      />

      {/* Custom Cursor for Desktop Pointer Devices */}
      {isDesktop && (
        <>
          <div ref={dotRef} className="custom-cursor-dot" style={{ top: "-100px", left: "-100px" }} />
          <div ref={ringRef} className="custom-cursor-ring" style={{ top: "-100px", left: "-100px" }} />
        </>
      )}
    </>
  );
}
