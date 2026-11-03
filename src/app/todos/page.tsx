const categories = [
  { title: "Daily Tasks", emoji: "☀️" },
  { title: "Weekly Plans", emoji: "🌷" },
  { title: "Monthly Goals", emoji: "🌙" },
  { title: "Yearly Dreams", emoji: "⭐" },
];

export default function TodosPage() {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-widest text-[#9b7b8f]">
          Little Steps, Big Dreams ✨
        </p>
        <h1 className="mt-3 text-4xl font-bold">My To-Do List</h1>
        <p className="mt-3 text-[#8b6f63]">
          A little progress every day adds up.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {categories.map((category) => (
          <div
            key={category.title}
            className="rounded-3xl bg-white/60 p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold">
              {category.emoji} {category.title}
            </h2>
            <p className="mt-4 text-[#8b6f63]">
              Your tasks will appear here.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
