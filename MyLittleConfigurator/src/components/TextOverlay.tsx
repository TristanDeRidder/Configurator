import { useScrollContext } from "../contexts/ScrollContext";
import { useEffect, useState, useRef } from "react";
import "./TextOverlay.css";

const TextOverlay = () => {
  const { scrollProgressRef } = useScrollContext();
  const [activeSection, setActiveSection] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Use requestAnimationFrame for smooth updates
    const updateSection = () => {
      const progress = scrollProgressRef.current;
      
      let newSection = 0;
      if (progress < 0.33) {
        newSection = 0;
      } else if (progress < 0.66) {
        newSection = 1;
      } else {
        newSection = 2;
      }

      setActiveSection(prev => {
        // Only update if section changed to avoid unnecessary re-renders
        return prev !== newSection ? newSection : prev;
      });

      rafRef.current = requestAnimationFrame(updateSection);
    };

    rafRef.current = requestAnimationFrame(updateSection);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [scrollProgressRef]);

  // Determine opacity based on active section
  const getOpacity = (sectionIndex: number) => {
    return activeSection === sectionIndex ? 1 : 0;
  };

  return (
    <div className="text-overlay-container">
      {/* SECTION 1 - Keyframe 1 (0-33% scroll) */}
      <div 
        className="text-section section-1"
        style={{ opacity: getOpacity(0) }}
      >
        <h1 className="section-title">Premium Sound Quality</h1>
        <p className="section-description">
          Experience crystal-clear audio with advanced noise cancellation
        </p>
      </div>

      {/* SECTION 2 - Keyframe 2 (33-66% scroll) */}
      <div 
        className="text-section section-2"
        style={{ opacity: getOpacity(1) }}
      >
        <h1 className="section-title">Comfortable Design</h1>
        <p className="section-description">
          Ergonomic fit for <strong>all-day</strong> listening comfort
        </p>
        <button className="cta-button">Learn More</button>
      </div>

      {/* SECTION 3 - Keyframe 3 (66-100% scroll) */}
      <div 
        className="text-section section-3"
        style={{ opacity: getOpacity(2) }}
      >
        <h1 className="section-title">Long Battery Life</h1>
        <div className="section-description">
          <p>Up to <span className="highlight">30 hours</span></p>
          <p>of uninterrupted playback</p>
          <ul className="feature-list">
            <li>✓ Quick charge technology</li>
            <li>✓ USB-C charging</li>
            <li>✓ Battery indicator</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TextOverlay;
