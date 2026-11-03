const mediaCategories = [
  { title: "Anime", emoji: "🌸" },
  { title: "TV Shows", emoji: "📺" },
  { title: "Movies", emoji: "🎬" },
  { title: "YouTube", emoji: "▶️" },
];

export default function WatchlistPage() {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-widest text-[#9b7b8f]">
          After-Hours Entertainment 🍿
        </p>
        <h1 className="mt-3 text-4xl font-bold">Watch Diary</h1>
        <p className="mt-3 text-[#8b6f63]">
          Every story deserves a little space in your universe.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {mediaCategories.map((category) => (
          <div
            key={category.title}
            className="rounded-3xl bg-white/60 p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold">
              {category.emoji} {category.title}
            </h2>
            <p className="mt-3 text-[#8b6f63]">
              Your watchlist will appear here.
            </p>
          </div>
        ))}
      </div>

      <button className="rounded-2xl bg-[#9b7b8f] px-6 py-3 text-white">
        + Add to Watch Diary
      </button>
    </section>
  );
}
