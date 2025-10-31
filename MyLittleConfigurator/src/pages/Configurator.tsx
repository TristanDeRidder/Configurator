import { Link, useParams } from "react-router-dom";

const Configurator = () => {
  const { modelId } = useParams<{ modelId: string }>();
  
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
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
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
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/collection" className="inline-block text-primary hover:text-white transition-colors mb-8">
          ← Back to Collection
        </Link>
        
        <h1 className="text-6xl font-bold mb-2">{currentModel.name}</h1>
        <p className="text-primary text-xl mb-8">{currentModel.description}</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* 3D Preview Area */}
          <div className="border border-white/20 p-8 min-h-[500px] flex items-center justify-center">
            <p className="text-primary text-xl">3D Model Preview Coming Soon</p>
          </div>

          {/* Configuration Options */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Model Features</h2>
              <ul className="space-y-2 text-primary">
                {currentModel.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Color</h2>
              <div className="flex gap-4">
                <button className="w-16 h-16 rounded-full bg-zinc-900 border-2 border-white hover:scale-110 transition-transform" />
                <button className="w-16 h-16 rounded-full bg-zinc-300 border-2 border-white/20 hover:scale-110 transition-transform" />
                <button className="w-16 h-16 rounded-full bg-zinc-700 border-2 border-white/20 hover:scale-110 transition-transform" />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Materials</h2>
              <div className="space-y-4">
                <div className="border border-white/20 p-4 rounded">
                  <h3 className="text-lg font-semibold mb-2">Headband</h3>
                  <select className="w-full bg-black border border-white/20 p-2 rounded text-white">
                    <option>Premium Leather</option>
                    <option>Vegan Leather</option>
                    <option>Fabric</option>
                  </select>
                </div>
                <div className="border border-white/20 p-4 rounded">
                  <h3 className="text-lg font-semibold mb-2">Ear Cushions</h3>
                  <select className="w-full bg-black border border-white/20 p-2 rounded text-white">
                    <option>Memory Foam</option>
                    <option>Gel-Infused</option>
                    <option>Velour</option>
                  </select>
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
        </div>
      </div>
    </div>
  );
};

export default Configurator;
