// contexts/ScrollContext.tsx
import { createContext, useContext, useRef, useState } from "react";

interface ScrollContextType {
  scrollProgressRef: React.MutableRefObject<number>;
  updateScrollProgress: (progress: number) => void;
  activeSection: number;
  setActiveSection: React.Dispatch<React.SetStateAction<number>>;
}

const ScrollContext = createContext<ScrollContextType>(null!);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrollProgressRef = useRef(0);
  const [activeSection, setActiveSection] = useState(0);

  const updateScrollProgress = (progress: number) => {
    scrollProgressRef.current = progress;
  };

  return (
    <ScrollContext.Provider value={{ scrollProgressRef, updateScrollProgress, activeSection, setActiveSection }}>
      {children}
    </ScrollContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within ScrollProvider');
  }
  return context;
};
