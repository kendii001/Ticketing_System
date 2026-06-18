export default function Hero() {
  return (
    <section className="relative h-screen w-full bg-[url('/media/image.jpeg')] bg-cover bg-center bg-no-repeat">

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-4xl text-center text-white">
          <h1 className="text-5xl font-bold md:text-7xl">
            Discover Extraordinary Events
          </h1>

          <p className="mt-6 text-lg font-mono md:text-xl">
            Your trusted partner for unforgettable experiences. Explore events
            or launch your own with ShereheSasa.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-lg bg-indigo-600 px-8 py-3 font-semibold hover:bg-indigo-700">
              Explore Events
            </button>

            <button className="rounded-lg border border-white px-8 py-3 font-semibold hover:bg-white hover:text-black">
              Launch An Event
            </button>
            

          </div>
        </div>
      </div>
    </section>
  );
}