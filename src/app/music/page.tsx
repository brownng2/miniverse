export default function MusicPage() {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-widest text-[#9b7b8f]">
          Sounds of the Miniverse 🎧
        </p>
        <h1 className="mt-3 text-4xl font-bold">Music Lounge</h1>
        <p className="mt-3 text-[#8b6f63]">
          Every day deserves its own soundtrack.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl bg-white/60 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">🎵 Song of the Day</h2>
          <p className="mt-4 text-[#8b6f63]">
            Choose the song that matches today's mood.
          </p>
        </div>

        <div className="rounded-3xl bg-white/60 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">💿 My Playlist</h2>
          <p className="mt-4 text-[#8b6f63]">
            Your favorite songs and playlists will appear here.
          </p>
        </div>
      </div>

      <div className="rounded-3xl bg-white/60 p-6 shadow-sm">
        <h2 className="text-xl font-semibold">🌙 Listening History</h2>
        <p className="mt-3 text-[#8b6f63]">
          Revisit the songs that defined your days.
        </p>
      </div>
    </section>
  );
}
