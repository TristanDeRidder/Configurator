import CanvasLights from "../../components/CanvasLights";
import SimpleGLTFModel from "../../components/SimpleGLTFModel";
import CanvasControls from "../../components/CanvasControls";

const collectionCanvas = () => {
    return (
        <>
        <CanvasLights />
        <CanvasControls />

        <SimpleGLTFModel src={new URL("../../models/HeadphoneV3.glb", import.meta.url).href} />

        </>
    );
}

export default collectionCanvas;