import React from 'react';
import { Environment } from '@react-three/drei';

type Props = {
  preset?: string;
  directionalIntensity?: number;
  ambientIntensity?: number;
};

export default function CanvasLights({
  preset = 'studio',
  directionalIntensity = 4.5,
  ambientIntensity = 1,
}: Props) {
  return (
    <>
      <directionalLight position={[1, 2, 3]} intensity={directionalIntensity} />
      <ambientLight intensity={ambientIntensity} />
      <Environment preset={preset as any} />
    </>
  );
}
