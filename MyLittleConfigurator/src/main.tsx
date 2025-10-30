import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience"

const cameraSettings = {
  fov: 20,
  near: 0.1,
  far: 200,
  position: [0, 0, 0.5] as [number, number, number],
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Canvas camera={cameraSettings}>
      <Experience />
    </Canvas>
  </StrictMode>
);
