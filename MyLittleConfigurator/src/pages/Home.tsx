import { Canvas } from "@react-three/fiber";
import Experience from "../Experience";
import TextOverlay from "../components/TextOverlay";

const cameraSettings = {
  fov: 20,
  near: 0.1,
  far: 200,
  position: [0, 0, 0.5] as [number, number, number],
};

const Home = () => {
  return (
    <>
      {/* Text overlay outside Canvas - regular HTML/JSX */}
      <TextOverlay />
      
      {/* 3D Canvas */}
      <Canvas camera={cameraSettings}>
        <Experience />
      </Canvas>
    </>
  );
};

export default Home;
