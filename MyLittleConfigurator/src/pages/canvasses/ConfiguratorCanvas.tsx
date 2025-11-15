import { Environment } from "@react-three/drei";
import CanvasControls from "../../components/CanvasControls";
import ConfiguratorHeadphone from "../../components/ConfiguratorHeadphone";

const Experience = ({ modelId }: { modelId?: string }) => {

    return (
      <>
        {/* Controls */}
        <CanvasControls enableZoom={false} />

        {/* Lights */}
        <directionalLight position={[1, 2, 3]} intensity={4.5} />
        <Environment preset="studio" />

        {/* Models */}
        <ConfiguratorHeadphone modelId={modelId} />
      </>
    );
}

export default Experience