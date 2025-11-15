const TextOverlay = () => {
  return (
    <div className="flex flex-col w-full text-white">
      {/* HERO */}
      <section className="w-full h-screen flex flex-col justify-center px-[10vw]">
        <h1 className="text-[9vw] leading-none w-96 tracking-tighter">True Sound</h1>
        <div className="mt-10 flex w-full justify-between items-center">
          <a href="/collection" className="bg-primary text-bg rounded px-6 py-2 whitespace-nowrap">
            Explore collection
          </a>
          <a href="/collection/noire" className="text-primary text-lg">
            Noiré
          </a>
        </div>
      </section>

      {/* SECTION 1 */}
      <section className="w-full h-screen flex flex-col justify-center px-[15vw]">
        <div className="w-full relative">
          <h2 className="text-5xl">The Art of Quiet Precision</h2>
          <p className="mt-6 text-primary text-lg max-w-[40rem]">
            We don’t chase volume. We design for clarity<br /> — of sound, of form, of purpose.
          </p>
          <p className="absolute -right-20 mt-6 text-primary text-lg w-[30rem] max-w-[40rem]">
            Each model is machined from aerospace-grade materials, tuned to reveal texture and tone with surgical accuracy.<br/>
            Not loud. Just exact.
          </p>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="w-full h-screen flex flex-col justify-center px-[15vw] relative">
        <div className="w-full">
          <h2 className="text-5xl">Engineered to Endure</h2>
          <p className="mt-6 ml-4 text-primary text-lg max-w-[30rem]">
          Every surface refined. Every joint balanced. Aluminum, leather, carbon fiber. - <br/> assembled with microscopic tolerance.
          </p>
          <p className="absolute bottom-0 mt-6 ml-4 text-primary text-lg text-center max-w-[30rem]">
            This isn’t design for display. <br /> It’s design for permanence.
          </p>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="w-full h-screen flex px-[15vw] relative">
        <div className="w-full max-w-[70rem] flex flex-col justify-between py-24 mx-auto">
          <div className="flex flex-col text-center">
            <h2 className="text-5xl">Silence, Defined</h2>
            <p className="mt-6 text-primary text-lg max-w-[32rem]">
              LUMEN captures the openness of light — pure, spatial, detailed.
            </p>
          </div>

          <div className="flex flex-col w-full">
            <p className="text-primary text-lg max-w-[32rem] ml-auto text-right">
              NOIRÉ reveals the gravity of depth — warm, resonant, immersive.
            </p>
            <p className="mt-10 text-primary text-2xl md:text-5xl leading-tight max-w-[46rem] mx-auto text-center">
              Two approaches. One pursuit: perfect balance.
            </p>
          </div>
        </div>
      </section>

      {/* ENDING SECTION */}
      <section className="w-full h-screen flex items-center justify-center text-center px-[20vw]">
        <h2 className="text-5xl leading-normal w-full">
          LUMEN / NOIRÉ <br /> Precision in Every Decibel.
        </h2>
      </section>
    </div>
  );
};


export default TextOverlay;
