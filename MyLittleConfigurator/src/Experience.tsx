
import { OrbitControls, ScrollControls, useGLTF, useScroll, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
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
      // ============================================
      // INTRO ANIMATION (plays on load)
      // ============================================
      introTl.current = gsap.timeline({
        onComplete: () => {
          introComplete.current = true;
        }
      });
      
      // Initial entrance animation - customize as needed
      introTl.current.to(ref.current.rotation, {
        y: Math.PI * 0.0834, // 15 degrees
        z: -(Math.PI * 0.0417), // -7.5 degrees roll
        duration: 2,
        ease: "power2.out",
      });

      introTl.current.to(ref.current.position, {
        z: 0.1, // Move toward camera
        duration: 1.5,
        ease: "power3.out",
      }, 0);

      // Auto-play intro after short delay
      setTimeout(() => introTl.current.play(), 500);

      // ============================================
      // SCROLL KEYFRAME SYSTEM
      // ============================================
      // Create timeline for scroll-controlled keyframes
      scrollTl.current = gsap.timeline({ paused: true });

      // KEYFRAME 1: Initial state (0% scroll)
      // Starting from intro animation end state
      
      // KEYFRAME 2: First scroll section (0-33% of scroll)
      scrollTl.current.to(ref.current.position, {
        z: 0.35, // Move closer
        duration: 1,
        ease: "power2.inOut",
      }, 0); // Start at timeline position 0
      
      scrollTl.current.to(ref.current.rotation, {
        y: -(Math.PI * 0.333), // 90 degrees
        duration: 1,
        ease: "power2.inOut",
      }, 0);

       // KEYFRAME 3: Second scroll section (33-66% of scroll)
       scrollTl.current.to(ref.current.position, {
         x: .15,
         z: -(0.15),
         duration: 1,
         ease: "power2.inOut",
       }); // Continues from previous (sequential)
      
       scrollTl.current.to(ref.current.rotation, {
         x: -(Math.PI * 0.40),
         y: -(Math.PI * 0.25), 
         z: -(Math.PI * 0.15),
         duration: 1,
         ease: "power2.inOut",
       }, "<"); // "<" means start at same time as previous
      //  scrollTl.current.to(ref.current.rotation, {
      //    x: -(Math.PI * 0.5), // 45 degrees tilt,
      //    y: -(Math.PI * 0.25), // 90 degree roll
      //    duration: 1,
      //    ease: "power2.inOut",
      //  }, "<"); // "<" means start at same time as previous
      

      // // KEYFRAME 4: Final scroll section (66-100% of scroll)
       scrollTl.current.to(ref.current.position, {
         x: .1,
         z: 0,
         duration: 1,
         ease: "power2.inOut",
       });
      

      // Add more keyframes by adding more .to() calls
      // The timeline will automatically distribute them across scroll range
    }
  }, []);

  return (
    <group ref={ref}>
      <primitive object={model.scene} position={[0, -0.025, 0]} scale={0.02} />
    </group>
  );
};

// Text overlay component that changes based on scroll
const ScrollText = () => {
  const scroll = useScroll();
  const [activeSection, setActiveSection] = useState(0);

  useFrame(() => {
    const offset = scroll.offset;
    
    // Determine which section is active based on scroll position
    if (offset < 0.33) {
      setActiveSection(0);
    } else if (offset < 0.66) {
      setActiveSection(1);
    } else {
      setActiveSection(2);
    }
  });

  // Text content for each keyframe section
  const sections = [
    {
      title: "Premium Sound Quality",
      description: "Experience crystal-clear audio with advanced noise cancellation"
    },
    {
      title: "Comfortable Design",
      description: "Ergonomic fit for all-day listening comfort"
    },
    {
      title: "Long Battery Life",
      description: "Up to 30 hours of uninterrupted playback"
    }
  ];

  return (
    <Html fullscreen>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 10
      }}>
        {sections.map((section, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'white',
              opacity: activeSection === index ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              pointerEvents: 'none'
            }}
          >
            <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>{section.title}</h1>
            <p style={{ fontSize: '1.5rem', margin: 0 }}>{section.description}</p>
          </div>
        ))}
      </div>
    </Html>
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
          
          {/* Text overlay - inside ScrollControls to access useScroll */}
          <ScrollText />
        </ScrollControls>
      </>
    );
}

export default Experience