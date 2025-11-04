import { OrbitControls, useGLTF } from "@react-three/drei";
import { useConfiguratorStore } from "../../stores/configuratorStore";

const HeadphoneModel = () => {
  const selectedCushion = useConfiguratorStore((state) => state.selectedCushion);
  
  const model = useGLTF(new URL("../../models/noiréNoCups.glb", import.meta.url).href);
  const comfort = useGLTF(new URL("../../models/noiréComfortCups.glb", import.meta.url).href);
  const studio = useGLTF(new URL("../../models/noiréStudioCups.glb", import.meta.url).href);
  const open = useGLTF(new URL("../../models/noiréOpenCups.glb", import.meta.url).href);

  
  return (
    <group>
      {/* Base headphone model (without cups) */}
      <primitive object={model.scene} position={[0, -0.025, 0]} scale={0.02} />
      
      {/* Conditionally render cup models based on selection */}
      {selectedCushion === "comfort" && (
        <primitive object={comfort.scene} position={[0, -0.025, 0]} scale={0.02} />
      )}
      {selectedCushion === "studio" && (
        <primitive object={studio.scene} position={[0, -0.025, 0]} scale={0.02} />
      )}
      {selectedCushion === "open" && (
        <primitive object={open.scene} position={[0, -0.025, 0]} scale={0.02} />
      )}
    </group>
  );
};


const Experience = () => {
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
        <OrbitControls makeDefault enableZoom={false} />

        {/* Lights */}
        <directionalLight position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1} />

        {/* Models */}
        <HeadphoneModel  />
      </>
    );
}

export default Experience