"use client";

import React, { useMemo, useState } from "react";

type Country = "Any" | "UK" | "USA" | "Canada" | "Australia" | "Germany" | "Ireland";
type Intake = "Any" | "Jan" | "May" | "Sep";
type Stream =
  | "Any"
  | "Business"
  | "Engineering"
  | "Medicine"
  | "Computer Science"
  | "Arts & Design"
  | "Law"
  | "Psychology";

type Budget = "Any" | "Under £15k" | "£15k–£25k" | "£25k–£40k" | "£40k+";
type Duration = "Any" | "3 years" | "4 years";

type UniProgram = {
  id: string;
  university: string;
  program: string;
  country: Exclude<Country, "Any">;
  city: string;
  stream: Exclude<Stream, "Any">;
  intake: Exclude<Intake, "Any">[];
  duration: Exclude<Duration, "Any">;
  tuition: Exclude<Budget, "Any">;
  requirements: string[];
  highlights: string[];
};

const PROGRAMS: UniProgram[] = [
  {
    id: "ug1",
    university: "University of Manchester",
    program: "BEng Mechanical Engineering",
    country: "UK",
    city: "Manchester",
    stream: "Engineering",
    intake: ["Sep"],
    duration: "3 years",
    tuition: "£25k–£40k",
    requirements: ["Grade 12 strong in Math", "IELTS 6.5 (varies)", "SOP (some courses)"],
    highlights: ["Strong employability", "Big campus life", "Industry links"],
  },
  {
    id: "ug2",
    university: "University of Leeds",
    program: "BSc Computer Science",
    country: "UK",
    city: "Leeds",
    stream: "Computer Science",
    intake: ["Sep"],
    duration: "3 years",
    tuition: "£25k–£40k",
    requirements: ["Grade 12 Math", "IELTS 6.0–6.5", "Personal statement"],
    highlights: ["Great CS teaching", "Career support", "Student city"],
  },
  {
    id: "ug3",
    university: "Monash University",
    program: "Bachelor of Business",
    country: "Australia",
    city: "Melbourne",
    stream: "Business",
    intake: ["Feb" as any, "Jul" as any, "Sep" as any].filter(Boolean) as any,
    duration: "3 years",
    tuition: "£25k–£40k",
    requirements: ["Grade 12 pass", "English requirement", "Statement (varies)"],
    highlights: ["Strong rankings", "Good internships", "Big alumni network"],
  },
  {
    id: "ug4",
    university: "Trinity College Dublin",
    program: "BA Psychology",
    country: "Ireland",
    city: "Dublin",
    stream: "Psychology",
    intake: ["Sep"],
    duration: "4 years",
    tuition: "£15k–£25k",
    requirements: ["Grade 12 pass", "IELTS 6.5 (varies)", "Statement"],
    highlights: ["Research focus", "Great campus", "EU exposure"],
  },
  {
    id: "ug5",
    university: "University of Toronto",
    program: "BSc Life Sciences",
    country: "Canada",
    city: "Toronto",
    stream: "Medicine",
    intake: ["Sep"],
    duration: "4 years",
    tuition: "£40k+",
    requirements: ["Strong grades", "English requirement", "Resume (some cases)"],
    highlights: ["Top research", "Strong pathway options", "Big opportunities"],
  },
];

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function UndergraduatePage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState<Country>("Any");
  const [intake, setIntake] = useState<Intake>("Any");
  const [stream, setStream] = useState<Stream>("Any");
  const [budget, setBudget] = useState<Budget>("Any");
  const [duration, setDuration] = useState<Duration>("Any");
  const [sort, setSort] = useState<"Best match" | "A-Z">("Best match");

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();

    const filtered = PROGRAMS.filter((p) => {
      const matchesSearch =
        !q ||
        p.university.toLowerCase().includes(q) ||
        p.program.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.stream.toLowerCase().includes(q);

      const matchesCountry = country === "Any" ? true : p.country === country;
      const matchesIntake = intake === "Any" ? true : p.intake.includes(intake as any);
      const matchesStream = stream === "Any" ? true : p.stream === stream;
      const matchesBudget = budget === "Any" ? true : p.tuition === budget;
      const matchesDuration = duration === "Any" ? true : p.duration === duration;

      return (
        matchesSearch &&
        matchesCountry &&
        matchesIntake &&
        matchesStream &&
        matchesBudget &&
        matchesDuration
      );
    });

    if (sort === "A-Z") return filtered.sort((a, b) => a.program.localeCompare(b.program));

    // Best match: UK first + Sep intake (common), then stable sort
    return filtered.sort((a, b) => {
      const aScore = (a.country === "UK" ? 0 : 1) + (a.intake.includes("Sep") ? 0 : 1);
      const bScore = (b.country === "UK" ? 0 : 1) + (b.intake.includes("Sep") ? 0 : 1);
      if (aScore !== bScore) return aScore - bScore;
      return a.program.localeCompare(b.program);
    });
  }, [search, country, intake, stream, budget, duration, sort]);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                <span className="h-2 w-2 rounded-full bg-sky-500" />
                Undergraduate Programs
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Find Your Bachelor’s Program
              </h1>

              <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
                Choose country, stream, intake and budget.
                <br />
                Get a clean shortlist based on your goals.
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
                placeholder="Computer Science, London, Business..."
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
                  "Medicine",
                  "Computer Science",
                  "Arts & Design",
                  "Law",
                  "Psychology",
                ].map((x) => (
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

            <div>
              <label className="text-xs text-slate-600">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value as Duration)}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              >
                {["Any", "3 years", "4 years"].map((x) => (
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
                  setStream("Any");
                  setBudget("Any");
                  setDuration("Any");
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
          <div className="text-sm text-slate-600">Tip: shortlist 6–10 programs.</div>
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

                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                  {p.stream}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Duration</div>
                  <div className="mt-1 font-medium">{p.duration}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Tuition</div>
                  <div className="mt-1 font-medium">{p.tuition}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Intakes</div>
                  <div className="mt-1 font-medium">{p.intake.join(", ")}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Stream</div>
                  <div className="mt-1 font-medium">{p.stream}</div>
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
              Try changing country, stream, or budget.
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
                <h3 className="text-lg font-semibold">Want a shortlist based on your profile?</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Marks + budget + course choice.
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
          © {new Date().getFullYear()} Undergraduate Programs
        </div>
      </footer>
    </main>
  );
}
