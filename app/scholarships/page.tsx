"use client";

import React, { useMemo, useState } from "react";

type Country = "Any" | "UK" | "USA" | "Canada" | "Australia" | "Germany" | "Ireland";
type Level = "Any" | "Undergraduate" | "Postgraduate" | "PhD";
type Funding = "Any" | "Full" | "Partial" | "Tuition waiver" | "Stipend";
type Deadline = "Any" | "Open" | "Next 30 days" | "Next 90 days";

type Scholarship = {
  id: string;
  name: string;
  provider: string;
  country: Exclude<Country, "Any">;
  level: Exclude<Level, "Any">;
  funding: Exclude<Funding, "Any">;
  amountText: string;
  deadlineText: string; // UI label
  deadlineGroup: Exclude<Deadline, "Any">;
  tags: string[];
  note: string;
};

const SCHOLARSHIPS: Scholarship[] = [
  {
    id: "s1",
    name: "Global Merit Scholarship",
    provider: "Partner University",
    country: "UK",
    level: "Postgraduate",
    funding: "Partial",
    amountText: "Up to £10,000",
    deadlineText: "Rolling / varies by course",
    deadlineGroup: "Open",
    tags: ["Merit", "International"],
    note: "Strong grades + statement required.",
  },
  {
    id: "s2",
    name: "STEM Excellence Award",
    provider: "Science Faculty",
    country: "USA",
    level: "Undergraduate",
    funding: "Partial",
    amountText: "Up to $15,000",
    deadlineText: "Next 90 days (varies)",
    deadlineGroup: "Next 90 days",
    tags: ["STEM", "Merit"],
    note: "Best for strong academics + projects.",
  },
  {
    id: "s3",
    name: "Need-Based Support Grant",
    provider: "Scholarship Office",
    country: "Canada",
    level: "Undergraduate",
    funding: "Tuition waiver",
    amountText: "Tuition waiver (case-based)",
    deadlineText: "Next 30 days (varies)",
    deadlineGroup: "Next 30 days",
    tags: ["Need-based", "Documents"],
    note: "Income proof + financial docs needed.",
  },
  {
    id: "s4",
    name: "Research Pathway Scholarship",
    provider: "Graduate School",
    country: "Germany",
    level: "PhD",
    funding: "Stipend",
    amountText: "Monthly stipend + fee support",
    deadlineText: "Open / supervisor dependent",
    deadlineGroup: "Open",
    tags: ["Research", "Supervisor"],
    note: "Requires strong proposal + supervisor match.",
  },
  {
    id: "s5",
    name: "High Achiever Scholarship",
    provider: "Partner University",
    country: "Australia",
    level: "Postgraduate",
    funding: "Partial",
    amountText: "25% tuition discount",
    deadlineText: "Next 90 days (varies)",
    deadlineGroup: "Next 90 days",
    tags: ["Merit", "Fast"],
    note: "Apply early for best chance.",
  },
];

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function ScholarshipsPage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState<Country>("Any");
  const [level, setLevel] = useState<Level>("Any");
  const [funding, setFunding] = useState<Funding>("Any");
  const [deadline, setDeadline] = useState<Deadline>("Any");
  const [sort, setSort] = useState<"Best match" | "A-Z">("Best match");

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();

    const filtered = SCHOLARSHIPS.filter((s) => {
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q));

      const matchesCountry = country === "Any" ? true : s.country === country;
      const matchesLevel = level === "Any" ? true : s.level === level;
      const matchesFunding = funding === "Any" ? true : s.funding === funding;
      const matchesDeadline = deadline === "Any" ? true : s.deadlineGroup === deadline;

      return (
        matchesSearch && matchesCountry && matchesLevel && matchesFunding && matchesDeadline
      );
    });

    if (sort === "A-Z") return filtered.sort((a, b) => a.name.localeCompare(b.name));

    // "Best match" = Open first, then partial/full preference not assumed; keep stable.
    return filtered.sort((a, b) => {
      const aOpen = a.deadlineGroup === "Open" ? 0 : 1;
      const bOpen = b.deadlineGroup === "Open" ? 0 : 1;
      if (aOpen !== bOpen) return aOpen - bOpen;
      return a.name.localeCompare(b.name);
    });
  }, [search, country, level, funding, deadline, sort]);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                <span className="h-2 w-2 rounded-full bg-violet-500" />
                Scholarships Finder
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Find Scholarships That Match You
              </h1>

              <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
                Filter by country, level, funding type, and deadlines.
                <br />
                Get a clean shortlist in minutes.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#list"
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white"
              >
                Browse Scholarships
              </a>
              <a
                href="#help"
                className="rounded-xl border px-5 py-3 text-sm font-medium"
              >
                Get Free Help
              </a>
            </div>
          </div>

          {/* FILTERS */}
          <div className="mt-8 grid gap-3 rounded-2xl border bg-slate-50 p-5 md:grid-cols-6">
            <div className="md:col-span-2">
              <label className="text-xs text-slate-600">Search</label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Merit, STEM, need-based..."
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
              <label className="text-xs text-slate-600">Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as Level)}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              >
                {["Any", "Undergraduate", "Postgraduate", "PhD"].map((x) => (
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
                {["Any", "Full", "Partial", "Tuition waiver", "Stipend"].map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            <div>
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
                <option>A-Z</option>
              </select>
            </div>

            <div className="md:col-span-4 flex items-end">
              <button
                onClick={() => {
                  setSearch("");
                  setCountry("Any");
                  setLevel("Any");
                  setFunding("Any");
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
            Note: Demo scholarships shown here.
            <br />
            Connect real data from your backend/API for production.
          </p>
        </div>
      </section>

      {/* LIST */}
      <section id="list" className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Scholarships</h2>
            <p className="text-sm text-slate-600">
              Showing {results.length} result{results.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="text-sm text-slate-600">
            Tip: Apply early for best chance.
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {results.map((s) => (
            <article
              key={s.id}
              className="rounded-2xl border p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-slate-500">{s.country}</div>
                  <h3 className="mt-1 text-base font-semibold">{s.name}</h3>
                  <div className="mt-1 text-sm text-slate-600">{s.provider}</div>
                </div>

                <span className={cx(
                  "rounded-full px-3 py-1 text-xs font-medium",
                  s.deadlineGroup === "Open"
                    ? "bg-emerald-50 text-emerald-700"
                    : s.deadlineGroup === "Next 30 days"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-slate-100 text-slate-700"
                )}>
                  {s.deadlineGroup}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Level</div>
                  <div className="mt-1 font-medium">{s.level}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Funding</div>
                  <div className="mt-1 font-medium">{s.funding}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Amount</div>
                  <div className="mt-1 font-medium">{s.amountText}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Deadline</div>
                  <div className="mt-1 font-medium">{s.deadlineText}</div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {s.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <p className="mt-3 text-sm text-slate-600">{s.note}</p>

              <div className="mt-4 flex gap-2">
                <button className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                  Apply / Get Help
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
              Try removing filters or changing keywords.
            </div>
          </div>
        )}
      </section>

      {/* FREE HELP CTA */}
      <section id="help" className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="rounded-2xl border bg-white p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Want a scholarship shortlist for your profile?</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Tell us your course + country.
                  <br />
                  We’ll share matches and next steps.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white">
                  Get Free Shortlist
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
          © {new Date().getFullYear()} Scholarships
        </div>
      </footer>
    </main>
  );
}
