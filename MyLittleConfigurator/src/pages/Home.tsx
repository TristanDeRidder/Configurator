import { Canvas } from "@react-three/fiber";
import Experience from "./canvasses/Experience";

const cameraSettings = {
  fov: 20,
  near: 0.1,
  far: 200,
  position: [0, 0, 0.5] as [number, number, number],
};

const Home = () => {
  return (
    <div className="w-full h-screen">
      <Canvas camera={cameraSettings}>
        <Experience />
      </Canvas>
    </div>
  );
};

export default Home;
