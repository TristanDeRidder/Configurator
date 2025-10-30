
import { OrbitControls, ScrollControls, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
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
  const introTl = useRef<gsap.core.Timeline>(null!);
  const scrollTl = useRef<gsap.core.Timeline>(null!);
  const introComplete = useRef(false);

  const scroll = useScroll();

  useFrame(() => {
    // Only control with scroll after intro animation completes
    if (introComplete.current && scrollTl.current) {
      scrollTl.current.progress(scroll.offset);
    }
  });

  useLayoutEffect(() => {
    if (ref.current) {
      // INTRO ANIMATION (plays on load)
      introTl.current = gsap.timeline({
        onComplete: () => {
          introComplete.current = true;
        }
      });
      
      // Initial rotation and zoom animation
      introTl.current.to(ref.current.rotation, {
        y: Math.PI * 0.0834, // 15 degrees
        z: -(Math.PI * 0.0417), // -7.5 degrees roll
        duration: 2,
        ease: "power2.out",
      });

      introTl.current.to(ref.current.position, {
        z: .1, // Move toward camera
        duration: 1.5,
        ease: "power3.out",
      }, 0);

      // SCROLL ANIMATION (controls rotation while scrolling)
      scrollTl.current = gsap.timeline({ paused: true });
      
      // Rotate to final position over the scroll duration
      scrollTl.current.to(ref.current.rotation, {
        y: Math.PI * 2, // Full 360° rotation (adjust as needed)
        z: 0, // Reset roll
        duration: 1, // Duration doesn't matter, controlled by scroll progress
        ease: "none", // Linear easing works best with scroll
      });

      // Optional: Add more scroll-based animations
      // scrollTl.current.to(ref.current.position, {
      //   x: 2,
      //   duration: 1,
      //   ease: "none",
      // }, 0);

      // Auto-play intro after short delay
      setTimeout(() => introTl.current.play(), 500);
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