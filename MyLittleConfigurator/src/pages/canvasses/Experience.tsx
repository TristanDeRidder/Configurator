import { OrbitControls, ScrollControls, useGLTF, useScroll, Scroll } from "@react-three/drei";
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

    // Deadzone section width
    const deadzone = 0.45;
  // (Removed easeDuration tween approach; manual lerp used instead)

    let targetProgress;

    if (localProgress < deadzone) {
      // Ease toward the *start pose*
      targetProgress = start;
    } else if (localProgress > 1 - deadzone) {
      // Ease toward the *end pose*
      targetProgress = end;
    } else {
      // Ease into the transition zone
      targetProgress = progress;
    }

    // Smoothly approach the target progress (no per-frame GSAP tween spam)
    smoothProgress.current = lerp(smoothProgress.current, targetProgress, 0.08);
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

    // Each section now: 60% hold, 40% transition (but transition stretched smoothly)

    // SECTION 1 HOLD
    scrollTl.current.to(ref.current.position, {
      z: 0.1,
      duration: 0.6,
      ease: "none",
    });

    // 1 → 2 TRANSITION (SLOW + FLOATY)
    scrollTl.current.to(ref.current.position, {
      z: 0.1,
      duration: 1.5,
      ease: "power3.out",
    }, 0);
    scrollTl.current.to(ref.current.rotation, {
      y: Math.PI * 0.0834,
      z: -(Math.PI * 0.0417),
      duration: 2,
      ease: "power2.out",
    });

    // SECTION 1 HOLD
    scrollTl.current.to(ref.current.position, {
      z: 0.1,
      duration: 0.6,
      ease: "none",
    });

    // 1 → 2 TRANSITION (SLOW + FLOATY)
    scrollTl.current.to(ref.current.position, {
      z: 0.38,
      duration: 1.4,
      ease: "sine.inOut",
    });
    scrollTl.current.to(ref.current.rotation, {
      y: -(Math.PI * 0.333),
      duration: 1.4,
      ease: "sine.inOut",
    }, "<");

    // SECTION 2 HOLD
    scrollTl.current.to(ref.current.position, {
      z: 0.38,
      duration: 0.6,
      ease: "none",
    });

    // 2 → 3 TRANSITION
    scrollTl.current.to(ref.current.position, {
      x: 0.15,
      y: 0,
      z: -0.15,
      duration: 1.4,
      ease: "sine.inOut",
    });

    scrollTl.current.to(ref.current.rotation, {
      x: -(Math.PI * 0.40),
      y: -(Math.PI * 0.25),
      z: -(Math.PI * 0.15),
      duration: 1.4,
      ease: "sine.inOut",
    }, "<");

    // SECTION 3 HOLD
    scrollTl.current.to(ref.current.position, {
      x: 0.15,
      z: -0.15,
      duration: 0.6,
      ease: "none",
    });

    // 3 → 4 TRANSITION
    scrollTl.current.to(ref.current.position, {
      x: 5,
      z: 0,
      duration: 1.4,
      ease: "sine.inOut",
    });

    // SECTION 4 HOLD
    scrollTl.current.to(ref.current.position, {
      x: 5,
      z: 0,
      duration: 0.6,
      ease: "none",
    });

    // 4 → 5 TRANSITION
    scrollTl.current.to(ref.current.position, {
      x: 0.1,
      z: 0.12,
      duration: 1.4,
      ease: "sine.inOut",
    });

    // SECTION 5 HOLD
    scrollTl.current.to(ref.current.position, {
      x: 0.1,
      z: 0.12,
      duration: 0.6,
      ease: "none",
    });

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
      <OrbitControls makeDefault enableZoom={false} />
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1} />

      {/* IMPORTANT: TextOverlay must be INSIDE ScrollControls */}
      {/* Ensure enough pages for all sections; damping for inertia */}
      <ScrollControls pages={5} damping={0.25}>
        <HeadphoneModel />

        {/* HTML overlay (z-index + pointer events restored for interactive elements) */}
        <Scroll html>
          <div style={{ position: "relative", zIndex: 10, pointerEvents: "auto" }}>
            <TextOverlay />
          </div>
        </Scroll>
      </ScrollControls>
    </>
  );
}

export default Experience