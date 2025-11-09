import { ScrollControls, useGLTF, useScroll, Scroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import type { Group } from "three";
import { useScrollContext } from "../../contexts/ScrollContext";
import TextOverlay from "../../components/TextOverlay";

const HeadphoneModel = () => {
  const noiré = useGLTF(new URL("../../models/HeadphoneV3.glb", import.meta.url).href);
  // Preload other variant (commented out usage for now)
  // const lumen = useGLTF(new URL("../../models/Lumen.glb", import.meta.url).href);
  const ref = useRef<Group>(null);
  const introTl = useRef<gsap.core.Timeline>(null!);
  const scrollTl = useRef<gsap.core.Timeline>(null!);
  const introComplete = useRef(false);
  const scroll = useScroll();
  const { updateScrollProgress, setActiveSection } = useScrollContext();

  // Smoothed progress value (manual lerp instead of spawning a GSAP tween each frame)
  const smoothProgress = useRef(0);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  


  useFrame(() => {

    const progress = scroll.offset;
    updateScrollProgress(progress);

    if (!introComplete.current || !scrollTl.current) return;

    const timeline = scrollTl.current;

    // Your segments (one for each text section)
    const sections = [0, 0.2, 0.4, 0.6, 0.8, 1];

    // Which section are we in?
    let currentSection = 0;
    for (let i = 0; i < sections.length - 1; i++) {
      if (progress >= sections[i] && progress < sections[i + 1]) {
        currentSection = i;
        break;
      }
    }

    setActiveSection((prev) => (prev !== currentSection ? currentSection : prev));

    // Local progress in the current section
    const start = sections[currentSection];
    const end = sections[currentSection + 1];
    const localProgress = (progress - start) / (end - start);

    // Smoother deadzone with gradual blend
    const deadzone = 0.3;
    
    let targetProgress;

    if (localProgress < deadzone) {
      // Gradually blend toward start pose
      const blendFactor = Math.max(0, (deadzone - localProgress) / deadzone);
      targetProgress = lerp(progress, start, blendFactor);
    } else if (localProgress > 1 - deadzone) {
      // Gradually blend toward end pose
      const blendFactor = Math.max(0, (localProgress - (1 - deadzone)) / deadzone);
      targetProgress = lerp(progress, end, blendFactor);
    } else {
      // Free scroll in the middle zone
      targetProgress = progress;
    }

    // Smoothly approach the target progress with adaptive lerp speed
  // Lower lerp speed to slow down perceived transition responsiveness (more floaty)
  const lerpSpeed = 0.06; // previously 0.12
    smoothProgress.current = lerp(smoothProgress.current, targetProgress, lerpSpeed);
    timeline.progress(smoothProgress.current);

    if (!ref.current) return;

    const idle = Math.sin(smoothProgress.current * Math.PI * 2) * 0.003; // ~3mm float
    ref.current.position.y = idle * 0.12;
    ref.current.rotation.z = idle * 0.15;




  });

  useLayoutEffect(() => {
    if (!ref.current) return;

    introTl.current = gsap.timeline({
      onComplete: () => {
        introComplete.current = true;
      },
    });

    introTl.current.to(ref.current.rotation, {
      x: 0,
      y: Math.PI * 0.0834,
      z: -(Math.PI * 0.0417),
      duration: 2,
      ease: "power2.out",
    });

    introTl.current.to(ref.current.position, {
      x: 0,
      y: 0,
      z: 0.1,
      duration: 0.2,
      ease: "power3.out",
    }, 0);

    scrollTl.current = gsap.timeline({ paused: true });

    // Timeline structure: 5 sections matching [0, 0.2, 0.4, 0.6, 0.8, 1]
    // Section 0 (scroll 0.0-0.2) = Hold introTl end pose (Section 1 visual)
    // Section 1 (scroll 0.2-0.4) = Transition to old Section 1 values (Section 2 visual)
    // Section 2 (scroll 0.4-0.6) = Transition to old Section 2 values (Section 3 visual)
    // Section 3 (scroll 0.6-0.8) = Transition to old Section 3 values (Section 4 visual)
    // Section 4 (scroll 0.8-1.0) = Transition to old Section 4 values (Section 5 visual)

    // === SECTION 1 (Scroll 0.0 - 0.2) ===
    // Hold the introTl end position (matching intro end state)
    scrollTl.current.to(ref.current.position, {
      x: 0,
      y: 0,
      z: 0.1,
      duration: 0.2,
      ease: "none",
    }, 0);
    scrollTl.current.to(ref.current.rotation, {
      x: 0,
      y: Math.PI * 0.0834,
      z: -(Math.PI * 0.0417),
      duration: 0.2,
      ease: "none",
    }, 0);

    // === SECTION 2 (Scroll 0.2 - 0.4) ===
    // TRANSITION at start (to old Section 1 values)
    scrollTl.current.to(ref.current.position, {
      x: 0,
      y: 0,
      z: 0.1,
      duration: 0.2,
      ease: "sine.inOut",
    }, 0.2);
    scrollTl.current.to(ref.current.rotation, {
      x: 0,
      y: Math.PI * 0.0834,
      z: -(Math.PI * 0.0417),
      duration: 0.2,
      ease: "sine.inOut",
    }, 0.2);
    // HOLD for rest of section
    scrollTl.current.to(ref.current.position, {
      x: 0,
      y: 0,
      z: 0.1,
      duration: 0.2,
      ease: "none",
    }, 0.28);
    scrollTl.current.to(ref.current.rotation, {
      x: 0,
      y: Math.PI * 0.0834,
      z: -(Math.PI * 0.0417),
      duration: 0.2,
      ease: "none",
    }, 0.28);

    // === SECTION 3 (Scroll 0.4 - 0.6) ===
    // TRANSITION at start (to old Section 2 values)
    scrollTl.current.to(ref.current.position, {
       x: 0.015,
      y: 0,
      z: 0.3,
      duration: 0.12,
      ease: "sine.inOut",
    }, 0.4);
    scrollTl.current.to(ref.current.rotation, {
      x: 0,
      y: -(Math.PI * 0.333),
      z: 0,
      duration: 0.2,
      ease: "sine.inOut",
    }, 0.4);
    // HOLD for rest of section
    scrollTl.current.to(ref.current.position, {
      x: 0.015,
      y: 0,
      z: 0.3,
      duration: 0.2,
      ease: "none",
    }, 0.48);
    scrollTl.current.to(ref.current.rotation, {
      x: 0,
      y: -(Math.PI * 0.333),
      z: 0,
      duration: 0.2,
      ease: "none",
    }, 0.48);

    // === SECTION 4 (Scroll 0.6 - 0.8) ===
    // TRANSITION at start (to old Section 3 values)
    scrollTl.current.to(ref.current.position, {
      x: 0.05,
      y: 0,
      z: 0,
      duration: 0.2,
      ease: "sine.inOut",
    }, 0.6);
    scrollTl.current.to(ref.current.rotation, {
      x: -(Math.PI * 0.30),
      y: -(Math.PI * 0.20),
      z: -(Math.PI * 0.10),
      duration: 0.2,
      ease: "sine.inOut",
    }, 0.6);
    // HOLD for rest of section
    scrollTl.current.to(ref.current.position, {
      x: 0.05,
      y: 0,
      z: 0,
      duration: 0.2,
      ease: "none",
    }, 0.68);
    scrollTl.current.to(ref.current.rotation, {
      x: -(Math.PI * 0.30),
      y: -(Math.PI * 0.20),
      z: -(Math.PI * 0.10),
      duration: 0.2,
      ease: "none",
    }, 0.68);

    // === SECTION 5 (Scroll 0.8 - 1.0) ===
    // TRANSITION at start (to old Section 4 values)
    scrollTl.current.to(ref.current.position, {
      x: 0.1,
      y: 0,
      z: 0.12,
      duration: 0.2,
      ease: "sine.inOut",
    }, 0.8);
    scrollTl.current.to(ref.current.rotation, {
      x: -(Math.PI * 0.15),
      y: Math.PI * 0.1,
      z: -(Math.PI * 0.05),
      duration: 0.2,
      ease: "sine.inOut",
    }, 0.8);
    // HOLD for rest of section
    scrollTl.current.to(ref.current.position, {
      x: 0.1,
      y: 0,
      z: 0.12,
      duration: 0.2,
      ease: "none",
    }, 0.88);
    scrollTl.current.to(ref.current.rotation, {
      x: -(Math.PI * 0.15),
      y: Math.PI * 0.1,
      z: -(Math.PI * 0.05),
      duration: 0.2,
      ease: "none",
    }, 0.88);

  }, [setActiveSection]);

  return (
    <group ref={ref}>
      <primitive object={noiré.scene} position={[0, -0.025, 0]} scale={0.02} />
      {/* <primitive object={lumen.scene} position={[0, -0.025, 0]} scale={0.02} /> */}
    </group>
  );
};


const Experience = () => {
  return (
    <>
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1} />

      {/* IMPORTANT: TextOverlay must be INSIDE ScrollControls */}
      {/* Ensure enough pages for all sections; damping for inertia */}
      <ScrollControls pages={5} damping={0.25}>
        <HeadphoneModel />

        {/* HTML overlay (z-index + pointer events restored for interactive elements) */}
        <Scroll html>
          <div style={{ position: "relative", zIndex: 10, pointerEvents: "auto", width: "100vw" }}>
            <TextOverlay />
          </div>
        </Scroll>
      </ScrollControls>
    </>
  );
}

export default Experience