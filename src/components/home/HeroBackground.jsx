import { useEffect, useState } from "react";
import { bg1, bg2, bg3, bg4, bg5 } from "../../assets/bgImages/bgImage";

// Defined outside the component so the array is created once, not on every render.
// No hook needed here, just a plain constant.
const backgrounds = [bg1, bg2, bg3, bg4, bg5];
const SLIDE_INTERVAL_MS = 6000; // Slower interval for a premium, calm feel

const HeroBackground = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % backgrounds.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []); // Empty dependency array is safe here since backgrounds.length never changes

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {backgrounds.map((src, index) => (
        <img
          key={src}
          src={src}
          alt=""
          decoding="async"
          loading={index === 0 ? "eager" : "lazy"} // Performance optimization
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-[3000ms] ease-in-out motion-reduce:transition-none ${
            index === activeIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        />
      ))}
      {/* Gradient overlay is much more professional than a flat black overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
    </div>
  );
};

export default HeroBackground;
