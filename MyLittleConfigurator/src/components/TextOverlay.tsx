// Note: Avoid React Router's <Link> inside drei's <Scroll html> root,
// because it mounts in a separate React root without router context.
// Use a plain anchor to navigate instead.

const TextOverlay = () => {
  return (
    <div className="w-full text-white">
      
      <section className="h-screen flex items-center justify-center px-[10vw]">
        <div>
          <h1 className="text-[9vw] font-bold leading-none">True Sound</h1>
          <div className="mt-10 flex justify-between">
            <a href="/collection" className="bg-primary text-bg rounded px-6 py-2">
              Explore collection
            </a>
            <p className="text-primary text-lg">Noiré</p>
          </div>
        </div>
      </section>

      <section className="h-screen flex flex-col justify-center px-[15vw]">
        <h2 className="text-5xl font-bold">The Art of Quiet Precision</h2>
        <p className="mt-6 text-primary text-lg max-w-[40rem]">
          We don’t chase volume. We design for clarity — of sound, of form, of purpose.
        </p>
      </section>

      <section className="h-screen flex flex-col justify-center px-[15vw]">
        <h2 className="text-5xl font-bold">Engineered to Endure</h2>
        <p className="mt-6 text-primary text-lg max-w-[30rem]">
          Every surface refined. Every joint balanced. Aluminum, leather, carbon fiber.
        </p>
      </section>

      <section className="h-screen flex flex-col justify-center px-[15vw]">
        <h2 className="text-5xl font-bold">Silence, Defined</h2>
      </section>

      <section className="h-screen flex items-center justify-center text-center px-[20vw]">
        <h2 className="text-5xl font-bold leading-normal">
          LUMEN / NOIRÉ — Precision in Every Decibel.
        </h2>
      </section>

    </div>
  );
};


export default TextOverlay;
