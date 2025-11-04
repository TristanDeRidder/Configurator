import { Link, useParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import Experience from "./canvasses/ConfiguratorCanvas";
import { useConfiguratorStore } from "../stores/configuratorStore";

const cameraSettings = {
    fov: 20,
    near: 0.1,
    far: 200,
    position: [0, 0, 0.5] as [number, number, number],
};


const Configurator = () => {
    const { modelId } = useParams<{ modelId: string }>();
    
    // Get configuration state and actions from Zustand store
    const {
        selectedColor,
        selectedMaterial,
        selectedCushion,
        selectedCable,
        selectedConnectivity,
        selectedCarry,
        setSelectedColor,
        setSelectedMaterial,
        setSelectedCushion,
        setSelectedCable,
        setSelectedConnectivity,
        setSelectedCarry,
    } = useConfiguratorStore();

    // Model configurations
    const models = {
        lumen: {
            name: "LUMEN",
            description: "Open-back, pure clarity",
            basePrice: 849,
            features: ["Aerospace-grade aluminum", "Premium leather headband", "40mm dynamic drivers", "Open-back design"]
        },
        noire: {
            name: "NOIRÉ",
            description: "Closed-back, deep immersion",
            basePrice: 899,
            features: ["Carbon fiber construction", "Memory foam cushions", "50mm planar magnetic drivers", "Closed-back design"]
        }
    };

    const currentModel = modelId ? models[modelId as keyof typeof models] : null;

    if (!currentModel) {
        return (
            <div className="min-h-screen bg-bg text-white p-8 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Model Not Found</h1>
                    <Link to="/collection" className="text-primary hover:text-white">
                        ← Back to Collection
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg text-white p-8">
            <div className="max-w-7xl mx-auto">
                <Link to="/collection" className="inline-block text-primary hover:text-white transition-colors mb-8">
                    ← Back to Collection
                </Link>



                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">

                    {/* Configuration Options */}
                    <div className="space-y-8">
                        <h1 className="text-9xl font-bold mb-2" style={{ letterSpacing: '-0.1em' }}>{currentModel.name}</h1>
                        <p className="text-primary text-xl mb-8">{currentModel.description}</p>

                        <div>
                            <h2 className="text-3xl font-bold mb-4">Color</h2>
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => setSelectedColor("black")}
                                    className={`w-16 h-16 rounded-full bg-zinc-900 border-2 transition-all ${
                                        selectedColor === "black" 
                                            ? "border-white scale-110" 
                                            : "border-white/20 hover:border-white/60 hover:scale-105"
                                    }`} 
                                />
                                <button 
                                    onClick={() => setSelectedColor("silver")}
                                    className={`w-16 h-16 rounded-full bg-zinc-300 border-2 transition-all ${
                                        selectedColor === "silver" 
                                            ? "border-white scale-110" 
                                            : "border-white/20 hover:border-white/60 hover:scale-105"
                                    }`} 
                                />
                                <button 
                                    onClick={() => setSelectedColor("gray")}
                                    className={`w-16 h-16 rounded-full bg-zinc-700 border-2 transition-all ${
                                        selectedColor === "gray" 
                                            ? "border-white scale-110" 
                                            : "border-white/20 hover:border-white/60 hover:scale-105"
                                    }`} 
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h2 className="text-lg font-bold mb-4">Materials</h2>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => setSelectedMaterial("aluminum")}
                                        className={`w-full p-2 rounded-lg transition-all ${
                                            selectedMaterial === "aluminum"
                                                ? "bg-primary text-black border-2 border-primary"
                                                : "bg-black text-white border border-white/20 hover:border-white/60 hover:bg-white/10"
                                        }`}
                                    >
                                        Brushed Aluminum
                                    </button>
                                    <button 
                                        onClick={() => setSelectedMaterial("titanium")}
                                        className={`w-full p-2 rounded-lg transition-all ${
                                            selectedMaterial === "titanium"
                                                ? "bg-primary text-black border-2 border-primary"
                                                : "bg-black text-white border border-white/20 hover:border-white/60 hover:bg-white/10"
                                        }`}
                                    >
                                        Polished Titanium
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold mb-4">Cushions</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => setSelectedCushion("comfort")}
                                        className={`p-2 rounded-lg transition-all ${
                                            selectedCushion === "comfort"
                                                ? "bg-primary text-black border-2 border-primary"
                                                : "bg-black text-white border border-white/20 hover:border-white/60 hover:bg-white/10"
                                        }`}
                                    >
                                        Comfort
                                    </button>
                                    <button 
                                        onClick={() => setSelectedCushion("studio")}
                                        className={`p-2 rounded-lg transition-all ${
                                            selectedCushion === "studio"
                                                ? "bg-primary text-black border-2 border-primary"
                                                : "bg-black text-white border border-white/20 hover:border-white/60 hover:bg-white/10"
                                        }`}
                                    >
                                        Studio
                                    </button>
                                    <button 
                                        onClick={() => setSelectedCushion("open")}
                                        className={`p-2 rounded-lg transition-all ${
                                            selectedCushion === "open"
                                                ? "bg-primary text-black border-2 border-primary"
                                                : "bg-black text-white border border-white/20 hover:border-white/60 hover:bg-white/10"
                                        }`}
                                    >
                                        Open
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold mb-4">Cable</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => setSelectedCable("charging")}
                                        className={`p-2 rounded-lg transition-all ${
                                            selectedCable === "charging"
                                                ? "bg-primary text-black border-2 border-primary"
                                                : "bg-black text-white border border-white/20 hover:border-white/60 hover:bg-white/10"
                                        }`}
                                    >
                                        Charging
                                    </button>
                                    <button 
                                        onClick={() => setSelectedCable("charging-jack")}
                                        className={`p-2 rounded-lg transition-all ${
                                            selectedCable === "charging-jack"
                                                ? "bg-primary text-black border-2 border-primary"
                                                : "bg-black text-white border border-white/20 hover:border-white/60 hover:bg-white/10"
                                        }`}
                                    >
                                        Charging + Jack
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold mb-4">Connectivity</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => setSelectedConnectivity("bluetooth")}
                                        className={`p-2 rounded-lg transition-all ${
                                            selectedConnectivity === "bluetooth"
                                                ? "bg-primary text-black border-2 border-primary"
                                                : "bg-black text-white border border-white/20 hover:border-white/60 hover:bg-white/10"
                                        }`}
                                    >
                                        Bluetooth
                                    </button>
                                    <button 
                                        onClick={() => setSelectedConnectivity("wired")}
                                        className={`p-2 rounded-lg transition-all ${
                                            selectedConnectivity === "wired"
                                                ? "bg-primary text-black border-2 border-primary"
                                                : "bg-black text-white border border-white/20 hover:border-white/60 hover:bg-white/10"
                                        }`}
                                    >
                                        Wired
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold mb-4">Carry</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => setSelectedCarry("none")}
                                        className={`p-2 rounded-lg transition-all ${
                                            selectedCarry === "none"
                                                ? "bg-primary text-black border-2 border-primary"
                                                : "bg-black text-white border border-white/20 hover:border-white/60 hover:bg-white/10"
                                        }`}
                                    >
                                        No case
                                    </button>
                                    <button 
                                        onClick={() => setSelectedCarry("hard")}
                                        className={`p-2 rounded-lg transition-all ${
                                            selectedCarry === "hard"
                                                ? "bg-primary text-black border-2 border-primary"
                                                : "bg-black text-white border border-white/20 hover:border-white/60 hover:bg-white/10"
                                        }`}
                                    >
                                        Hard case
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-2xl font-bold">Total</span>
                                <span className="text-3xl font-bold">${currentModel.basePrice}</span>
                            </div>
                            <button className="w-full bg-primary text-bg rounded px-8 py-4 text-lg font-semibold hover:bg-white/90 transition-colors">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* 3D Preview Area */}
                    <div className="p-8 min-h-[500px] flex items-center justify-center">
                        <Canvas camera={cameraSettings}>
                            <Experience modelId={modelId} />
                        </Canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Configurator;
