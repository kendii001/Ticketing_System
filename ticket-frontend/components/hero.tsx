


export default function Hero() {
  return (
    <section
      className="relative min-h-screen w-full bg-[url('/media/image.jpeg')] bg-cover bg-center bg-no-repeat"
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-center text-white">

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Discover Extraordinary Events
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed">
            Your trusted partner for unforgettable experiences. Explore events
            or launch your own with ShereheSasa.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">

            <link
             className="w-full sm:w-auto rounded-lg bg-indigo-600 px-8 py-3 font-semibold transition hover:bg-indigo-700">
              Explore Events
            </link>

            <link
            className="w-full sm:w-auto rounded-lg border border-white px-8 py-3 font-semibold transition hover:bg-white hover:text-black">
              Launch An Event
            </link>

          </div>

        </div>
      </div>
    </section>
  );
}