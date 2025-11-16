import { ScrollControls, useGLTF, useScroll, Scroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import type { Group } from "three";
import { useScrollContext } from "../../contexts/ScrollContext";
import TextOverlay from "../../components/TextOverlay";

const HeadphoneModel = () => {
  const noiré = useGLTF(new URL("../../models/HeadphoneV3.glb", import.meta.url).href);
  const ref = useRef<Group>(null);
  const introTl = useRef<gsap.core.Timeline>(null!);
  const scrollTl = useRef<gsap.core.Timeline>(null!);
  const introComplete = useRef(false);
  const scroll = useScroll();
  const { updateScrollProgress, setActiveSection } = useScrollContext();

  // Smoothed progress value
  const smoothProgress = useRef(0);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
  


  useFrame(() => {
    // Clamp raw scroll offset to [0, 1] to avoid edge-case overshoots
    const progress = clamp01(scroll.offset);
    updateScrollProgress(progress);

    if (!introComplete.current || !scrollTl.current) return;

    const timeline = scrollTl.current;

  const sections = [0, 0.2, 0.4, 0.6, 0.8, 1];

    let currentSection = 0;
    for (let i = 0; i < sections.length - 1; i++) {
      if (progress >= sections[i] && progress < sections[i + 1]) {
        currentSection = i;
        break;
      }
    }
    if (progress === 1) {
      currentSection = sections.length - 2;
    }

    setActiveSection((prev) => (prev !== currentSection ? currentSection : prev));

    const start = sections[currentSection];
    const end = sections[currentSection + 1];
  const localProgress = (progress - start) / (end - start);

    // Smoother deadzone with gradual blend
    const deadzone = 0.3;
    
    let targetProgress;

    const edgeSnapThreshold = 0.999;
    if (progress >= edgeSnapThreshold) {
      targetProgress = 1;
    } else if (progress <= 1 - edgeSnapThreshold) {
      targetProgress = 0;
    } else {
      if (localProgress < deadzone) {
        const blendFactor = clamp01((deadzone - localProgress) / deadzone);
        targetProgress = lerp(progress, start, blendFactor);
      } else if (localProgress > 1 - deadzone) {
        const blendFactor = clamp01((localProgress - (1 - deadzone)) / deadzone);
        targetProgress = lerp(progress, end, blendFactor);
      } else {
        targetProgress = progress;
      }
    }

    // Smoothly approach the target progress with adaptive lerp speed
  const lerpSpeed = 0.06; // previously 0.12
    smoothProgress.current = lerp(smoothProgress.current, targetProgress, lerpSpeed);
    timeline.progress(clamp01(smoothProgress.current));

    if (!ref.current) return;

  const nearEdge = progress < 0.01 || progress > 0.99;
  const idle = nearEdge ? 0 : Math.sin(smoothProgress.current * Math.PI * 2) * 0.003; // ~3mm float
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

  scrollTl.current = gsap.timeline({ paused: true, defaults: { overwrite: "auto" } });

    // === SECTION 1 ===
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

    // === SECTION 2 ===
    // TRANSITION at start
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

    // === SECTION 3 ===
    // TRANSITION at start
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

    // === SECTION 4 ===
    // TRANSITION at start
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
      x: 0.1,
      y: 0,
      z: -(0.35),
      duration: 0.5,
      ease: "none",
    }, 0.68);
    scrollTl.current.to(ref.current.rotation, {
      x: -(Math.PI * 0.30),
      y: -(Math.PI * 0.20),
      z: -(Math.PI * 0.10),
      duration: 0.2,
      ease: "none",
    }, 0.68);

    // === SECTION 5 ===
    // Transition to original pose
    scrollTl.current.to(ref.current.position, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.2,
      ease: "sine.inOut",
    }, 0.8);
    scrollTl.current.to(ref.current.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.2,
      ease: "sine.inOut",
    }, 0.8);
    // Hold neutral pose
    scrollTl.current.to(ref.current.position, {
      x: 0,
      y: 0,
      z: 0.3,
      duration: 0.2,
      ease: "none",
    }, 0.88);
    scrollTl.current.to(ref.current.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.2,
      ease: "none",
    }, 0.88);

  }, [setActiveSection]);

  return (
    <group ref={ref}>
      <primitive object={noiré.scene} position={[0, -0.025, 0]} scale={0.02} />
    </group>
  );
};


const Experience = () => {
  return (
    <>
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1} />

      <ScrollControls pages={5} damping={0.25}>
        <HeadphoneModel />

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