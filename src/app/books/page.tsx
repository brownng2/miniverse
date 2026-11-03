"use client";

import { useEffect, useState } from "react";

type Book = {
  id: string;
  title: string;
  author: string;
  totalPages: number;
  currentPage: number;
  status: "Want to Read" | "Reading" | "Finished";
  rating: number;
  notes: string;
  cover: string;
};

const emptyForm = {
  title: "",
  author: "",
  totalPages: "",
  currentPage: "0",
  status: "Want to Read" as Book["status"],
  rating: "0",
  notes: "",
  cover: "",
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("miniverse-books");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setBooks(parsed);
      }
    } catch {
      // Ignore invalid saved data.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(
        "miniverse-books",
        JSON.stringify(books)
      );
    }
  }, [books, loaded]);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  function saveBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.title.trim()) return;

    const totalPages = Math.max(0, Number(form.totalPages) || 0);
    const currentPage = Math.min(
      totalPages || Infinity,
      Math.max(0, Number(form.currentPage) || 0)
    );

    const book: Book = {
      id: editingId || crypto.randomUUID(),
      title: form.title.trim(),
      author: form.author.trim(),
      totalPages,
      currentPage,
      status: form.status,
      rating: Math.min(5, Math.max(0, Number(form.rating))),
      notes: form.notes,
      cover: form.cover,
    };

    if (editingId) {
      setBooks((previous) =>
        previous.map((item) =>
          item.id === editingId ? book : item
        )
      );
    } else {
      setBooks((previous) => [...previous, book]);
    }

    resetForm();
  }

  function editBook(book: Book) {
    setEditingId(book.id);
    setForm({
      title: book.title,
      author: book.author,
      totalPages: String(book.totalPages),
      currentPage: String(book.currentPage),
      status: book.status,
      rating: String(book.rating),
      notes: book.notes,
      cover: book.cover,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteBook(id: string) {
    if (!window.confirm("Remove this book from your shelf?")) {
      return;
    }

    setBooks((previous) =>
      previous.filter((book) => book.id !== id)
    );
  }

  const visibleBooks =
    filter === "All"
      ? books
      : books.filter((book) => book.status === filter);

  const readingCount = books.filter(
    (book) => book.status === "Reading"
  ).length;

  const finishedCount = books.filter(
    (book) => book.status === "Finished"
  ).length;

  return (
    <div className="space-y-7">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#a38481]">
            ✦ STORIES & LITTLE ADVENTURES
          </p>

          <h1 className="mt-4 font-serif text-4xl font-bold">
            My Cozy Bookshelf 📚
          </h1>

          <p className="mt-3 text-sm text-[#947c76]">
            A home for all the stories you love. ♡
          </p>
        </div>

        <button
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
          className="rounded-xl bg-[#49332f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#624944]"
        >
          {showForm ? "Cancel" : "+ Add Book"}
        </button>
      </header>

      {/* Bookshelf statistics */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Books", value: books.length, emoji: "📚" },
          { label: "Currently Reading", value: readingCount, emoji: "☕" },
          { label: "Books Finished", value: finishedCount, emoji: "🌸" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#eee1da] bg-[#fffaf6] p-5"
          >
            <span className="text-2xl">{stat.emoji}</span>
            <p className="mt-3 text-xs text-[#947c76]">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-bold">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      {/* Add / edit book form */}
      {showForm && (
        <form
          onSubmit={saveBook}
          className="space-y-5 rounded-2xl border border-[#eee1da] bg-[#fffaf6] p-6"
        >
          <h2 className="font-serif text-2xl font-bold">
            {editingId ? "Edit Your Book ✏️" : "Add a New Story 🌷"}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span>Book Title *</span>
              <input
                required
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="w-full rounded-xl border border-[#e6d4ca] bg-white p-3"
                placeholder="Book title"
              />
            </label>

            <label className="space-y-2 text-sm">
              <span>Author</span>
              <input
                value={form.author}
                onChange={(e) =>
                  setForm({ ...form, author: e.target.value })
                }
                className="w-full rounded-xl border border-[#e6d4ca] bg-white p-3"
                placeholder="Author name"
              />
            </label>

            <label className="space-y-2 text-sm">
              <span>Total Pages</span>
              <input
                type="number"
                min="0"
                value={form.totalPages}
                onChange={(e) =>
                  setForm({ ...form, totalPages: e.target.value })
                }
                className="w-full rounded-xl border border-[#e6d4ca] bg-white p-3"
                placeholder="350"
              />
            </label>

            <label className="space-y-2 text-sm">
              <span>Current Page</span>
              <input
                type="number"
                min="0"
                value={form.currentPage}
                onChange={(e) =>
                  setForm({ ...form, currentPage: e.target.value })
                }
                className="w-full rounded-xl border border-[#e6d4ca] bg-white p-3"
              />
            </label>

            <label className="space-y-2 text-sm">
              <span>Reading Status</span>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as Book["status"],
                  })
                }
                className="w-full rounded-xl border border-[#e6d4ca] bg-white p-3"
              >
                <option>Want to Read</option>
                <option>Reading</option>
                <option>Finished</option>
              </select>
            </label>

            <label className="space-y-2 text-sm">
              <span>Rating</span>
              <select
                value={form.rating}
                onChange={(e) =>
                  setForm({ ...form, rating: e.target.value })
                }
                className="w-full rounded-xl border border-[#e6d4ca] bg-white p-3"
              >
                {[0, 1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating === 0
                      ? "Not rated"
                      : `${rating} / 5 stars`}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block space-y-2 text-sm">
            <span>Book Cover URL (optional)</span>
            <input
              type="url"
              value={form.cover}
              onChange={(e) =>
                setForm({ ...form, cover: e.target.value })
              }
              className="w-full rounded-xl border border-[#e6d4ca] bg-white p-3"
              placeholder="https://example.com/book-cover.jpg"
            />
          </label>

          <label className="block space-y-2 text-sm">
            <span>Notes & Favorite Quotes</span>
            <textarea
              value={form.notes}
              onChange={(e) =>
                setForm({ ...form, notes: e.target.value })
              }
              rows={4}
              className="w-full rounded-xl border border-[#e6d4ca] bg-white p-3"
              placeholder="What did you think about this book?"
            />
          </label>

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-xl bg-[#49332f] px-6 py-3 text-sm font-semibold text-white"
            >
              {editingId ? "Save Changes" : "Add to Bookshelf"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl bg-[#f3e4e1] px-6 py-3 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Book filters */}
      <div className="flex flex-wrap gap-2">
        {["All", "Want to Read", "Reading", "Finished"].map(
          (item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-2 text-xs font-medium ${
                filter === item
                  ? "bg-[#49332f] text-white"
                  : "bg-[#f3e4e1] text-[#49332f]"
              }`}
            >
              {item}
            </button>
          )
        )}
      </div>

      {/* Book collection */}
      {!loaded ? (
        <p>Loading your bookshelf...</p>
      ) : visibleBooks.length === 0 ? (
        <div className="rounded-2xl border border-[#eee1da] bg-[#fffaf6] p-12 text-center">
          <p className="text-5xl">📖</p>
          <h2 className="mt-4 font-serif text-2xl font-bold">
            Your bookshelf is waiting!
          </h2>
          <p className="mt-3 text-sm text-[#947c76]">
            Add your first book to begin your reading journey.
          </p>
        </div>
      ) : (
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visibleBooks.map((book) => {
            const progress = book.totalPages
              ? Math.min(
                  100,
                  (book.currentPage / book.totalPages) * 100
                )
              : 0;

            return (
              <article
                key={book.id}
                className="overflow-hidden rounded-2xl border border-[#eee1da] bg-[#fffaf6] p-5 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="flex h-36 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#e7c5c2]">
                    {book.cover ? (
                      // URL images are supported for now.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={book.cover}
                        alt={`Cover of ${book.title}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl">📚</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-lg font-bold">
                      {book.title}
                    </h3>

                    <p className="mt-1 text-xs text-[#947c76]">
                      {book.author || "Unknown author"}
                    </p>

                    <p className="mt-3 text-xs font-semibold text-[#9d717e]">
                      {book.status}
                    </p>

                    <p className="mt-2 text-sm text-[#b78591]">
                      {book.rating > 0
                        ? "★".repeat(book.rating) +
                          "☆".repeat(5 - book.rating)
                        : "Not rated"}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex justify-between text-xs text-[#947c76]">
                    <span>Reading progress</span>
                    <span>
                      {book.currentPage} / {book.totalPages}
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#f1e2de]">
                    <div
                      className="h-full rounded-full bg-[#d9a4ab]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {book.notes && (
                  <p className="mt-4 whitespace-pre-wrap rounded-xl bg-[#f5eae4] p-3 text-xs leading-6">
                    {book.notes}
                  </p>
                )}

                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => editBook(book)}
                    className="flex-1 rounded-xl bg-[#f3e4e1] px-4 py-2 text-xs font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteBook(book.id)}
                    className="rounded-xl px-4 py-2 text-xs text-red-700 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}
