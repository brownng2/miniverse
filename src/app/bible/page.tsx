export default function BiblePage() {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-widest text-[#9b7b8f]">
          A Moment of Peace 🕊️
        </p>
        <h1 className="mt-3 text-4xl font-bold">Bible Journal</h1>
        <p className="mt-3 text-[#8b6f63]">
          A quiet place for scripture, prayer, and reflection.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl bg-white/60 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Continue Reading 📖</h2>
          <p className="mt-3 text-[#8b6f63]">
            Your last-read Bible chapter will appear here.
          </p>
        </div>

        <div className="rounded-3xl bg-white/60 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Highlighted Verses ✨</h2>
          <p className="mt-3 text-[#8b6f63]">
            Save meaningful verses and revisit them anytime.
          </p>
        </div>
      </div>

      <div className="rounded-3xl bg-white/60 p-6 shadow-sm">
        <h2 className="text-xl font-semibold">My Reflections</h2>
        <p className="mt-3 text-[#8b6f63]">
          Your scripture notes and reflections will appear here.
        </p>
      </div>
    </section>
  );
}
