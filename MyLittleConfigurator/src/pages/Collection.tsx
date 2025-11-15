import { Canvas } from "@react-three/fiber";
import { Link } from "react-router-dom";
import CollectionCanvasLumen from "./canvasses/CollectionCanvasLumen";
import CollectionCanvasNoiré from "./canvasses/CollectionCanvasNoiré";

const cameraSettings = {
  fov: 20,
  near: 0.1,
  far: 200,
  position: [0, 0, 0.5] as [number, number, number],
};

const Collection = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Half - Dark Background (LUMEN) */}
      <div className="w-full md:w-1/2 bg-bg text-white p-8 md:p-16 flex flex-col justify-center items-center min-h-screen">
        <div className="max-w-xl w-full">
          <Link to="/" className="inline-block text-primary hover:text-white transition-colors mb-8">
            ← Back to Home
          </Link>
          
          <div className="flex flex-col items-center text-center">
            {/* Placeholder for headphone image */}
            <div className="w-64 h-64 mb-8 flex items-center justify-center">
              <Canvas camera={cameraSettings} >
                <CollectionCanvasLumen />
              </Canvas>
            </div>
            
            <h2 className="text-7xl font-bold mb-4" style={{ letterSpacing: '-0.1em' }}>LUMEN</h2>
            <p className="text-primary text-lg mb-6">
              The openness of light — pure, spatial, detailed.
            </p>
            <Link 
              to="/collection/lumen" 
              className="inline-block bg-primary text-bg rounded px-16 py-4 font-semibold hover:bg-white transition-colors"
            >
              Buy now
            </Link>
          </div>
        </div>
      </div>

      {/* Right Half - Light Background (NOIRÉ) */}
      <div className="w-full md:w-1/2 bg-primary text-bg p-8 md:p-16 flex flex-col justify-center items-center min-h-screen">
        <div className="max-w-xl w-full">
          <div className="flex flex-col items-center text-center">
            {/* Placeholder for headphone image */}
            <div className="w-64 h-64 mb-8 flex items-center justify-center">
              {/* Add your NOIRÉ headphone image here */}
              <Canvas camera={cameraSettings} >
                <CollectionCanvasNoiré />
              </Canvas>
            </div>

            <h2 className="text-7xl font-bold mb-4" style={{ letterSpacing: '-0.1em'}}>NOIRÉ</h2>
            <p className="text-bg text-lg mb-6">
              The gravity of depth — warm, resonant, immersive.
            </p>
            <Link 
              to="/collection/noire" 
              className="inline-block bg-bg text-primary rounded px-16 py-4 font-semibold hover:bg-black transition-colors"
            >
              Buy now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
