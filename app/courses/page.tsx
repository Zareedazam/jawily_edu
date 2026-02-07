"use client";

import React, { useMemo, useState } from "react";

type Level = "Any" | "Foundation" | "Undergraduate" | "Postgraduate" | "Short Course";
type Mode = "Any" | "On-campus" | "Online" | "Hybrid";
type Duration = "Any" | "0-3 months" | "3-6 months" | "6-12 months" | "12+ months";

type Course = {
  id: string;
  title: string;
  city: string;
  university: string;
  level: Exclude<Level, "Any">;
  mode: Exclude<Mode, "Any">;
  feeGBP: number;
  durationMonths: number;
  startDate: string; // YYYY-MM-DD
  verified: boolean;
  rating: number; // 1-5
  tags: string[];
};

const COURSES: Course[] = [
  {
    id: "c1",
    title: "MSc Data Science",
    city: "London",
    university: "University of London",
    level: "Postgraduate",
    mode: "On-campus",
    feeGBP: 12500,
    durationMonths: 12,
    startDate: "2026-09-15",
    verified: true,
    rating: 4.7,
    tags: ["Scholarship Support", "Career Service", "Project-based"],
  },
  {
    id: "c2",
    title: "BEng Mechanical Engineering",
    city: "Manchester",
    university: "University of Manchester",
    level: "Undergraduate",
    mode: "On-campus",
    feeGBP: 9800,
    durationMonths: 36,
    startDate: "2026-09-20",
    verified: true,
    rating: 4.6,
    tags: ["Accredited", "Labs Access", "Industry Links"],
  },
  {
    id: "c3",
    title: "Short Course: UX Design Bootcamp",
    city: "Birmingham",
    university: "Birmingham Institute",
    level: "Short Course",
    mode: "Hybrid",
    feeGBP: 1200,
    durationMonths: 3,
    startDate: "2026-03-10",
    verified: false,
    rating: 4.2,
    tags: ["Portfolio", "Mentor Support", "Weekend Batches"],
  },
  {
    id: "c4",
    title: "Foundation Year in Business",
    city: "Leeds",
    university: "University of Leeds",
    level: "Foundation",
    mode: "On-campus",
    feeGBP: 6500,
    durationMonths: 9,
    startDate: "2026-01-25",
    verified: true,
    rating: 4.4,
    tags: ["Pathway", "Study Skills", "Academic English"],
  },
  {
    id: "c5",
    title: "MBA (Online)",
    city: "London",
    university: "King's College London",
    level: "Postgraduate",
    mode: "Online",
    feeGBP: 14500,
    durationMonths: 18,
    startDate: "2026-05-05",
    verified: true,
    rating: 4.5,
    tags: ["Flexible Schedule", "Leadership", "Global Network"],
  },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function formatFee(n: number) {
  return `£${n.toLocaleString()}`;
}

function durationLabel(months: number): Exclude<Duration, "Any"> {
  if (months <= 3) return "0-3 months";
  if (months <= 6) return "3-6 months";
  if (months <= 12) return "6-12 months";
  return "12+ months";
}

export default function CoursePage() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<Level>("Any");
  const [mode, setMode] = useState<Mode>("Any");
  const [duration, setDuration] = useState<Duration>("Any");
  const [startBy, setStartBy] = useState<string>(""); // YYYY-MM-DD
  const [budget, setBudget] = useState<number>(12000);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    return COURSES.filter((c) => {
      const matchesQuery =
        !q ||
        c.city.toLowerCase().includes(q) ||
        c.university.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q);

      const matchesLevel = level === "Any" ? true : c.level === level;
      const matchesMode = mode === "Any" ? true : c.mode === mode;
      const matchesBudget = c.feeGBP <= budget;
      const matchesDuration = duration === "Any" ? true : durationLabel(c.durationMonths) === duration;

      // safer than new Date(...) for YYYY-MM-DD
      const matchesStartBy = !startBy ? true : c.startDate <= startBy;

      return (
        matchesQuery &&
        matchesLevel &&
        matchesMode &&
        matchesBudget &&
        matchesDuration &&
        matchesStartBy
      );
    }).sort((a, b) => {
      // verified first, then rating, then cheaper
      if (a.verified !== b.verified) return a.verified ? -1 : 1;
      if (b.rating !== a.rating) return b.rating - a.rating;
      return a.feeGBP - b.feeGBP;
    });
  }, [query, level, mode, duration, startBy, budget]);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Verified courses with trusted info
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Find the Right Course Fast
              </h1>

              <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
                Search by city or university. Compare verified courses, fees,
                duration, and start dates.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm">
                  Get Free Guidance
                </button>
                <button className="rounded-xl border px-5 py-3 text-sm font-medium">
                  Talk to Expert
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  Clear fee info
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  Trusted listings
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  Free support
                </span>
              </div>
            </div>

            {/* QUICK SEARCH */}
            <div className="w-full md:w-[420px]">
              <div className="rounded-2xl border bg-slate-50 p-5 shadow-sm">
                <div className="text-sm font-medium">Quick Search</div>
                <p className="mt-1 text-sm text-slate-600">
                  City, university, or course name
                </p>

                <div className="mt-4 flex gap-2">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. London, MBA, University of Manchester"
                    className="w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                  />
                  <button
                    onClick={() => setQuery("")}
                    className="rounded-xl border bg-white px-4 py-3 text-sm"
                    aria-label="Clear search"
                  >
                    Clear
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-600">Level</label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value as Level)}
                      className="rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      {["Any", "Foundation", "Undergraduate", "Postgraduate", "Short Course"].map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-600">Mode</label>
                    <select
                      value={mode}
                      onChange={(e) => setMode(e.target.value as Mode)}
                      className="rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      {["Any", "On-campus", "Online", "Hybrid"].map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-600">Duration</label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value as Duration)}
                      className="rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      {["Any", "0-3 months", "3-6 months", "6-12 months", "12+ months"].map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-600">Start by</label>
                    <input
                      value={startBy}
                      onChange={(e) => setStartBy(e.target.value)}
                      type="date"
                      className="rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                    />
                  </div>

                  <div className="col-span-2 flex flex-col gap-1">
                    <label className="text-xs text-slate-600">Budget (max)</label>
                    <div className="rounded-xl border bg-white px-3 py-3 text-sm">
                      {formatFee(budget)}
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <input
                    type="range"
                    min={500}
                    max={20000}
                    step={100}
                    value={budget}
                    onChange={(e) => setBudget(clamp(Number(e.target.value), 500, 20000))}
                    className="w-full"
                  />
                  <div className="mt-1 flex justify-between text-xs text-slate-500">
                    <span>£500</span>
                    <span>£20,000</span>
                  </div>
                </div>

                <button className="mt-4 w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white">
                  Get Free Guidance
                </button>
                <p className="mt-2 text-center text-xs text-slate-500">
                  We’ll share options that fit your plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-xl font-semibold">Why choose us</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {[
            { t: "Verified Details", d: "Trusted info first." },
            { t: "Top Universities", d: "Best study options." },
            { t: "Flexible Learning", d: "Online or campus." },
            { t: "Free Support", d: "From shortlist to apply." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border p-5">
              <div className="text-sm font-medium">{x.t}</div>
              <div className="mt-1 text-sm text-slate-600">{x.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* RESULTS */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Available courses</h2>
            <p className="text-sm text-slate-600">
              Showing {results.length} result{results.length === 1 ? "" : "s"}{" "}
              (sorted by verified, rating, then fee)
            </p>
          </div>

          <div className="text-sm text-slate-600">Tip: search “city” or “university”</div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {results.map((c) => (
            <article
              key={c.id}
              className="rounded-2xl border p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-slate-500">{c.city}</div>
                  <h3 className="mt-1 text-base font-semibold">{c.title}</h3>
                </div>
                {c.verified ? (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    Verified
                  </span>
                ) : (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    Listing
                  </span>
                )}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Level</div>
                  <div className="mt-1 font-medium">{c.level}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Mode</div>
                  <div className="mt-1 font-medium">{c.mode}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Fee</div>
                  <div className="mt-1 font-medium">{formatFee(c.feeGBP)}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Start</div>
                  <div className="mt-1 font-medium">{c.startDate}</div>
                </div>
              </div>

              <div className="mt-3 text-sm text-slate-600">
                University: <span className="font-medium">{c.university}</span>
              </div>

              <div className="mt-2 text-sm text-slate-600">
                Duration: <span className="font-medium">{c.durationMonths} months</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {c.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Rating: <span className="font-medium">{c.rating.toFixed(1)}</span>
                </div>
                <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                  View Course
                </button>
              </div>
            </article>
          ))}
        </div>

        {results.length === 0 && (
          <div className="mt-8 rounded-2xl border bg-slate-50 p-6">
            <div className="text-sm font-medium">No matches found</div>
            <div className="mt-1 text-sm text-slate-600">
              Try changing search, increasing budget, or removing filters.
            </div>
          </div>
        )}
      </section>

      {/* TYPES + HOW IT WORKS */}
      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-6">
              <h2 className="text-lg font-semibold">Popular course types</h2>
              <div className="mt-4 grid gap-3">
                {[
                  { t: "Foundation", d: "Entry pathway options" },
                  { t: "Undergraduate", d: "Bachelor degree programs" },
                  { t: "Postgraduate", d: "Masters and specializations" },
                  { t: "Short Courses", d: "Fast skill upgrades" },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="flex items-start justify-between gap-4 rounded-xl bg-slate-50 p-4"
                  >
                    <div>
                      <div className="text-sm font-medium">{x.t}</div>
                      <div className="mt-1 text-sm text-slate-600">{x.d}</div>
                    </div>
                    <span className="text-sm text-slate-500">→</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-6">
              <h2 className="text-lg font-semibold">How it works</h2>
              <div className="mt-4 grid gap-3">
                {[
                  { s: "1", t: "Tell us your target city & course", d: "Share your preferences." },
                  { s: "2", t: "Get a shortlist", d: "Best matches first." },
                  { s: "3", t: "Compare and decide", d: "Fees, mode, start dates." },
                  { s: "4", t: "Apply with support", d: "Guidance till submission." },
                ].map((x) => (
                  <div key={x.s} className="flex gap-4 rounded-xl bg-slate-50 p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-white text-sm font-semibold">
                      {x.s}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{x.t}</div>
                      <div className="mt-1 text-sm text-slate-600">{x.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 rounded-2xl border bg-white p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Ready to choose a course?</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Get a free shortlist based on your budget and start date.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white">
                  Get Free Course Help
                </button>
                <button className="rounded-xl border px-5 py-3 text-sm font-medium">
                  Talk to Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
          © {new Date().getFullYear()} Course Finder. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
