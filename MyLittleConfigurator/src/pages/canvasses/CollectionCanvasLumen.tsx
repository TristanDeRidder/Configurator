import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";



const HeadphoneModel = () => {
    const model = useGLTF(new URL("../../models/Lumen.glb", import.meta.url).href);
    const ref = useRef<Group>(null);

    return (
        <group ref={ref}>
            <primitive object={(model as any).scene} position={[0, -0.025, 0]} scale={0.02}/>
        </group>
    );
}

const collectionCanvas = () => {
    return (
        <>
        <directionalLight position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1} />
        <OrbitControls makeDefault/>

        <HeadphoneModel />
        
        </>
    );
}

export default collectionCanvas;