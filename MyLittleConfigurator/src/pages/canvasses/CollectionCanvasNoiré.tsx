import { OrbitControls } from "@react-three/drei";

import CanvasLights from "../../components/CanvasLights";
import SimpleGLTFModel from "../../components/SimpleGLTFModel";

const collectionCanvas = () => {
    return (
        <>
        <CanvasLights />
        <OrbitControls makeDefault />

        <SimpleGLTFModel src={new URL("../../models/HeadphoneV3.glb", import.meta.url).href} />

        </>
    );
}

export default collectionCanvas;