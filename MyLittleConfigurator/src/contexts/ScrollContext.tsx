import { createContext, useContext, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';

interface ScrollContextType {
  scrollProgressRef: React.MutableRefObject<number>;
  updateScrollProgress: (progress: number) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const scrollProgressRef = useRef(0);

  const updateScrollProgress = useCallback((progress: number) => {
    scrollProgressRef.current = progress;
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollProgressRef, updateScrollProgress }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within ScrollProvider');
  }
  return context;
};
