export default function CalendarPage() {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-widest text-[#9b7b8f]">
          Memories & Milestones 🗓️
        </p>
        <h1 className="mt-3 text-4xl font-bold">My Calendar</h1>
        <p className="mt-3 text-[#8b6f63]">
          Look back at the little moments that made each day special.
        </p>
      </div>

      <div className="rounded-3xl bg-white/60 p-8 shadow-sm">
        <h2 className="text-xl font-semibold">Productivity Calendar</h2>
        <p className="mt-3 text-[#8b6f63]">
          Your daily tasks, workouts, reading progress, and activities
          will appear on this calendar.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {[
          "Tasks Completed ✨",
          "Workout History 🌿",
          "Reading Activity 📚",
        ].map((item) => (
          <div
            key={item}
            className="rounded-3xl bg-white/60 p-6 shadow-sm"
          >
            <h2 className="font-semibold">{item}</h2>
            <p className="mt-3 text-sm text-[#8b6f63]">
              No activity recorded yet.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
