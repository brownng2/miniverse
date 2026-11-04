"use client";

import { useEffect, useState } from "react";

type Workout = {
  id: string;
  name: string;
  duration: number;
  date: string;
  notes: string;
};

type FitnessData = {
  date: string;
  steps: number;
  stepGoal: number;
  workouts: Workout[];
};

function localDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function FitnessPage() {
  const [data, setData] = useState<FitnessData>({
    date: "",
    steps: 0,
    stepGoal: 8000,
    workouts: [],
  });

  const [workoutName, setWorkoutName] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const today = localDate();

    try {
      const saved = localStorage.getItem("miniverse-fitness");

      if (saved) {
        const parsed = JSON.parse(saved) as FitnessData;

        setData({
          date: today,
          steps: parsed.date === today ? parsed.steps : 0,
          stepGoal: parsed.stepGoal || 8000,
          workouts: Array.isArray(parsed.workouts)
            ? parsed.workouts
            : [],
        });
      } else {
        setData({
          date: today,
          steps: 0,
          stepGoal: 8000,
          workouts: [],
        });
      }
    } catch {
      setData({
        date: today,
        steps: 0,
        stepGoal: 8000,
        workouts: [],
      });
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(
        "miniverse-fitness",
        JSON.stringify(data)
      );
    }
  }, [data, loaded]);

  function addWorkout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!workoutName.trim()) return;

    const workout: Workout = {
      id: crypto.randomUUID(),
      name: workoutName.trim(),
      duration: Math.max(0, Number(duration) || 0),
      date: localDate(),
      notes: notes.trim(),
    };

    setData((previous) => ({
      ...previous,
      workouts: [workout, ...previous.workouts],
    }));

    setWorkoutName("");
    setDuration("");
    setNotes("");
  }

  function deleteWorkout(id: string) {
    setData((previous) => ({
      ...previous,
      workouts: previous.workouts.filter(
        (workout) => workout.id !== id
      ),
    }));
  }

  const stepPercentage = data.stepGoal
    ? Math.min(100, (data.steps / data.stepGoal) * 100)
    : 0;

  const todaysWorkouts = data.workouts.filter(
    (workout) => workout.date === data.date
  );

  const totalMinutes = todaysWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  return (
    <div className="space-y-7">
      <header>
        <p className="text-xs font-semibold tracking-[0.2em] text-[#a38481]">
          ✦ GROW AT YOUR OWN PACE
        </p>

        <h1 className="mt-4 font-serif text-4xl font-bold">
          Fitness Garden 🌿
        </h1>

        <p className="mt-3 text-sm text-[#947c76]">
          Every little movement helps you bloom. ♡
        </p>
      </header>

      {/* Fitness statistics */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { title: "Today's Steps", value: data.steps.toLocaleString(), emoji: "👟" },
          { title: "Today's Workouts", value: todaysWorkouts.length, emoji: "🏋️" },
          { title: "Minutes Active", value: totalMinutes, emoji: "⏱️" },
        ].map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-[#eee1da] bg-[#fffaf6] p-5"
          >
            <span className="text-2xl">{stat.emoji}</span>
            <p className="mt-3 text-xs text-[#947c76]">
              {stat.title}
            </p>
            <p className="mt-2 text-3xl font-bold">
              {loaded ? stat.value : "—"}
            </p>
          </div>
        ))}
      </section>

      {/* Step tracker */}
      <section className="rounded-2xl border border-[#eee1da] bg-[#fffaf6] p-6">
        <h2 className="font-serif text-2xl font-bold">
          Daily Step Garden 🌷
        </h2>

        <p className="mt-2 text-sm text-[#947c76]">
          Log your steps and watch your progress grow.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span>Today's Steps</span>
            <input
              type="number"
              min="0"
              value={data.steps}
              disabled={!loaded}
              onChange={(e) =>
                setData((previous) => ({
                  ...previous,
                  steps: Math.max(0, Number(e.target.value) || 0),
                }))
              }
              className="w-full rounded-xl border border-[#e6d4ca] bg-white p-3"
            />
          </label>

          <label className="space-y-2 text-sm">
            <span>Daily Step Goal</span>
            <input
              type="number"
              min="1"
              value={data.stepGoal}
              disabled={!loaded}
              onChange={(e) =>
                setData((previous) => ({
                  ...previous,
                  stepGoal: Math.max(1, Number(e.target.value) || 1),
                }))
              }
              className="w-full rounded-xl border border-[#e6d4ca] bg-white p-3"
            />
          </label>
        </div>

        <div className="mt-7 flex justify-between text-sm">
          <span>Today's progress</span>
          <span>
            {Math.round(stepPercentage)}%
          </span>
        </div>

        <div className="mt-3 h-4 overflow-hidden rounded-full bg-[#f1e2de]">
          <div
            className="h-full rounded-full bg-[#a6bba4] transition-all duration-300"
            style={{ width: `${stepPercentage}%` }}
          />
        </div>

        {stepPercentage >= 100 && (
          <p className="mt-4 text-sm font-semibold text-[#6e9670]">
            🌸 Your step garden is blooming! Goal reached!
          </p>
        )}
      </section>

      {/* Workout form */}
      <form
        onSubmit={addWorkout}
        className="space-y-5 rounded-2xl border border-[#eee1da] bg-[#fffaf6] p-6"
      >
        <h2 className="font-serif text-2xl font-bold">
          Log a Workout 🏋️
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span>Workout Name</span>
            <input
              required
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              placeholder="Glute Day, Pilates, Walking..."
              className="w-full rounded-xl border border-[#e6d4ca] bg-white p-3"
            />
          </label>

          <label className="space-y-2 text-sm">
            <span>Duration (minutes)</span>
            <input
              type="number"
              min="0"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="45"
              className="w-full rounded-xl border border-[#e6d4ca] bg-white p-3"
            />
          </label>
        </div>

        <label className="block space-y-2 text-sm">
          <span>Workout Notes</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="How did today's workout go?"
            className="w-full rounded-xl border border-[#e6d4ca] bg-white p-3"
          />
        </label>

        <button
          type="submit"
          disabled={!loaded}
          className="rounded-xl bg-[#49332f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#624944]"
        >
          + Save Workout
        </button>
      </form>

      {/* Workout history */}
      <section className="rounded-2xl border border-[#eee1da] bg-[#fffaf6] p-6">
        <h2 className="font-serif text-2xl font-bold">
          Workout Journal 📓
        </h2>

        <div className="mt-5 space-y-3">
          {data.workouts.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#947c76]">
              No workouts logged yet. Your journey starts here! 🌱
            </p>
          ) : (
            data.workouts.map((workout) => (
              <div
                key={workout.id}
                className="flex flex-wrap items-start justify-between gap-3 rounded-xl bg-[#f9f0e9] p-4"
              >
                <div>
                  <p className="font-semibold">
                    {workout.name}
                  </p>

                  <p className="mt-1 text-xs text-[#947c76]">
                    {workout.date} · {workout.duration} minutes
                  </p>

                  {workout.notes && (
                    <p className="mt-2 whitespace-pre-wrap text-sm">
                      {workout.notes}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => deleteWorkout(workout.id)}
                  className="text-xs text-red-700 hover:underline"
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
