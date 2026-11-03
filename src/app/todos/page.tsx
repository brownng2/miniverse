"use client";

import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  category: "Daily" | "Weekly" | "Monthly" | "Yearly";
};

const categories = [
  "Daily",
  "Weekly",
  "Monthly",
  "Yearly",
] as const;

export default function TodosPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] =
    useState<Task["category"]>("Daily");
  const [filter, setFilter] = useState("All");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("miniverse-todos");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTasks(parsed);
        }
      }
    } catch {
      // Ignore invalid saved data.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(
        "miniverse-todos",
        JSON.stringify(tasks)
      );
    }
  }, [tasks, loaded]);

  function addTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!newTask.trim()) return;

    const task: Task = {
      id: crypto.randomUUID(),
      title: newTask.trim(),
      completed: false,
      category,
    };

    setTasks((previous) => [...previous, task]);
    setNewTask("");
  }

  function toggleTask(id: string) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id: string) {
    setTasks((previous) =>
      previous.filter((task) => task.id !== id)
    );
  }

  function editTask(id: string) {
    const task = tasks.find((item) => item.id === id);
    if (!task) return;

    const updated = window.prompt(
      "Edit your task:",
      task.title
    );

    if (!updated?.trim()) return;

    setTasks((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, title: updated.trim() }
          : item
      )
    );
  }

  const visibleTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.category === filter);

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <div className="space-y-7">
      <header>
        <p className="text-xs font-semibold tracking-[0.2em] text-[#a38481]">
          ✦ ORGANIZE YOUR LITTLE UNIVERSE
        </p>

        <h1 className="mt-4 font-serif text-4xl font-bold">
          My Little To-Dos ✏️
        </h1>

        <p className="mt-3 text-sm text-[#947c76]">
          Small steps toward big dreams. ♡
        </p>
      </header>

      <div className="rounded-2xl bg-[#e7c5c2] p-6">
        <p className="text-sm font-medium">
          🌸 Your progress
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {completedCount} / {tasks.length} tasks completed
        </h2>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/50">
          <div
            className="h-full rounded-full bg-[#9d717e] transition-all"
            style={{
              width: `${
                tasks.length
                  ? (completedCount / tasks.length) * 100
                  : 0
              }%`,
            }}
          />
        </div>
      </div>

      <form
        onSubmit={addTask}
        className="rounded-2xl border border-[#eee1da] bg-[#fffaf6] p-6 shadow-sm"
      >
        <h2 className="font-serif text-xl font-bold">
          Add a Little Goal ✨
        </h2>

        <div className="mt-5 flex flex-wrap gap-3">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What would you like to accomplish?"
            className="min-w-0 flex-1 rounded-xl border border-[#e6d4ca] bg-white px-4 py-3 text-sm outline-none focus:border-[#b78591]"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as Task["category"])
            }
            className="rounded-xl border border-[#e6d4ca] bg-white px-4 py-3 text-sm"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <button
            type="submit"
            className="rounded-xl bg-[#49332f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#624944]"
          >
            + Add Task
          </button>
        </div>
      </form>

      <section className="rounded-2xl border border-[#eee1da] bg-[#fffaf6] p-6 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                filter === item
                  ? "bg-[#49332f] text-white"
                  : "bg-[#f3e4e1] text-[#49332f] hover:bg-[#e9d1d0]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          {!loaded ? (
            <p className="text-sm text-[#947c76]">
              Loading your goals...
            </p>
          ) : visibleTasks.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-4xl">🌷</p>
              <p className="mt-3 text-sm text-[#947c76]">
                No tasks here yet. Add your first little goal!
              </p>
            </div>
          ) : (
            visibleTasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-wrap items-center gap-3 rounded-xl bg-[#f9f0e9] p-4"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 accent-[#b78591]"
                />

                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-medium ${
                      task.completed
                        ? "text-[#a38e87] line-through"
                        : ""
                    }`}
                  >
                    {task.title}
                  </p>

                  <p className="mt-1 text-xs text-[#947c76]">
                    {task.category}
                  </p>
                </div>

                <button
                  onClick={() => editTask(task.id)}
                  className="rounded-lg px-3 py-2 text-xs text-[#785b65] hover:bg-[#ead8d2]"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="rounded-lg px-3 py-2 text-xs text-red-700 hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
