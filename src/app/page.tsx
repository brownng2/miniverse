import DashboardCard from "@/components/DashboardCard";

const cards = [
  {
    title: "Currently Reading",
    value: "Your next chapter awaits...",
    emoji: "📚",
    href: "/books",
  },
  {
    title: "Fitness Garden",
    value: "A little movement goes a long way.",
    emoji: "🌿",
    href: "/fitness",
  },
  {
    title: "Bible Journal",
    value: "Find a quiet moment for reflection.",
    emoji: "🕊️",
    href: "/bible",
  },
  {
    title: "Song of the Day",
    value: "What's the soundtrack to your day?",
    emoji: "🎧",
    href: "/music",
  },
  {
    title: "Watch Diary",
    value: "Keep track of your favorite stories.",
    emoji: "🎬",
    href: "/watchlist",
  },
  {
    title: "Today's To-Dos",
    value: "Small steps, big dreams.",
    emoji: "✨",
    href: "/todos",
  },
  {
    title: "Memory Calendar",
    value: "Every day tells a story.",
    emoji: "🗓️",
    href: "/calendar",
  },
];

export default function Home() {
  return (
    <section className="space-y-10">
      {/* Welcome Header */}
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-[#9b7b8f]">
          ☕ Lofi Anime Café
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#35251f] md:text-5xl">
          Welcome to your Miniverse 🌙
        </h1>

        <p className="mt-4 max-w-2xl text-[#8b6f63]">
          Your cozy little corner to track your books,
          workouts, Bible reflections, favorite shows,
          music, and daily goals.
        </p>
      </div>

      {/* Daily Greeting */}
      <div className="rounded-[2rem] border border-white/60 bg-[#e9d5c5]/70 p-7 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-widest text-[#9b7b8f]">
          A gentle reminder
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          Romanticize the little moments. ☕
        </h2>

        <p className="mt-2 text-[#8b6f63]">
          Make some tea, put on your favorite playlist,
          and enjoy building the life you love.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div>
        <h2 className="mb-5 text-2xl font-semibold">
          Your Little Universe ✨
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <DashboardCard
              key={card.title}
              {...card}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
