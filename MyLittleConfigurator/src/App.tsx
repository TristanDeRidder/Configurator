import { Canvas, useFrame } from '@react-three/fiber'
import type { ThreeElements } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import type { Mesh } from 'three'

function SpinningBox(props: ThreeElements['mesh']) {
	const ref = useRef<Mesh>(null)
	useFrame((_, delta) => {
		if (!ref.current) return
		ref.current.rotation.x += delta * 0.5
		ref.current.rotation.y += delta * 0.8
	})
	return (
		<mesh ref={ref} {...props} castShadow>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color="#8ac" />
		</mesh>
	)
}

export default function App() {
	return (
		<Canvas
			shadows
			camera={{ position: [3, 2, 4], fov: 60 }}
			style={{ width: '100%', height: '100%' }}
		>
			{/* Lights */}
			<ambientLight intensity={0.4} />
			<directionalLight
				position={[5, 5, 5]}
				intensity={1}
				castShadow
				shadow-mapSize-width={1024}
				shadow-mapSize-height={1024}
			/>

			{/* Objects */}
			<SpinningBox position={[0, 1, 0]} />
			<mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
				<planeGeometry args={[20, 20]} />
				<meshStandardMaterial color="#222" />
			</mesh>

			{/* Controls */}
			<OrbitControls enableDamping dampingFactor={0.1} />
		</Canvas>
	)
}

