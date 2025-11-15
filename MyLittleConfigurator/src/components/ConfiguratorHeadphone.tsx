import { useGLTF } from "@react-three/drei";
import { useConfiguratorStore } from "../stores/configuratorStore";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import type { Group } from "three";
import * as THREE from "three";
import useMaterialAnimator from "../hooks/useMaterialAnimator";
import {
  LUMEN_NO_EAR,
  NOIRE_NO_EAR,
  NOIRE_EAR_WITH_JACK,
  NOIRE_EAR_NO_JACK,
  NOIRE_COMFORT_CUPS,
  NOIRE_STUDIO_CUPS,
  NOIRE_OPEN_CUPS,
  LUMEN_EAR_WITH_JACK,
  LUMEN_EAR_NO_JACK,
} from "../utils/models";

const ConfiguratorHeadphone = ({ modelId }: { modelId?: string }) => {
  const selectedCushion = useConfiguratorStore((state) => state.selectedCushion);
  const selectedColor = useConfiguratorStore((state) => state.selectedColor);
  const selectedConnectivity = useConfiguratorStore((state) => state.selectedConnectivity);
  const selectedMaterial = useConfiguratorStore((state) => state.selectedMaterial);
  const previousCushion = useRef(selectedCushion);
  const previousConnection = useRef(selectedConnectivity);
  const isInitialized = useRef(false);
  const isJackInitialized = useRef(false);
  
  // Determine which model to load based on modelId
  const modelName = modelId === "lumen" ? "LumenNoEarPiece" : "NoiréNoEarpiece";

  const modelUrl = modelId === "lumen" ? LUMEN_NO_EAR : NOIRE_NO_EAR;
  const model = useGLTF(modelUrl);

  const NJack = useGLTF(NOIRE_EAR_WITH_JACK);
  const NNoJack = useGLTF(NOIRE_EAR_NO_JACK);

  const NJackRef = useRef<Group>(null);
  const NNoJackRef = useRef<Group>(null);

  const comfort = useGLTF(NOIRE_COMFORT_CUPS);
  const studio = useGLTF(NOIRE_STUDIO_CUPS);
  const open = useGLTF(NOIRE_OPEN_CUPS);
  
  const comfortRef = useRef<Group>(null);
  const studioRef = useRef<Group>(null);
  const openRef = useRef<Group>(null);

  const LJack = useGLTF(LUMEN_EAR_WITH_JACK);
  const LNoJack = useGLTF(LUMEN_EAR_NO_JACK);

  const LJackRef = useRef<Group>(null);
  const LNoJackRef = useRef<Group>(null);

  const targetColorRef = useRef(new THREE.Color());
  const targetRoughnessRef = useRef(0.6); // default brushed aluminum roughness
  const targetMetalnessRef = useRef(0.5); // default brushed aluminum metalness

  // Material finish presets (tweak as desired)
  const MATERIAL_PRESETS: Record<string, { roughness: number; metalness: number }> = {
    aluminum: { roughness: 0.6, metalness: 0.5 }, // brushed look: more diffuse, less metallic shine
    titanium: { roughness: 0.35, metalness: 0.85 }, // polished look: smoother surface, higher metallic reflectance
  };

  // Color mapping
  const colorMap: Record<string, string> = {
    black: "#1a1a1a",
    silver: "#c0c0c0",
    beige: "#E7E5C4",
  };

  // Materials that should change color (frame/body parts only)
  const COLORABLE_MATERIALS = [
    'Headphone',
  ];

  // Materials that should NOT change color (cushions, internals, etc.)
  const NON_COLORABLE_MATERIALS = [
    'cushion',
    'metallic',
    'leather',
    'velour',
    'innerparts',
    'inner',
    'fabric',
    'foam',
    'padding',
  ];

  // Update target color when selectedColor changes
  useEffect(() => {
    const hexColor = colorMap[selectedColor] || colorMap.black;
    targetColorRef.current.set(hexColor);
  }, [selectedColor]);

  // Update roughness/metalness targets when material finish changes
  useEffect(() => {
    const preset = MATERIAL_PRESETS[selectedMaterial] || MATERIAL_PRESETS.aluminum;
    targetRoughnessRef.current = preset.roughness;
    targetMetalnessRef.current = preset.metalness;
  }, [selectedMaterial]);

  // Smooth color interpolation
  const baseRef = useRef<Group>(null);

  useMaterialAnimator({
    groups: [NJackRef, NNoJackRef, comfortRef, studioRef, openRef, LJackRef, LNoJackRef, baseRef],
    targetColorRef,
    targetRoughnessRef,
    targetMetalnessRef,
    colorableNames: COLORABLE_MATERIALS,
    nonColorableNames: NON_COLORABLE_MATERIALS,
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

  // Initialize jack positions on mount (for both Lumen and Noiré models)
  useEffect(() => {
    if (isJackInitialized.current) return;
    
    const jackRefs = {
      wired: [LJackRef, NJackRef],
      bluetooth: [LNoJackRef, NNoJackRef],
    };

    // Set initial positions - selected one at 0, others far away
    Object.entries(jackRefs).forEach(([key, refs]) => {
      refs.forEach(ref => {
        if (ref.current) {
          const isSelected = key === selectedConnectivity;
          
          gsap.set(ref.current.position, {
            x: 0,
            y: -0.025,
            z: isSelected ? 0 : -5,
          });
          
          // Set visibility - only selected is visible
          ref.current.visible = isSelected;
        }
      });
    });

    isJackInitialized.current = true;
  }, [selectedConnectivity]);

  // Animate cushion changes
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

  // Animate connectivity/jack changes (for both Lumen and Noiré models)
  useEffect(() => {
    if (!isJackInitialized.current) return;
    if (previousConnection.current === selectedConnectivity) return;

    const jackRefs = {
      wired: [LJackRef, NJackRef],
      bluetooth: [LNoJackRef, NNoJackRef],
    };

    const prevRefs = jackRefs[previousConnection.current as keyof typeof jackRefs];
    const currentRefs = jackRefs[selectedConnectivity as keyof typeof jackRefs];

    // Animate out the previous jacks (move them back far away)
    if (prevRefs) {
      prevRefs.forEach(prevRef => {
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
      });
    }

    // Animate in the new jacks
    if (currentRefs) {
      currentRefs.forEach(currentRef => {
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
      });
    }

    previousConnection.current = selectedConnectivity;
  }, [selectedConnectivity]);

  
  return (
    <group>
      {/* Base headphone model (without cups) */}
      <group ref={baseRef}>
        <primitive object={model.scene} position={[0, -0.025, 0]} scale={0.02} />
      </group>

      {modelName === "NoiréNoEarpiece" && (
        <>
          <group ref={NJackRef}>
            <primitive object={NJack.scene} scale={0.02} />
          </group>
          <group ref={NNoJackRef}>
            <primitive object={NNoJack.scene} scale={0.02} />
          </group>

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

      {modelName === "LumenNoEarPiece" && (
        <>
          {/* Lumen ear piece with/without jack */}
          <group ref={LJackRef}>
            <primitive object={LJack.scene} scale={0.02} />
          </group>  
          <group ref={LNoJackRef}>
            <primitive object={LNoJack.scene} scale={0.02} />
          </group>
        </>
      )}
    </group>
  );
};

export default ConfiguratorHeadphone;
