"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/DashboardCard";

const initialTasks = [
  "Read a few pages",
  "Move my body",
  "Take a mindful break",
];

export default function Home() {
  const [completed, setCompleted] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [ready, setReady] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    );

    try {
      const saved = localStorage.getItem("miniverse-tasks");
      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (
          Array.isArray(parsed) &&
          parsed.length === initialTasks.length &&
          parsed.every((item) => typeof item === "boolean")
        ) {
          setCompleted(parsed);
        }
      }
    } catch {
      // Keep the default tasks if saved data is invalid.
    }

    setReady(true);
  }, []);

  function toggleTask(index: number) {
    const updated = completed.map((value, i) =>
      i === index ? !value : value
    );

    setCompleted(updated);
    localStorage.setItem(
      "miniverse-tasks",
      JSON.stringify(updated)
    );
  }

  const doneCount = completed.filter(Boolean).length;
  const percentage = (doneCount / initialTasks.length) * 100;

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#a38481]">
          ✦ YOUR COZY CORNER
        </p>

        <span className="rounded-full bg-[#f3e4e1] px-4 py-2 text-xs">
          🌸 soft life mode
        </span>
      </div>

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

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <DashboardCard
          title="Reading Progress"
          emoji="📖"
          href="/books"
        >
          <p className="text-xs uppercase tracking-wider text-[#947c76]">
            Your current book
          </p>
          <p className="mt-3 text-2xl font-bold">
            0 <span className="text-sm font-normal">pages</span>
          </p>
          <div className="mt-4 h-2 rounded-full bg-[#f1e2de]" />
        </DashboardCard>

        <DashboardCard
          title="Daily Steps"
          emoji="🌿"
          href="/fitness"
        >
          <p className="text-xs uppercase tracking-wider text-[#947c76]">
            Movement goal
          </p>
          <p className="mt-3 text-2xl font-bold">
            0 <span className="text-sm font-normal">/ 8,000</span>
          </p>
          <div className="mt-4 h-2 rounded-full bg-[#f1e2de]" />
        </DashboardCard>

        <DashboardCard title="Tasks Completed" emoji="✨">
          <p className="text-xs uppercase tracking-wider text-[#947c76]">
            Today&apos;s progress
          </p>

          <p className="mt-3 text-2xl font-bold">
            {ready ? doneCount : 0}
            <span className="text-sm font-normal"> / 3</span>
          </p>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#f1e2de]">
            <div
              className="h-full rounded-full bg-[#d9a4ab] transition-all"
              style={{
                width: `${ready ? percentage : 0}%`,
              }}
            />
          </div>
        </DashboardCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <DashboardCard title="Today's Little Goals" emoji="✏️">
          <div className="space-y-4">
            {initialTasks.map((task, index) => (
              <label
                key={task}
                className="flex cursor-pointer items-center gap-3 text-sm"
              >
                <input
                  type="checkbox"
                  checked={ready ? completed[index] : false}
                  onChange={() => toggleTask(index)}
                  className="h-4 w-4 accent-[#b78591]"
                />

                <span
                  className={
                    ready && completed[index]
                      ? "text-[#a38e87] line-through"
                      : ""
                  }
                >
                  {task}
                </span>
              </label>
            ))}
          </div>

          <p className="mt-6 text-xs text-[#947c76]">
            Every little win counts ♡
          </p>
        </DashboardCard>

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

        <DashboardCard title="Little Joys" emoji="🎀">
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
