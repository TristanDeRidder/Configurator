import { Environment } from "@react-three/drei";
import CanvasControls from "../../components/CanvasControls";
import ConfiguratorHeadphone from "../../components/ConfiguratorHeadphone";

const Experience = ({ modelId }: { modelId?: string }) => {

    return (
      <>
        <CanvasControls enableZoom={false} />

        <directionalLight position={[1, 2, 3]} intensity={4.5} />
        <Environment preset="studio" />

        <ConfiguratorHeadphone modelId={modelId} />
      </>
    );
}

export default Experience