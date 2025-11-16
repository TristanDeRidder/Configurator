import React from 'react';
import { OrbitControls } from '@react-three/drei';

type Props = {
  enableZoom?: boolean;
  makeDefault?: boolean;
};

export default function CanvasControls({ enableZoom = false, makeDefault = true }: Props) {
  return <OrbitControls makeDefault={makeDefault} enableZoom={enableZoom} />;
}
