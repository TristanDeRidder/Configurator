import { useScrollContext } from "../contexts/ScrollContext";

const TextOverlay = () => {
  const { activeSection } = useScrollContext();

  const getOpacity = (index: number) => (activeSection === index ? 1 : 0);

  return (
    <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10">
      {/* SECTION 1 - Fullscreen backdrop blur */}
      <div 
        className="absolute inset-0 backdrop-blur-sm bg-black/20 transition-opacity duration-500 ease-in-out"
        style={{ opacity: getOpacity(0) }}
      />
      
      {/* SECTION 1 - Keyframe 1 (0-20% scroll / Page 1) */}
      <div 
        className="text-white transition-opacity duration-500 ease-in-out pointer-events-none"
        style={{ opacity: getOpacity(0) }}
      >
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2">
          <h1 className="w-1/2 text-9xl m-0 mb-4 font-bold text-white" style={{ letterSpacing: '-0.1em' }}>
            True Sound
          </h1>
        </div>

        <a className="absolute top-3/4 left-1/8 bg-primary text-bg rounded px-6 py-2" href="">Explore collection</a>
        <p className="absolute top-3/4 right-1/8 text-primary text-lg">Noiré</p>
      </div>

      {/* SECTION 2 - Keyframe 2 (20-40% scroll / Page 2) */}
      <div 
        className="text-white transition-opacity duration-500 ease-in-out pointer-events-none"
        style={{ opacity: getOpacity(1) }}
      >
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-5xl m-0 mb-4 font-bold text-white">
            The Art of Quiet Precision
          </h2>
        </div>

        <p className="absolute top-2/6 left-1/6 text-primary text-lg">
          We don’t chase volume. We design for clarity<br></br> — of sound, of form, of purpose.
        </p>
        <p className="w-[30rem] absolute top-3/4 right-1/8 text-primary text-lg">
          Each model is machined from aerospace-grade materials, tuned to reveal texture and tone with surgical accuracy.<br></br>
          Not loud. Just exact.
        </p>
      </div>

      {/* SECTION 3 - Keyframe 3 (40-60% scroll / Page 3) */}
      <div 
        className="transition-opacity duration-500 ease-in-out pointer-events-none"
        style={{ opacity: getOpacity(2) }}
      >
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-5xl m-0 mb-4 font-bold text-white">
            Engineered to Endure
          </h2>
        </div>

        <p className="absolute top-2/6 left-1/8 text-primary text-lg">
          Every surface refined. Every joint balanced. <br></br> Aluminum, leather, carbon fiber<br></br> — assembled with microscopic tolerance.
        </p>
        <p className="w-[15rem] absolute top-1/2 right-1/8 text-primary text-lg">
          This isn’t design for display. It’s design for permanence.
        </p>
      </div>

      {/* SECTION 4 - Keyframe 4 (60-80% scroll / Page 4) */}
      <div 
        className="transition-opacity duration-500 ease-in-out pointer-events-none"
        style={{ opacity: getOpacity(3) }}
      >
        <div className="absolute top-1/10 left-1/4 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-5xl m-0 mb-4 font-bold text-white">
            Silence, Defined
          </h2>
        </div>

        <p className="absolute top-2/8 left-1/6 text-primary text-lg">
          LUMEN captures the openness of light — pure, spatial, detailed.
        </p>
        <p className="absolute bottom-2/8 right-1/8 text-primary text-lg">
          NOIRÉ reveals the gravity of depth — warm, resonant, immersive.
        </p>

        <div className="absolute bottom-1/20 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-5xl m-0 mb-4 font-bold text-white text-center">
            Two approaches. <br></br> One pursuit: perfect balance.
          </h2>
        </div>
      </div>

      {/* SECTION 5 - Keyframe 5 (80-100% scroll / Page 5) */}
      <div 
        className="transition-opacity duration-500 ease-in-out pointer-events-none"
        style={{ opacity: getOpacity(4) }}
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-5xl m-0 mb-4 font-bold text-white text-center">
            LUMEN / NOIRÉ <br></br> Precision in Every Decibel.
          </h2>
        </div>
      </div>

      
    </div>
  );
};

export default TextOverlay;
