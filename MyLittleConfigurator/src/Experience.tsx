
import { OrbitControls, ScrollControls, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import type { Group } from "three";
// import { useControls, button } from "leva";

// Separate component for the scrollable model
const HeadphoneModel = () => {
  const model = useGLTF(
    new URL("./models/HeadphoneV2.glb", import.meta.url).href
  );
  const ref = useRef<Group>(null);
  const tl = useRef<gsap.core.Timeline>(null!);

  useLayoutEffect(() => {
    if (ref.current) {
      tl.current = gsap.timeline({ paused: true }); // Start paused so model stays visible

      // Add your animations here
      // Example: Vertical animation
      // tl.current.to(ref.current.position, {
      //   y: 1.5,
      //   duration: 1,
      //   ease: "power3.out",
      // });

      // Example: Rotation animation
      // tl.current.to(ref.current.rotation, {
      //   y: Math.PI * 2,
      //   duration: 2,
      //   ease: "power2.inOut",
      // }, 0); // The 0 means it starts at the same time as the position animation

      // To play the timeline, you can use:
      // tl.current.play();
      // Or control it with scroll, buttons, etc.
    }
  }, []);

  return (
    <group ref={ref}>
      <primitive object={model.scene} position={[0, 0, 0]} scale={0.02} />
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

        <ScrollControls pages={3} damping={0.5}>
          {/* Models */}
          <HeadphoneModel />
        </ScrollControls>
      </>
    );
}

export default Experience