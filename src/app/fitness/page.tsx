export default function FitnessPage() {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-widest text-[#9b7b8f]">
          Movement & Wellness 🌿
        </p>
        <h1 className="mt-3 text-4xl font-bold">Fitness Garden</h1>
        <p className="mt-3 text-[#8b6f63]">
          Move your body, celebrate your progress, and grow at your own pace.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {[
          { title: "Daily Steps", value: "0 steps", emoji: "👟" },
          { title: "Workout Time", value: "0 minutes", emoji: "⏱️" },
          { title: "Workouts Completed", value: "0", emoji: "💪" },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-3xl bg-white/60 p-6 shadow-sm"
          >
            <span className="text-3xl">{item.emoji}</span>
            <h2 className="mt-4 font-semibold">{item.title}</h2>
            <p className="mt-2 text-2xl">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-white/60 p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Workout Studio</h2>
        <p className="mt-2 text-[#8b6f63]">
          Your workout timer and activity log will go here.
        </p>
        <a
          href="https://chloeting.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block rounded-2xl bg-[#9b7b8f] px-5 py-3 text-white"
        >
          Visit Chloe Ting's Workouts ↗
        </a>
      </div>
    </section>
  );
}
