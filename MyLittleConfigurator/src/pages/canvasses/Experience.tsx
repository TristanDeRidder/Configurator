import { OrbitControls, ScrollControls, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import type { Group } from "three";
import { useScrollContext } from "../../contexts/ScrollContext";

const HeadphoneModel = () => {
  const model = useGLTF(new URL("../../models/HeadphoneV3.glb", import.meta.url).href);
  const ref = useRef<Group>(null);
  const introTl = useRef<gsap.core.Timeline>(null!);
  const scrollTl = useRef<gsap.core.Timeline>(null!);
  const introComplete = useRef(false);
  const scroll = useScroll();
  const { updateScrollProgress, setActiveSection } = useScrollContext();

 useFrame(() => {
  const progress = scroll.offset;
  updateScrollProgress(progress);

  if (introComplete.current && scrollTl.current) {
    scrollTl.current.progress(progress);

    // Section thresholds
    let section = 0;
    if (progress >= 0.8) section = 4;
    else if (progress >= 0.6) section = 3;
    else if (progress >= 0.4) section = 2;
    else if (progress >= 0.2) section = 1;

    // Update context only when section changes
    setActiveSection((prev) => (prev !== section ? section : prev));
  }
});


  useLayoutEffect(() => {
    if (!ref.current) return;

    introTl.current = gsap.timeline({
      onComplete: () => {
        introComplete.current = true;
      },
    });

    introTl.current.to(ref.current.rotation, {
      y: Math.PI * 0.0834,
      z: -(Math.PI * 0.0417),
      duration: 2,
      ease: "power2.out",
    });

    introTl.current.to(ref.current.position, {
      z: 0.1,
      duration: 1.5,
      ease: "power3.out",
    }, 0);

    scrollTl.current = gsap.timeline({ paused: true });

    // === SECTION 1 (0–20%) ===
    scrollTl.current.to(ref.current.position, {
      z: 0.1,
      duration: 1,
      ease: "none",
      onStart: () => setActiveSection(0),
    });
    

    // === SECTION 2 (20–40%) ===
    scrollTl.current.to(ref.current.position, {
      z: 0.35,
      duration: 1,
      ease: "power2.inOut",
      onStart: () => setActiveSection(1),
    });

    scrollTl.current.to(ref.current.rotation, {
      y: -(Math.PI * 0.333),
      duration: 1,
      ease: "power2.inOut",
    }, "<");

    // === SECTION 3 (40–60%) ===
    scrollTl.current.to(ref.current.position, {
      x: 0.15,
      y: 0,
      z: -0.15,
      duration: 1,
      ease: "power2.inOut",
      onStart: () => setActiveSection(2),
    });

     scrollTl.current.to(ref.current.rotation, {
        x: -(Math.PI * 0.40),
        y: -(Math.PI * 0.25), 
        z: -(Math.PI * 0.15),
        duration: 1,
        ease: "power2.inOut",
      }, "<");

    // === SECTION 4 (60–80%) ===
    scrollTl.current.to(ref.current.position, {
      x: 0.1,
      z: 0,
      duration: 1,
      ease: "power2.inOut",
      onStart: () => setActiveSection(3),
    });

    // === SECTION 5 (80–100%) ===
    scrollTl.current.to(ref.current.position, {
      x: 0.1,
      z: 0,
      duration: 1,
      ease: "power2.inOut",
      onStart: () => setActiveSection(4),
    });
  }, [setActiveSection]);
  
  return (
    <group ref={ref}>
      <primitive object={model.scene} position={[0, -0.025, 0]} scale={0.02} />
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

        <ScrollControls pages={5} damping={0.5}>
          {/* Models */}
          <HeadphoneModel />
        </ScrollControls>
      </>
    );
}

export default Experience