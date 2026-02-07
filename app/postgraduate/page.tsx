"use client";

import React, { useMemo, useState } from "react";

type Country = "Any" | "UK" | "USA" | "Canada" | "Australia" | "Germany" | "Ireland";
type Intake = "Any" | "Jan" | "May" | "Sep";
type Degree = "Any" | "MSc" | "MA" | "MBA" | "MEng" | "LLM";
type Stream =
  | "Any"
  | "Business"
  | "Engineering"
  | "Computer Science"
  | "Data Science"
  | "Finance"
  | "Law"
  | "Public Health";

type Duration = "Any" | "1 year" | "2 years";
type Budget = "Any" | "Under £15k" | "£15k–£25k" | "£25k–£40k" | "£40k+";

type PGProgram = {
  id: string;
  university: string;
  program: string;
  degree: Exclude<Degree, "Any">;
  country: Exclude<Country, "Any">;
  city: string;
  stream: Exclude<Stream, "Any">;
  intake: Exclude<Intake, "Any">[];
  duration: Exclude<Duration, "Any">;
  tuition: Exclude<Budget, "Any">;
  requirements: string[];
  highlights: string[];
};

const PROGRAMS: PGProgram[] = [
  {
    id: "pg1",
    university: "University of Manchester",
    program: "MSc Advanced Computer Science",
    degree: "MSc",
    country: "UK",
    city: "Manchester",
    stream: "Computer Science",
    intake: ["Sep"],
    duration: "1 year",
    tuition: "£25k–£40k",
    requirements: ["Bachelor’s in related field", "IELTS 6.5 (varies)", "SOP + CV"],
    highlights: ["Strong industry links", "Good placements", "Top research"],
  },
  {
    id: "pg2",
    university: "University of Leeds",
    program: "MSc Data Science",
    degree: "MSc",
    country: "UK",
    city: "Leeds",
    stream: "Data Science",
    intake: ["Sep"],
    duration: "1 year",
    tuition: "£25k–£40k",
    requirements: ["Quant background", "IELTS 6.5 (varies)", "SOP + CV"],
    highlights: ["High-demand field", "Great career services", "Modern curriculum"],
  },
  {
    id: "pg3",
    university: "Trinity College Dublin",
    program: "MSc Finance",
    degree: "MSc",
    country: "Ireland",
    city: "Dublin",
    stream: "Finance",
    intake: ["Sep"],
    duration: "1 year",
    tuition: "£15k–£25k",
    requirements: ["Bachelor’s degree", "IELTS 6.5 (varies)", "CV"],
    highlights: ["Strong ROI", "EU exposure", "Good internships"],
  },
  {
    id: "pg4",
    university: "Monash University",
    program: "Master of Public Health",
    degree: "MA",
    country: "Australia",
    city: "Melbourne",
    stream: "Public Health",
    intake: ["Jan", "May", "Sep"],
    duration: "2 years",
    tuition: "£25k–£40k",
    requirements: ["Relevant bachelor’s", "English requirement", "SOP (varies)"],
    highlights: ["Global recognition", "Research + practical", "Good pathways"],
  },
  {
    id: "pg5",
    university: "Technical University of Munich (TUM)",
    program: "MSc Mechanical Engineering",
    degree: "MSc",
    country: "Germany",
    city: "Munich",
    stream: "Engineering",
    intake: ["Sep"],
    duration: "2 years",
    tuition: "Under £15k",
    requirements: ["Strong academics", "Some programs need German/English proof", "CV + SOP"],
    highlights: ["High reputation", "Lower tuition", "Strong industry network"],
  },
];

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function PostgraduatePage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState<Country>("Any");
  const [intake, setIntake] = useState<Intake>("Any");
  const [degree, setDegree] = useState<Degree>("Any");
  const [stream, setStream] = useState<Stream>("Any");
  const [duration, setDuration] = useState<Duration>("Any");
  const [budget, setBudget] = useState<Budget>("Any");
  const [sort, setSort] = useState<"Best match" | "A-Z">("Best match");

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();

    const filtered = PROGRAMS.filter((p) => {
      const matchesSearch =
        !q ||
        p.university.toLowerCase().includes(q) ||
        p.program.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.stream.toLowerCase().includes(q) ||
        p.degree.toLowerCase().includes(q);

      const matchesCountry = country === "Any" ? true : p.country === country;
      const matchesIntake = intake === "Any" ? true : p.intake.includes(intake as any);
      const matchesDegree = degree === "Any" ? true : p.degree === degree;
      const matchesStream = stream === "Any" ? true : p.stream === stream;
      const matchesDuration = duration === "Any" ? true : p.duration === duration;
      const matchesBudget = budget === "Any" ? true : p.tuition === budget;

      return (
        matchesSearch &&
        matchesCountry &&
        matchesIntake &&
        matchesDegree &&
        matchesStream &&
        matchesDuration &&
        matchesBudget
      );
    });

    if (sort === "A-Z") return filtered.sort((a, b) => a.program.localeCompare(b.program));

    // Best match: UK + 1 year + Sep intake (common), then stable
    return filtered.sort((a, b) => {
      const aScore =
        (a.country === "UK" ? 0 : 1) +
        (a.duration === "1 year" ? 0 : 1) +
        (a.intake.includes("Sep") ? 0 : 1);

      const bScore =
        (b.country === "UK" ? 0 : 1) +
        (b.duration === "1 year" ? 0 : 1) +
        (b.intake.includes("Sep") ? 0 : 1);

      if (aScore !== bScore) return aScore - bScore;
      return a.program.localeCompare(b.program);
    });
  }, [search, country, intake, degree, stream, duration, budget, sort]);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                Postgraduate Programs
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Find Your Master’s Program
              </h1>

              <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
                Filter by country, degree, stream and intake.
                <br />
                Get shortlist based on your profile.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#programs"
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white"
              >
                Browse Programs
              </a>
              <button className="rounded-xl border px-5 py-3 text-sm font-medium">
                Talk to Expert
              </button>
            </div>
          </div>

          {/* FILTERS */}
          <div className="mt-8 grid gap-3 rounded-2xl border bg-slate-50 p-5 md:grid-cols-6">
            <div className="md:col-span-2">
              <label className="text-xs text-slate-600">Search</label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="MSc Data Science, MBA, London..."
                className="mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value as Country)}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              >
                {["Any", "UK", "USA", "Canada", "Australia", "Germany", "Ireland"].map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600">Intake</label>
              <select
                value={intake}
                onChange={(e) => setIntake(e.target.value as Intake)}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              >
                {["Any", "Jan", "May", "Sep"].map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600">Degree</label>
              <select
                value={degree}
                onChange={(e) => setDegree(e.target.value as Degree)}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              >
                {["Any", "MSc", "MA", "MBA", "MEng", "LLM"].map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600">Stream</label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value as Stream)}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              >
                {[
                  "Any",
                  "Business",
                  "Engineering",
                  "Computer Science",
                  "Data Science",
                  "Finance",
                  "Law",
                  "Public Health",
                ].map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value as Duration)}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              >
                {["Any", "1 year", "2 years"].map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600">Budget</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value as Budget)}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              >
                {["Any", "Under £15k", "£15k–£25k", "£25k–£40k", "£40k+"].map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-slate-600">Sort</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              >
                <option>Best match</option>
                <option>A-Z</option>
              </select>
            </div>

            <div className="md:col-span-4 flex items-end">
              <button
                onClick={() => {
                  setSearch("");
                  setCountry("Any");
                  setIntake("Any");
                  setDegree("Any");
                  setStream("Any");
                  setDuration("Any");
                  setBudget("Any");
                  setSort("Best match");
                }}
                className="w-full rounded-xl border bg-white px-4 py-3 text-sm font-medium"
              >
                Reset Filters
              </button>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Note: Demo programs shown. Connect your real dataset/API for production.
          </p>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Programs</h2>
            <p className="text-sm text-slate-600">
              Showing {results.length} program{results.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="text-sm text-slate-600">Tip: check entry requirements carefully.</div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {results.map((p) => (
            <article key={p.id} className="rounded-2xl border p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-slate-500">
                    {p.country} • {p.city}
                  </div>
                  <h3 className="mt-1 text-base font-semibold">{p.program}</h3>
                  <div className="mt-1 text-sm text-slate-600">{p.university}</div>
                </div>

                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                  {p.degree}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Stream</div>
                  <div className="mt-1 font-medium">{p.stream}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Duration</div>
                  <div className="mt-1 font-medium">{p.duration}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Intakes</div>
                  <div className="mt-1 font-medium">{p.intake.join(", ")}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Tuition</div>
                  <div className="mt-1 font-medium">{p.tuition}</div>
                </div>
              </div>

              <div className="mt-3">
                <div className="text-xs font-medium text-slate-500">Requirements</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.requirements.slice(0, 3).map((r) => (
                    <span key={r} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                      {r}
                    </span>
                  ))}
                  {p.requirements.length > 3 && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                      +{p.requirements.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-3">
                <div className="text-xs font-medium text-slate-500">Highlights</div>
                <p className="mt-1 text-sm text-slate-600">
                  {p.highlights.slice(0, 2).join(" • ")}
                  {p.highlights.length > 2 ? " • ..." : ""}
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                  Get Shortlist
                </button>
                <button className="rounded-xl border px-4 py-2 text-sm font-medium">
                  Details
                </button>
              </div>
            </article>
          ))}
        </div>

        {results.length === 0 && (
          <div className="mt-8 rounded-2xl border bg-slate-50 p-6">
            <div className="text-sm font-medium">No matches found</div>
            <div className="mt-1 text-sm text-slate-600">
              Try changing country, degree, or stream.
            </div>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="rounded-2xl border bg-white p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Want a PG shortlist based on your profile?</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Degree + marks + work experience + budget.
                  <br />
                  We’ll suggest best options.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white">
                  Free Profile Check
                </button>
                <button className="rounded-xl border px-5 py-3 text-sm font-medium">
                  Talk to Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
          © {new Date().getFullYear()} Postgraduate Programs
        </div>
      </footer>
    </main>
  );
}
