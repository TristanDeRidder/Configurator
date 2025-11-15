import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import * as THREE from 'three';
import React from 'react';

type Options = {
  groups: Array<React.RefObject<Group | null>>;
  targetColorRef: React.RefObject<THREE.Color>;
  targetRoughnessRef: React.MutableRefObject<number>;
  targetMetalnessRef: React.MutableRefObject<number>;
  colorableNames: string[];
  nonColorableNames: string[];
};

export default function useMaterialAnimator({
  groups,
  targetColorRef,
  targetRoughnessRef,
  targetMetalnessRef,
  colorableNames,
  nonColorableNames,
}: Options) {
  useFrame(() => {
    const updateModelColors = (group: Group | null) => {
      if (!group) return;

      group.traverse((child: any) => {
        if (child.isMesh && child.material) {
          const material = child.material;
          const materialName = (material.name || '').toLowerCase();

          // Exclusions have priority
          const isNonColorable = nonColorableNames.some(name => materialName.includes(name.toLowerCase()));
          if (isNonColorable) return;

          const shouldUpdateColor = colorableNames.some(name => materialName.includes(name.toLowerCase()));
          if (material.color && shouldUpdateColor) {
            material.color.lerp(targetColorRef.current, 0.1);
          }

          if (materialName.includes('headphone')) {
            if (typeof material.roughness === 'number') {
              material.roughness = THREE.MathUtils.lerp(material.roughness, targetRoughnessRef.current, 0.15);
            }
            if (typeof material.metalness === 'number') {
              material.metalness = THREE.MathUtils.lerp(material.metalness, targetMetalnessRef.current, 0.15);
            }
          }
        }
      });
    };

    groups.forEach(ref => {
      if (!ref) return;
      updateModelColors(ref.current ?? null);
    });
  });
}
