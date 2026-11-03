"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardCard from "@/components/DashboardCard";

// -------------------------
// TYPES
// -------------------------

type Task = {
  id: string;
  title: string;
  completed: boolean;
  category: "Daily" | "Weekly" | "Monthly" | "Yearly";
};

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

// -------------------------
// HOME DASHBOARD
// -------------------------

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [ready, setReady] = useState(false);
  const [today, setToday] = useState("");

  // -------------------------
  // LOAD SAVED DATA
  // -------------------------

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    );

    function loadData() {
      // Load To-Dos
      try {
        const savedTasks = localStorage.getItem("miniverse-todos");

        if (savedTasks) {
          const parsed: unknown = JSON.parse(savedTasks);

          setTasks(
            Array.isArray(parsed) ? (parsed as Task[]) : []
          );
        } else {
          setTasks([]);
        }
      } catch {
        setTasks([]);
      }

      // Load Bookshelf
      try {
        const savedBooks = localStorage.getItem("miniverse-books");

        if (savedBooks) {
          const parsed: unknown = JSON.parse(savedBooks);

          setBooks(
            Array.isArray(parsed) ? (parsed as Book[]) : []
          );
        } else {
          setBooks([]);
        }
      } catch {
        setBooks([]);
      }

      setReady(true);
    }

    loadData();

    // Refresh data when returning to the website
    window.addEventListener("focus", loadData);
    window.addEventListener("storage", loadData);

    return () => {
      window.removeEventListener("focus", loadData);
      window.removeEventListener("storage", loadData);
    };
  }, []);

  // -------------------------
  // TASK FUNCTIONS
  // -------------------------

  function toggleTask(id: string) {
    const updated = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updated);

    localStorage.setItem(
      "miniverse-todos",
      JSON.stringify(updated)
    );
  }

  // Show Daily tasks on dashboard
  const dailyTasks = tasks.filter(
    (task) => task.category === "Daily"
  );

  const doneCount = dailyTasks.filter(
    (task) => task.completed
  ).length;

  const taskPercentage = dailyTasks.length
    ? (doneCount / dailyTasks.length) * 100
    : 0;

  // -------------------------
  // BOOK FUNCTIONS
  // -------------------------

  // Display first book marked Reading
  const currentBook = books.find(
    (book) => book.status === "Reading"
  );

  const readingPercentage =
    currentBook && currentBook.totalPages > 0
      ? Math.min(
          100,
          (currentBook.currentPage / currentBook.totalPages) * 100
        )
      : 0;

  // -------------------------
  // DASHBOARD UI
  // -------------------------

  return (
    <div className="space-y-7">

      {/* TOP LABEL */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#a38481]">
          ✦ YOUR COZY CORNER
        </p>

        <span className="rounded-full bg-[#f3e4e1] px-4 py-2 text-xs">
          🌸 soft life mode
        </span>
      </div>

      {/* WELCOME HEADER */}
      <header>
        <h1 className="font-serif text-3xl font-bold md:text-4xl">
          Good morning, sunshine! ☀️
        </h1>

        <p className="mt-3 text-sm text-[#947c76]">
          A fresh page, a warm cup, and a little magic.
        </p>

        <p className="mt-2 text-xs text-[#a38481]">
          {today}
        </p>
      </header>

      {/* DAILY REMINDER */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#e7c5c2] via-[#f4dfd2] to-[#d9c6b7] p-7 md:p-9">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#865d60]">
          TODAY&apos;S LITTLE REMINDER
        </p>

        <h2 className="mt-4 max-w-md font-serif text-2xl font-bold md:text-3xl">
          Romanticize the little things. ♡
        </h2>

        <p className="mt-3 max-w-sm text-sm leading-7">
          One small step is still a step toward the life
          you&apos;re creating.
        </p>

        <span className="absolute -bottom-5 right-5 hidden text-8xl opacity-60 sm:block">
          ☕
        </span>
      </section>

      {/* PROGRESS CARDS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

        {/* READING PROGRESS */}
        <DashboardCard
          title="Reading Progress"
          emoji="📖"
          href="/books"
        >
          {!ready ? (
            <p className="text-sm text-[#947c76]">
              Loading your books...
            </p>
          ) : currentBook ? (
            <>
              <p className="text-xs uppercase tracking-wider text-[#947c76]">
                Currently Reading
              </p>

              <h3 className="mt-3 font-serif text-lg font-bold">
                {currentBook.title}
              </h3>

              <p className="mt-1 text-xs text-[#947c76]">
                by {currentBook.author || "Unknown Author"}
              </p>

              <p className="mt-4 text-2xl font-bold">
                {currentBook.currentPage}
                <span className="text-sm font-normal text-[#947c76]">
                  {" "} / {currentBook.totalPages} pages
                </span>
              </p>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#f1e2de]">
                <div
                  className="h-full rounded-full bg-[#d9a4ab] transition-all duration-300"
                  style={{
                    width: `${readingPercentage}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-right text-xs text-[#947c76]">
                {Math.round(readingPercentage)}% complete
              </p>
            </>
          ) : (
            <>
              <p className="text-xs uppercase tracking-wider text-[#947c76]">
                Your Current Book
              </p>

              <p className="mt-4 text-sm text-[#947c76]">
                No book currently being read.
              </p>

              <p className="mt-3 text-xs font-semibold text-[#9d717e]">
                Visit your Bookshelf to start reading ♡
              </p>
            </>
          )}
        </DashboardCard>

        {/* FITNESS PROGRESS */}
        <DashboardCard
          title="Daily Steps"
          emoji="🌿"
          href="/fitness"
        >
          <p className="text-xs uppercase tracking-wider text-[#947c76]">
            Movement Goal
          </p>

          <p className="mt-3 text-2xl font-bold">
            0
            <span className="text-sm font-normal">
              {" "} / 8,000
            </span>
          </p>

          <div className="mt-4 h-2 rounded-full bg-[#f1e2de]" />
        </DashboardCard>

        {/* TASK PROGRESS */}
        <DashboardCard
          title="Tasks Completed"
          emoji="✨"
          href="/todos"
        >
          <p className="text-xs uppercase tracking-wider text-[#947c76]">
            Today&apos;s Progress
          </p>

          <p className="mt-3 text-2xl font-bold">
            {ready ? doneCount : 0}
            <span className="text-sm font-normal">
              {" "} / {ready ? dailyTasks.length : 0}
            </span>
          </p>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#f1e2de]">
            <div
              className="h-full rounded-full bg-[#d9a4ab] transition-all duration-300"
              style={{
                width: `${ready ? taskPercentage : 0}%`,
              }}
            />
          </div>
        </DashboardCard>
      </section>

      {/* MAIN DASHBOARD WIDGETS */}
      <section className="grid gap-4 lg:grid-cols-2">

        {/* TODAY'S LITTLE GOALS */}
        <DashboardCard
          title="Today's Little Goals"
          emoji="✏️"
        >
          <div className="space-y-4">
            {!ready ? (
              <p className="text-sm text-[#947c76]">
                Loading your goals...
              </p>
            ) : dailyTasks.length === 0 ? (
              <div className="py-5 text-center">
                <p className="text-3xl">🌷</p>

                <p className="mt-3 text-sm text-[#947c76]">
                  No daily goals yet!
                </p>

                <p className="mt-1 text-xs text-[#a38481]">
                  Visit To-Dos to add your first daily goal.
                </p>
              </div>
            ) : (
              dailyTasks.map((task) => (
                <label
                  key={task.id}
                  className="flex cursor-pointer items-center gap-3 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-4 w-4 accent-[#b78591]"
                  />

                  <span
                    className={
                      task.completed
                        ? "text-[#a38e87] line-through"
                        : ""
                    }
                  >
                    {task.title}
                  </span>
                </label>
              ))
            )}
          </div>

          <Link
            href="/todos"
            className="mt-6 inline-block text-xs font-semibold text-[#9d717e] hover:underline"
          >
            Manage all my goals ♡
          </Link>
        </DashboardCard>

        {/* BIBLE WIDGET */}
        <DashboardCard
          title="A Quiet Moment"
          emoji="🕊️"
          href="/bible"
        >
          <blockquote className="rounded-xl bg-[#f5eae4] p-5 font-serif text-lg italic leading-8">
            &ldquo;Be still, and know that I am God.&rdquo;
          </blockquote>

          <p className="mt-3 text-xs text-[#947c76]">
            Psalm 46:10
          </p>
        </DashboardCard>

        {/* MUSIC WIDGET */}
        <DashboardCard
          title="The Music Lounge"
          emoji="🎧"
          href="/music"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-[#e8c9c6] p-4 text-3xl">
              🎶
            </div>

            <div>
              <p className="text-sm font-semibold">
                Your daily soundtrack
              </p>

              <p className="mt-1 text-xs text-[#947c76]">
                Add a favorite song
              </p>
            </div>
          </div>

          <p className="mt-5 text-xs text-[#a38481]">
            Visit your music lounge ♡
          </p>
        </DashboardCard>

        {/* LITTLE JOYS */}
        <DashboardCard
          title="Little Joys"
          emoji="🎀"
        >
          <div className="space-y-3 text-sm">
            <p>🍓 A slow morning</p>
            <p>🌷 Fresh flowers</p>
            <p>☕ Something warm to drink</p>
            <p>🌙 A peaceful evening</p>
          </div>
        </DashboardCard>
      </section>
    </div>
  );
}
