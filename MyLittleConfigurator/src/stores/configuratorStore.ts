import { create } from 'zustand';

interface ConfiguratorState {
  // Configuration options
  selectedColor: string;
  selectedMaterial: string;
  selectedCushion: string;
  selectedCable: string;
  selectedConnectivity: string;
  selectedCarry: string;
  
  // Actions to update the state
  setSelectedColor: (color: string) => void;
  setSelectedMaterial: (material: string) => void;
  setSelectedCushion: (cushion: string) => void;
  setSelectedCable: (cable: string) => void;
  setSelectedConnectivity: (connectivity: string) => void;
  setSelectedCarry: (carry: string) => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  // Initial state
  selectedColor: 'black',
  selectedMaterial: 'aluminum',
  selectedCushion: 'comfort',
  selectedCable: 'charging',
  selectedConnectivity: 'bluetooth',
  selectedCarry: 'none',
  
  // Actions
  setSelectedColor: (color) => set({ selectedColor: color }),
  setSelectedMaterial: (material) => set({ selectedMaterial: material }),
  setSelectedCushion: (cushion) => set({ selectedCushion: cushion }),
  setSelectedCable: (cable) => set({ selectedCable: cable }),
  setSelectedConnectivity: (connectivity) => set({ selectedConnectivity: connectivity }),
  setSelectedCarry: (carry) => set({ selectedCarry: carry }),
}));
