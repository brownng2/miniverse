export default function BooksPage() {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-widest text-[#9b7b8f]">
          The Reading Corner ☕
        </p>
        <h1 className="mt-3 text-4xl font-bold">My Bookshelf 📚</h1>
        <p className="mt-3 text-[#8b6f63]">
          Every book is another little world to escape into.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {["Currently Reading", "Want to Read", "Finished Books"].map(
          (category) => (
            <div
              key={category}
              className="rounded-3xl bg-white/60 p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold">{category}</h2>
              <p className="mt-4 text-sm text-[#8b6f63]">
                Your books will appear here.
              </p>
            </div>
          )
        )}
      </div>

      <button className="rounded-2xl bg-[#9b7b8f] px-6 py-3 text-white">
        + Add a Book
      </button>
    </section>
  );
}
