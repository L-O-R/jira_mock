// components/CustomCursor.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    if (!cursorRef.current || !followerRef.current) return;

    // Cursor elements
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    // Set initial position
    gsap.set([cursor, follower], {
      xPercent: -50,
      yPercent: -50,
    });

    // Mouse position
    const pos = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    const mouse = { x: pos.x, y: pos.y };

    // Animation loop
    const updatePosition = () => {
      gsap.set(cursor, { x: mouse.x, y: mouse.y });

      // Add smooth follow with GSAP
      gsap.to(follower, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    // Mouse movement listener
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Hover effects
    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 0.5, duration: 0.3 });
      gsap.to(follower, { scale: 3, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, duration: 0.3 });
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(
      "button, a, .cursor-scale"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Animation loop
    const animation = gsap.ticker.add(updatePosition);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener(
          "mouseenter",
          handleMouseEnter
        );
        el.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
      });
      gsap.ticker.remove(animation);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 border-2 border-indigo-600 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div
        ref={followerRef}
        className="fixed w-8 h-8 bg-indigo-600 bg-opacity-20 rounded-full pointer-events-none z-40 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </>
  );
};

export default CustomCursor;
