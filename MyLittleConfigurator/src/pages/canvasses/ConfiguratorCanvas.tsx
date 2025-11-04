import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { useConfiguratorStore } from "../../stores/configuratorStore";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import type { Group } from "three";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const HeadphoneModel = ({ modelId }: { modelId?: string }) => {
  const selectedCushion = useConfiguratorStore((state) => state.selectedCushion);
  const selectedColor = useConfiguratorStore((state) => state.selectedColor);
  const previousCushion = useRef(selectedCushion);
  const isInitialized = useRef(false);
  
  // Determine which model to load based on modelId
  const modelName = modelId === "lumen" ? "Lumen" : "Noiré";
  
  const model = useGLTF(new URL(`../../models/${modelName}.glb`, import.meta.url).href);
  const comfort = useGLTF(new URL("../../models/noiréComfortCups.glb", import.meta.url).href);
  const studio = useGLTF(new URL("../../models/noiréStudioCups.glb", import.meta.url).href);
  const open = useGLTF(new URL("../../models/noiréOpenCups.glb", import.meta.url).href);

  const comfortRef = useRef<Group>(null);
  const studioRef = useRef<Group>(null);
  const openRef = useRef<Group>(null);

  const targetColorRef = useRef(new THREE.Color());

  // Color mapping
  const colorMap: Record<string, string> = {
    black: "#1a1a1a",
    silver: "#c0c0c0",
    gray: "#6b6b6b",
  };

  // Update target color when selectedColor changes
  useEffect(() => {
    const hexColor = colorMap[selectedColor] || colorMap.black;
    targetColorRef.current.set(hexColor);
  }, [selectedColor]);

  // Smooth color interpolation
  useFrame(() => {
    const updateModelColors = (group: Group | null) => {
      if (!group) return;
      
      group.traverse((child: any) => {
        if (child.isMesh && child.material) {
          const material = child.material;
          if (material.color) {
            material.color.lerp(targetColorRef.current, 0.1);
          }
        }
      });
    };

    // Update all models
    updateModelColors(comfortRef.current);
    updateModelColors(studioRef.current);
    updateModelColors(openRef.current);
    
    // Also update base model if it has materials to change
    if (model.scene) {
      model.scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          const material = child.material;
          if (material.color) {
            material.color.lerp(targetColorRef.current, 0.1);
          }
        }
      });
    }
  });

  // Initialize positions on mount
  useEffect(() => {
    if (isInitialized.current) return;
    
    const refs = {
      comfort: comfortRef,
      studio: studioRef,
      open: openRef,
    };

    // Set initial positions - selected one at 0, others far away
    Object.entries(refs).forEach(([key, ref]) => {
      if (ref.current) {
        const isSelected = key === selectedCushion;
        
        gsap.set(ref.current.position, {
          x: 0,
          y: -0.025,
          z: isSelected ? 0 : -5,
        });
        
        // Set visibility - only selected is visible
        ref.current.visible = isSelected;
      }
    });

    isInitialized.current = true;
  }, [selectedCushion]);

  useEffect(() => {
    if (!isInitialized.current) return;
    if (previousCushion.current === selectedCushion) return;

    const refs = {
      comfort: comfortRef,
      studio: studioRef,
      open: openRef,
    };

    const prevRef = refs[previousCushion.current as keyof typeof refs];
    const currentRef = refs[selectedCushion as keyof typeof refs];

    // Animate out the previous cushion (move it back far away)
    if (prevRef?.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          // Hide after animation completes
          if (prevRef.current) {
            prevRef.current.visible = false;
          }
        }
      });
      
      // First move back (z-axis)
      tl.to(prevRef.current.position, {
        z: -1,
        duration: 0.4,
        ease: "power2.in",
      });
      
      // Then move left (x-axis) after back movement is complete
      tl.to(prevRef.current.position, {
        x: -1,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    // Animate in the new cushion
    if (currentRef?.current) {
      // Make visible first
      currentRef.current.visible = true;
      
      // Start from forward position
      gsap.set(currentRef.current.position, {
        x: 0,
        y: -0.025,
        z: 5,
      });

      // Animate to normal position
      gsap.to(currentRef.current.position, {
        z: 0,
        duration: 0.4,
        delay: 0.2,
        ease: "power2.out",
      });
    }

    previousCushion.current = selectedCushion;
  }, [selectedCushion]);

  
  return (
    <group>
      {/* Base headphone model (without cups) */}
      <primitive object={model.scene} position={[0, -0.025, 0]} scale={0.02} />

      {modelName === "Noiré" && (
        <>
          {/* All cup models always rendered, GSAP controls position */}
          <group ref={comfortRef}>
            <primitive object={comfort.scene} scale={0.02} />
          </group>
          
          <group ref={studioRef}>
            <primitive object={studio.scene} scale={0.02} />
          </group>
          
          <group ref={openRef}>
            <primitive object={open.scene} scale={0.02} />
          </group>
        </>
      )}
    </group>
  );
};


const Experience = ({ modelId }: { modelId?: string }) => {

    return (
      <>
        {/* Controls */}
        <OrbitControls makeDefault enableZoom={false} />

        {/* Lights */}
        <directionalLight position={[1, 2, 3]} intensity={4.5} />
        <Environment preset="studio" />

        {/* Models */}
        <HeadphoneModel modelId={modelId} />
      </>
    );
}

export default Experience