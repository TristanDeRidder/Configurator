
import { OrbitControls, useGLTF } from "@react-three/drei";
// import { useControls, button } from "leva";

const Experience = () => {
    // Load GLB from src/models using a Vite-friendly URL
    const model = useGLTF(
      new URL("./models/HeadphoneV2.glb", import.meta.url).href
    );
    
    // const { position, color, visible } = useControls({
    //   position: {
    //     value: { x: -2, y: 0, z: 0 },
    //     step: 0.01,
    //   },
    //   color: {
    //     value: "#ffffff",
    //   },
    //   visible: true,
    //   myInterval: {
    //     min: 0,
    //     max: 10,
    //     value: [4, 5],
    //   },
    //   clickMe: button(() => {
    //     console.log("ok");
    //   }),
    //   choice: { options: ["a", "b", "c"] },
    // });

    return (
      <>
        {/* Controls */}
        {/* <OrbitControls makeDefault /> */}

        {/* Lights */}
        <directionalLight position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1} />

        {/* Models */}
        <group>
          <primitive object={model.scene} position={[0, 0, 0]} scale={0.02} />
        </group>
      </>
    );
}

export default Experience