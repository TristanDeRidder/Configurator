import { Link } from "react-router-dom";

const Collection = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-block text-primary hover:text-white transition-colors mb-8">
          ← Back to Home
        </Link>
        
        <h1 className="text-6xl font-bold mb-8">Our Collection</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* LUMEN */}
          <div className="border border-white/20 p-8 hover:border-white/40 transition-all">
            <h2 className="text-4xl font-bold mb-4">LUMEN</h2>
            <p className="text-primary text-lg mb-6">
              The openness of light — pure, spatial, detailed.
            </p>
            <ul className="space-y-2 text-primary mb-6">
              <li>• Aerospace-grade aluminum</li>
              <li>• Premium leather headband</li>
              <li>• 40mm dynamic drivers</li>
              <li>• Open-back design</li>
            </ul>
            <Link 
              to="/collection/lumen" 
              className="inline-block bg-primary text-bg rounded px-6 py-3 font-semibold hover:bg-white/90 transition-colors"
            >
              Customize LUMEN
            </Link>
          </div>

          {/* NOIRÉ */}
          <div className="border border-white/20 p-8 hover:border-white/40 transition-all">
            <h2 className="text-4xl font-bold mb-4">NOIRÉ</h2>
            <p className="text-primary text-lg mb-6">
              The gravity of depth — warm, resonant, immersive.
            </p>
            <ul className="space-y-2 text-primary mb-6">
              <li>• Carbon fiber construction</li>
              <li>• Memory foam cushions</li>
              <li>• 50mm planar magnetic drivers</li>
              <li>• Closed-back design</li>
            </ul>
            <Link 
              to="/collection/noire" 
              className="inline-block bg-primary text-bg rounded px-6 py-3 font-semibold hover:bg-white/90 transition-colors"
            >
              Customize NOIRÉ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
