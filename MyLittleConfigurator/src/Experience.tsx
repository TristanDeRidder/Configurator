
import { OrbitControls } from "@react-three/drei";
import Sphere from "./components/Sphere/Sphere";
import Box from "./components/Box/Box";
import Ground from "./components/Ground/Ground";
import { useControls, button } from "leva";

const Experience = () => {
    const { position, color, visible } = useControls({
      position: {
        value: { x: -2, y: 0, z: 0 },
        step: 0.01,
      },
      color: {
        value: "#ffffff",
      },
      visible: true,
      myInterval: {
        min: 0,
        max: 10,
        value: [4, 5],
      },
      clickMe: button(() => {
        console.log("ok");
      }),
      choice: { options: ["a", "b", "c"] },
    });

    return (
      <>
        {/* Controls */}
        <OrbitControls makeDefault />

        {/* Lights */}
        <directionalLight position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1} />

        {/* Models */}
        <group>
          <Sphere position-x={-2} scale={1} />
          <Box
            visible={visible}
            rotation-y={Math.PI * 0.25}
            position={[position.x, position.y, position.z]}
            scale={1.5}
            color={color}
          />
        </group>

        {/* Floor */}
        <Ground position-y={-1} rotation-x={-Math.PI * 0.5} scale={10} />
      </>
    );
}

export default Experience