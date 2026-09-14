import { Environment } from '@react-three/drei';
import type { ComponentProps } from 'react';

type EnvironmentPreset = ComponentProps<typeof Environment>['preset'];

type Props = {
  preset?: EnvironmentPreset;
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
      <Environment preset={preset} />
    </>
  );
}
