import { useGLTF } from '@react-three/drei'
import type { ThreeElements } from '@react-three/fiber'
import type { Material, Mesh } from 'three'

type HeadphoneGLTF = {
  nodes: {
    Cube003: Mesh
    Cube004: Mesh
    Circle013: Mesh
    Circle013_1: Mesh
    Circle013_2: Mesh
    Circle005: Mesh
    Circle008: Mesh
    Cylinder002: Mesh
    Circle006: Mesh
    Circle009: Mesh
    Circle020: Mesh
  }
  materials: Record<string, Material>
}

export function Headphone(props: ThreeElements['group']) {
  const { nodes, materials } = useGLTF('./models/HeadphoneV2.glb') as unknown as HeadphoneGLTF
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube003.geometry} material={materials.Headphone} position={[1.183, 2.888, 0.002]} scale={[0.14, 0.14, 0.218]} />
      <mesh geometry={nodes.Cube004.geometry} material={materials['Headphone.Cushion']} position={[0, 2.797, 0.002]} scale={[1, 1, 1.186]} />
      <group position={[1.613, 0.126, 0]} rotation={[0, 0, -0.152]}>
        <mesh geometry={nodes.Circle013.geometry} material={materials.Headphone} />
        <mesh geometry={nodes.Circle013_1.geometry} material={materials.Material} />
        <mesh geometry={nodes.Circle013_2.geometry} material={materials['Material.001']} />
        <mesh geometry={nodes.Circle005.geometry} material={materials['Headphone metallic']} position={[-0.022, 1.5, 0]} scale={[0.541, 0.992, 0.526]} />
        <mesh geometry={nodes.Circle008.geometry} material={materials['Material.002']} />
        <mesh geometry={nodes.Cylinder002.geometry} material={materials['Headphone metallic']} position={[0.005, 1.155, 0.285]} rotation={[-2.762, 0.057, 0.337]} scale={[0.601, 0.2, 0.601]} />
      </group>
      <mesh geometry={nodes.Circle006.geometry} material={materials.Headphone} position={[1.613, 0.126, 0]} rotation={[0, 0, -0.152]}>
        <mesh geometry={nodes.Circle009.geometry} material={materials['Material.002']} />
      </mesh>
      <mesh geometry={nodes.Circle020.geometry} material={materials['Headphone.Cushion']} position={[1.344, 0.194, 0.003]} rotation={[0, 0, -0.152]} />
    </group>
  )
}

useGLTF.preload('./models/HeadphoneV2.glb')
