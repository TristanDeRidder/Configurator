import React from 'react';
import { useGLTF } from '@react-three/drei';

type Props = {
  src: string;
  position?: [number, number, number];
  scale?: number | [number, number, number];
};

export default function SimpleGLTFModel({
  src,
  position = [0, -0.025, 0],
  scale = 0.02,
}: Props) {
  const model = useGLTF(src);

  return <primitive object={(model as any).scene} position={position} scale={scale} />;
}
