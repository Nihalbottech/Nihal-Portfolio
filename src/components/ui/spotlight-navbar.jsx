import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function SpotlightNavbar({
  items = [],
  className,
  onItemClick,
  defaultActiveIndex = 0,
}) {
  const navRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [hoverX, setHoverX] = useState(null);

  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  // Sync external active state if provided
  useEffect(() => {
    setActiveIndex(defaultActiveIndex);
  }, [defaultActiveIndex]);

  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    const handleMouseMove = (e) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;
        
        animate(spotlightX.current, targetX, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          onUpdate: (v) => {
            spotlightX.current = v;
            nav.style.setProperty("--spotlight-x", `${v}px`);
          }
        });
      }
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex]);

  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;
    // Delay slightly to ensure layout has occurred
    setTimeout(() => {
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;

        animate(ambienceX.current, targetX, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          onUpdate: (v) => {
            ambienceX.current = v;
            nav.style.setProperty("--ambience-x", `${v}px`);
          },
        });
      }
    }, 50);
  }, [activeIndex, items]);

  const handleItemClick = (item, index) => {
    setActiveIndex(index);
    if (onItemClick) {
      onItemClick(item, index);
    }
  };

  return (
    <div className={cn("relative flex justify-center", className)}>
      <nav
        ref={navRef}
        className={cn(
          "spotlight-nav relative h-11 rounded-full transition-all duration-300 overflow-hidden border border-borderLine bg-surface/50 backdrop-blur-md shadow-sm"
        )}
      >
        <ul className="relative flex items-center h-full px-2 gap-0 z-[10]">
          {items.map((item, idx) => (
            <li key={idx} className="relative h-full flex items-center justify-center">
              <a
                href={item.href}
                data-index={idx}
                onClick={() => handleItemClick(item, idx)}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full",
                  activeIndex === idx
                    ? "text-primary"
                    : "text-muted hover:text-text"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* 1. The Moving Spotlight (Follows Mouse) */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] opacity-0 transition-opacity duration-300"
          style={{ 
            opacity: hoverX !== null ? 1 : 0,
            background: `
              radial-gradient(
                120px circle at var(--spotlight-x) 100%, 
                rgba(37, 99, 235, 0.15) 0%, 
                transparent 50%
              )
            `
          }}
        />

        {/* 2. The Active State Ambience (Stays on Active) */}
        <div
            className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] z-[2]"
            style={{
                background: `
                  radial-gradient(
                    60px circle at var(--ambience-x) 0%, 
                    rgba(37, 99, 235, 1) 0%, 
                    transparent 100%
                  )
                `
            }}
        />
        
        {/* 3. Bottom Border Track (Subtle) */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-borderLine z-0" />
      </nav>
    </div>
  );
}
