const TextOverlay = () => {
  return (
    <div className="flex flex-col w-full text-white overflow-hidden">
      {/* HERO */}
      <section className="relative w-full h-screen flex flex-col justify-center px-[10vw]">
        <div className="max-w-7xl w-full mx-auto">
          <h1 className="text-[9vw] leading-none max-w-lg tracking-tighter font-bold">
            True Sound
          </h1>
          <nav
            className="mt-10 flex w-full justify-between items-center gap-4"
            aria-label="Hero navigation"
          >
            <a
              href="/collection"
              className="bg-primary text-bg rounded px-6 py-2 whitespace-nowrap transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg"
              aria-label="Explore our headphone collection"
            >
              Explore collection
            </a>
            <a
              href="/collection/noire"
              className="text-primary text-lg hover:underline focus:outline-none focus:underline transition-all"
              aria-label="View Noiré collection"
            >
              Noiré
            </a>
          </nav>
        </div>
      </section>

      {/* SECTION 1 */}
      <section className="relative w-full h-screen flex flex-col justify-center px-[15vw]">
        <div className="w-full max-w-7xl mx-auto">
          <article className="relative w-full">
            <h2 className="text-5xl font-bold leading-tight">
              The Art of Quiet Precision
            </h2>
            <p className="mt-6 text-primary text-lg max-w-160">
              We don't chase volume. We design for clarity
              <br /> — of sound, of form, of purpose.
            </p>
            <p className="absolute -right-20 mt-6 text-primary text-lg w-120 max-w-160">
              Each model is machined from aerospace-grade materials, tuned to
              reveal texture and tone with surgical accuracy.
              <br />
              Not loud. Just exact.
            </p>
          </article>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="relative w-full h-screen flex flex-col justify-center px-[15vw]">
        <div className="w-full max-w-7xl mx-auto">
          <article className="relative w-full flex flex-col h-[60vh] justify-between">
            <div>
              <h2 className="text-5xl font-bold leading-tight">
                Engineered to Endure
              </h2>
              <p className="mt-6 ml-4 text-primary text-lg max-w-120">
                Every surface refined. Every joint balanced. Aluminum, leather,
                carbon fiber. - <br /> assembled with microscopic tolerance.
              </p>
            </div>
            <p className="ml-4 text-primary text-lg text-center max-w-120">
              This isn't design for display. <br /> It's design for permanence.
            </p>
          </article>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="relative w-full h-screen flex flex-col justify-center px-[15vw]">
        <div className="w-full max-w-280 mx-auto flex flex-col justify-between h-[60vh]">
          <article className="flex flex-col text-left">
            <h2 className="text-5xl font-bold leading-tight">
              Silence, Defined
            </h2>

            <p className="mt-6 text-primary text-lg max-w-lg">
              NOIRÉ is the embodiment of depth — warm, deliberate, and
              unmistakably present.
            </p>

            <p className="mt-4 text-primary text-lg max-w-lg">
              Its counterpart, LUMEN, remains part of the design lineage: a
              study in clarity and openness.
            </p>
          </article>

          <div className="flex flex-col w-full items-center">
            <p className="text-primary text-2xl leading-tight max-w-184 text-center">
              Different expressions. One ambition: refined sound without
              compromise.
            </p>
          </div>
        </div>
      </section>

      {/* ENDING SECTION */}
      <section className="relative w-full h-screen flex items-center justify-center text-center px-[20vw]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl leading-normal w-full font-bold">
            LUMEN / NOIRÉ <br /> Precision in Every Decibel.
          </h2>
        </div>
      </section>
    </div>
  );
};

export default TextOverlay;
