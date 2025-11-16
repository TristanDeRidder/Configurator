# MyLittleConfigurator

MyLittleConfigurator is an interactive 3D headphone configurator built with React, Vite and react-three/fiber. It showcases a small product-config experience where users can preview and customize headphone models in real time.

Key features
- Two headphone collections: **LUMEN** (light, open) and **NOIRÉ** (warm, immersive).
- Real-time material and color adjustments using Three.js materials and a frame-based animator.
- Smooth part transitions (cushions and ear-piece variants) implemented with GSAP timelines.
- Lightweight global state for selections (cushion, color, connectivity, finish).

Tech stack
- Vite + React (TypeScript)
- react-three/fiber + @react-three/drei for 3D rendering and GLTF loading
- GSAP for animations
- A small store (Zustand or similar) for configurator state
