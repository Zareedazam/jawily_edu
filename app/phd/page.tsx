"use client";

import React, { useMemo, useState } from "react";

type Country = "Any" | "UK" | "USA" | "Canada" | "Australia" | "Germany" | "Ireland" | "Netherlands";
type Intake = "Any" | "Rolling" | "Jan" | "May" | "Sep";
type Field =
  | "Any"
  | "Engineering"
  | "Computer Science"
  | "Data Science"
  | "Business"
  | "Medicine"
  | "Public Health"
  | "Law"
  | "Psychology";

type Funding = "Any" | "Funded" | "Self-funded" | "Mixed";
type Mode = "Any" | "Full-time" | "Part-time";
type Deadline = "Any" | "Open" | "Next 30 days" | "Next 90 days";

type PhDProgram = {
  id: string;
  university: string;
  title: string;
  country: Exclude<Country, "Any">;
  city: string;
  field: Exclude<Field, "Any">;
  intake: Exclude<Intake, "Any">[];
  funding: Exclude<Funding, "Any">;
  mode: Exclude<Mode, "Any">;
  deadlineGroup: Exclude<Deadline, "Any">;
  deadlineText: string;
  requirements: string[];
  highlights: string[];
};

const PROGRAMS: PhDProgram[] = [
  {
    id: "phd1",
    university: "University of Oxford",
    title: "DPhil Engineering Science (Research Track)",
    country: "UK",
    city: "Oxford",
    field: "Engineering",
    intake: ["Sep", "Jan"],
    funding: "Mixed",
    mode: "Full-time",
    deadlineGroup: "Next 90 days",
    deadlineText: "Varies by department / funding call",
    requirements: ["Strong Master’s (preferred)", "Research proposal", "References", "English proof"],
    highlights: ["World-class supervision", "Strong labs", "Funding calls vary"],
  },
  {
    id: "phd2",
    university: "Technical University of Munich (TUM)",
    title: "PhD in Mechanical Engineering (Chair-based)",
    country: "Germany",
    city: "Munich",
    field: "Engineering",
    intake: ["Rolling"],
    funding: "Funded",
    mode: "Full-time",
    deadlineGroup: "Open",
    deadlineText: "Rolling (depends on chair/supervisor)",
    requirements: ["Strong academics", "CV + research interests", "Supervisor match"],
    highlights: ["Industry network", "Often funded positions", "Project-based hiring"],
  },
  {
    id: "phd3",
    university: "University of Toronto",
    title: "PhD Computer Science (AI/Systems)",
    country: "Canada",
    city: "Toronto",
    field: "Computer Science",
    intake: ["Sep"],
    funding: "Funded",
    mode: "Full-time",
    deadlineGroup: "Next 90 days",
    deadlineText: "Fall intake (department deadlines)",
    requirements: ["Strong Master’s or top UG", "Research experience", "References", "SOP"],
    highlights: ["Top research groups", "High competition", "Funding available"],
  },
  {
    id: "phd4",
    university: "University of Melbourne",
    title: "PhD Public Health (Epidemiology)",
    country: "Australia",
    city: "Melbourne",
    field: "Public Health",
    intake: ["Rolling", "Jan", "Sep"],
    funding: "Mixed",
    mode: "Full-time",
    deadlineGroup: "Open",
    deadlineText: "Rolling (scholarship rounds vary)",
    requirements: ["Research proposal", "Supervisor match", "English proof"],
    highlights: ["Strong public health school", "Scholarship rounds", "Research impact"],
  },
  {
    id: "phd5",
    university: "Delft University of Technology (TU Delft)",
    title: "PhD Data Science (Applied Research)",
    country: "Netherlands",
    city: "Delft",
    field: "Data Science",
    intake: ["Rolling"],
    funding: "Funded",
    mode: "Full-time",
    deadlineGroup: "Open",
    deadlineText: "Rolling (project vacancies)",
    requirements: ["Relevant MSc", "Publications/projects helpful", "Motivation letter", "CV"],
    highlights: ["Project-based PhD jobs", "Often salaried", "Strong labs"],
  },
];

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function PhDPage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState<Country>("Any");
  const [intake, setIntake] = useState<Intake>("Any");
  const [field, setField] = useState<Field>("Any");
  const [funding, setFunding] = useState<Funding>("Any");
  const [mode, setMode] = useState<Mode>("Any");
  const [deadline, setDeadline] = useState<Deadline>("Any");
  const [sort, setSort] = useState<"Best match" | "Soonest" | "A-Z">("Best match");

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();

    const filtered = PROGRAMS.filter((p) => {
      const matchesSearch =
        !q ||
        p.university.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.field.toLowerCase().includes(q);

      const matchesCountry = country === "Any" ? true : p.country === country;
      const matchesIntake = intake === "Any" ? true : p.intake.includes(intake as any);
      const matchesField = field === "Any" ? true : p.field === field;
      const matchesFunding = funding === "Any" ? true : p.funding === funding;
      const matchesMode = mode === "Any" ? true : p.mode === mode;
      const matchesDeadline = deadline === "Any" ? true : p.deadlineGroup === deadline;

      return (
        matchesSearch &&
        matchesCountry &&
        matchesIntake &&
        matchesField &&
        matchesFunding &&
        matchesMode &&
        matchesDeadline
      );
    });

    if (sort === "A-Z") return filtered.sort((a, b) => a.title.localeCompare(b.title));

    if (sort === "Soonest") {
      const weight = (g: Deadline) =>
        g === "Next 30 days" ? 0 : g === "Next 90 days" ? 1 : g === "Open" ? 2 : 3;

      return filtered.sort((a, b) => weight(a.deadlineGroup as any) - weight(b.deadlineGroup as any));
    }

    // Best match: Funded + Rolling/Open first, then stable
    const score = (p: PhDProgram) =>
      (p.funding === "Funded" ? 0 : 1) +
      (p.deadlineGroup === "Next 30 days" ? 0 : p.deadlineGroup === "Next 90 days" ? 1 : 2) +
      (p.intake.includes("Rolling") ? 0 : 1);

    return filtered.sort((a, b) => {
      const sa = score(a);
      const sb = score(b);
      if (sa !== sb) return sa - sb;
      return a.title.localeCompare(b.title);
    });
  }, [search, country, intake, field, funding, mode, deadline, sort]);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                <span className="h-2 w-2 rounded-full bg-fuchsia-500" />
                PhD Programs
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Find Funded PhD Opportunities
              </h1>

              <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
                Filter by country, field, funding, and deadlines.
                <br />
                Get a clear shortlist for your research goals.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#programs"
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white"
              >
                Browse PhD Options
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
                placeholder="AI, Mechanical, Oxford, Delft..."
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
                {["Any", "UK", "USA", "Canada", "Australia", "Germany", "Ireland", "Netherlands"].map(
                  (x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600">Field</label>
              <select
                value={field}
                onChange={(e) => setField(e.target.value as Field)}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              >
                {[
                  "Any",
                  "Engineering",
                  "Computer Science",
                  "Data Science",
                  "Business",
                  "Medicine",
                  "Public Health",
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
              <label className="text-xs text-slate-600">Funding</label>
              <select
                value={funding}
                onChange={(e) => setFunding(e.target.value as Funding)}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              >
                {["Any", "Funded", "Self-funded", "Mixed"].map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600">Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as Mode)}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              >
                {["Any", "Full-time", "Part-time"].map((x) => (
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
                {["Any", "Rolling", "Jan", "May", "Sep"].map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-slate-600">Deadline</label>
              <select
                value={deadline}
                onChange={(e) => setDeadline(e.target.value as Deadline)}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              >
                {["Any", "Open", "Next 30 days", "Next 90 days"].map((x) => (
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
                <option>Soonest</option>
                <option>A-Z</option>
              </select>
            </div>

            <div className="md:col-span-2 flex items-end">
              <button
                onClick={() => {
                  setSearch("");
                  setCountry("Any");
                  setIntake("Any");
                  setField("Any");
                  setFunding("Any");
                  setMode("Any");
                  setDeadline("Any");
                  setSort("Best match");
                }}
                className="w-full rounded-xl border bg-white px-4 py-3 text-sm font-medium"
              >
                Reset Filters
              </button>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Note: Demo PhD listings shown. Replace with your real data/API.
          </p>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">PhD Opportunities</h2>
            <p className="text-sm text-slate-600">
              Showing {results.length} result{results.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="text-sm text-slate-600">Tip: supervisor match matters most.</div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {results.map((p) => (
            <article key={p.id} className="rounded-2xl border p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-slate-500">
                    {p.country} • {p.city}
                  </div>
                  <h3 className="mt-1 text-base font-semibold">{p.title}</h3>
                  <div className="mt-1 text-sm text-slate-600">{p.university}</div>
                </div>

                <span
                  className={cx(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    p.funding === "Funded"
                      ? "bg-emerald-50 text-emerald-700"
                      : p.funding === "Mixed"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-slate-100 text-slate-700"
                  )}
                >
                  {p.funding}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Field</div>
                  <div className="mt-1 font-medium">{p.field}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Mode</div>
                  <div className="mt-1 font-medium">{p.mode}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Intake</div>
                  <div className="mt-1 font-medium">{p.intake.join(", ")}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Deadline</div>
                  <div className="mt-1 font-medium">{p.deadlineGroup}</div>
                </div>
              </div>

              <div className="mt-3">
                <div className="text-xs font-medium text-slate-500">Deadline note</div>
                <p className="mt-1 text-sm text-slate-600">{p.deadlineText}</p>
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
                  Get Supervisor Shortlist
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
              Try changing country, field, or funding.
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
                <h3 className="text-lg font-semibold">Want funded PhD targets for your profile?</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Share your research interests + CV.
                  <br />
                  We’ll suggest realistic matches.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white">
                  Free Research Check
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
          © {new Date().getFullYear()} PhD Programs
        </div>
      </footer>
    </main>
  );
}
