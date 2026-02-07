"use client";

import React, { useMemo, useState } from "react";

type RankingType = "QS" | "THE" | "ARWU";
type Year = 2024 | 2025 | 2026;

type Uni = {
  id: string;
  name: string;
  country: string;
  city?: string;
  ranks: Partial<Record<RankingType, Partial<Record<Year, number>>>>;
  tags: string[];
  highlight: string;
};

const DATA: Uni[] = [
  {
    id: "u1",
    name: "University of Oxford",
    country: "UK",
    city: "Oxford",
    ranks: { QS: { 2024: 3, 2025: 3, 2026: 3 }, THE: { 2024: 1, 2025: 1, 2026: 1 }, ARWU: { 2024: 7, 2025: 7, 2026: 7 } },
    tags: ["Oxbridge", "Top-tier"],
    highlight: "Strong global reputation",
  },
  {
    id: "u2",
    name: "University of Cambridge",
    country: "UK",
    city: "Cambridge",
    ranks: { QS: { 2024: 2, 2025: 2, 2026: 2 }, THE: { 2024: 5, 2025: 5, 2026: 5 }, ARWU: { 2024: 3, 2025: 3, 2026: 3 } },
    tags: ["Oxbridge", "Top-tier"],
    highlight: "Excellent research output",
  },
  {
    id: "u3",
    name: "Imperial College London",
    country: "UK",
    city: "London",
    ranks: { QS: { 2024: 6, 2025: 6, 2026: 6 }, THE: { 2024: 8, 2025: 8, 2026: 8 }, ARWU: { 2024: 25, 2025: 25, 2026: 25 } },
    tags: ["STEM", "London"],
    highlight: "Best for STEM careers",
  },
  {
    id: "u4",
    name: "University College London (UCL)",
    country: "UK",
    city: "London",
    ranks: { QS: { 2024: 9, 2025: 9, 2026: 9 }, THE: { 2024: 22, 2025: 22, 2026: 22 }, ARWU: { 2024: 16, 2025: 16, 2026: 16 } },
    tags: ["London", "Broad programs"],
    highlight: "Wide course selection",
  },
  {
    id: "u5",
    name: "University of Manchester",
    country: "UK",
    city: "Manchester",
    ranks: { QS: { 2024: 32, 2025: 32, 2026: 32 }, THE: { 2024: 51, 2025: 51, 2026: 51 }, ARWU: { 2024: 41, 2025: 41, 2026: 41 } },
    tags: ["Value", "Big campus"],
    highlight: "Strong ROI + campus life",
  },
  {
    id: "u6",
    name: "Harvard University",
    country: "USA",
    city: "Cambridge, MA",
    ranks: { QS: { 2024: 4, 2025: 4, 2026: 4 }, THE: { 2024: 3, 2025: 3, 2026: 3 }, ARWU: { 2024: 1, 2025: 1, 2026: 1 } },
    tags: ["Ivy", "Top-tier"],
    highlight: "Elite network + resources",
  },
  {
    id: "u7",
    name: "Stanford University",
    country: "USA",
    city: "Stanford, CA",
    ranks: { QS: { 2024: 5, 2025: 5, 2026: 5 }, THE: { 2024: 2, 2025: 2, 2026: 2 }, ARWU: { 2024: 2, 2025: 2, 2026: 2 } },
    tags: ["Tech", "Top-tier"],
    highlight: "Best for tech + startups",
  },
  {
    id: "u8",
    name: "National University of Singapore (NUS)",
    country: "Singapore",
    city: "Singapore",
    ranks: { QS: { 2024: 8, 2025: 8, 2026: 8 }, THE: { 2024: 19, 2025: 19, 2026: 19 }, ARWU: { 2024: 71, 2025: 71, 2026: 71 } },
    tags: ["Asia", "Top value"],
    highlight: "High ranking in Asia",
  },
];

const RANKING_TYPES: RankingType[] = ["QS", "THE", "ARWU"];
const YEARS: Year[] = [2024, 2025, 2026];

function getRank(u: Uni, type: RankingType, year: Year) {
  return u.ranks?.[type]?.[year];
}

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function RankingsPage() {
  const [rankingType, setRankingType] = useState<RankingType>("QS");
  const [year, setYear] = useState<Year>(2026);
  const [country, setCountry] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<"Rank ↑" | "Rank ↓" | "Name A-Z">("Rank ↑");
  const [showOnlyWithRank, setShowOnlyWithRank] = useState(true);

  const countries = useMemo(() => {
    const set = new Set(DATA.map((d) => d.country));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    const base = DATA.filter((u) => {
      const matchesCountry = country === "All" ? true : u.country === country;
      const matchesSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.country.toLowerCase().includes(q) ||
        (u.city ?? "").toLowerCase().includes(q) ||
        u.tags.some((t) => t.toLowerCase().includes(q));

      const r = getRank(u, rankingType, year);
      const hasRank = typeof r === "number";

      const matchesRank = showOnlyWithRank ? hasRank : true;

      return matchesCountry && matchesSearch && matchesRank;
    });

    const sorted = [...base].sort((a, b) => {
      const ra = getRank(a, rankingType, year);
      const rb = getRank(b, rankingType, year);

      if (sort === "Name A-Z") return a.name.localeCompare(b.name);

      // ranks: smaller is better
      const aVal = typeof ra === "number" ? ra : 999999;
      const bVal = typeof rb === "number" ? rb : 999999;

      if (sort === "Rank ↑") return aVal - bVal;
      return bVal - aVal;
    });

    return sorted;
  }, [country, rankingType, search, sort, year, showOnlyWithRank]);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                University Rankings
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Compare Universities Fast
              </h1>

              <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
                Choose ranking type and year.
                <br />
                Filter by country and search.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#table" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white">
                View Rankings
              </a>
              <button className="rounded-xl border px-5 py-3 text-sm font-medium">
                Talk to Expert
              </button>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="mt-8 grid gap-3 rounded-2xl border bg-slate-50 p-5 md:grid-cols-5">
            <div className="md:col-span-2">
              <label className="text-xs text-slate-600">Search</label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Oxford, UK, London, STEM..."
                className="mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600">Ranking</label>
              <select
                value={rankingType}
                onChange={(e) => setRankingType(e.target.value as RankingType)}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              >
                {RANKING_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600">Year</label>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value) as Year)}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="text-xs text-slate-600">Sort</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              >
                <option>Rank ↑</option>
                <option>Rank ↓</option>
                <option>Name A-Z</option>
              </select>
            </div>

            <div className="md:col-span-2 flex items-end">
              <label className="flex w-full items-center gap-2 rounded-xl border bg-white px-3 py-3 text-sm">
                <input
                  type="checkbox"
                  checked={showOnlyWithRank}
                  onChange={(e) => setShowOnlyWithRank(e.target.checked)}
                />
                Show only ranked
              </label>
            </div>
          </div>

          <div className="mt-3 text-xs text-slate-500">
            Note: Demo data used here.
            <br />
            Connect your real dataset/API for production.
          </div>
        </div>
      </section>

      {/* TABLE */}
      <section id="table" className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              {rankingType} Rankings • {year}
            </h2>
            <p className="text-sm text-slate-600">
              Showing {filtered.length} universit{filtered.length === 1 ? "y" : "ies"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSearch("");
                setCountry("All");
                setRankingType("QS");
                setYear(2026);
                setSort("Rank ↑");
                setShowOnlyWithRank(true);
              }}
              className="rounded-xl border px-4 py-2 text-sm font-medium"
            >
              Reset
            </button>
            <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              Export (Later)
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50">
                <tr className="border-b">
                  <th className="px-4 py-3 font-medium">Rank</th>
                  <th className="px-4 py-3 font-medium">University</th>
                  <th className="px-4 py-3 font-medium">Country</th>
                  <th className="px-4 py-3 font-medium">Tags</th>
                  <th className="px-4 py-3 font-medium">Note</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((u) => {
                  const r = getRank(u, rankingType, year);
                  return (
                    <tr key={u.id} className="border-b last:border-b-0">
                      <td className="px-4 py-3">
                        <span
                          className={cx(
                            "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                            typeof r === "number"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-700"
                          )}
                        >
                          {typeof r === "number" ? `#${r}` : "—"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="font-medium">{u.name}</div>
                        <div className="text-xs text-slate-500">{u.city ?? "—"}</div>
                      </td>

                      <td className="px-4 py-3">
                        <div>{u.country}</div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {u.tags.slice(0, 3).map((t) => (
                            <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                              {t}
                            </span>
                          ))}
                          {u.tags.length > 3 && (
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                              +{u.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3 text-slate-600">
                        {u.highlight}
                      </td>

                      <td className="px-4 py-3">
                        <button className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-medium text-white">
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td className="px-4 py-10 text-center text-slate-600" colSpan={6}>
                      No results found.
                      <br />
                      Try another search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-2xl border bg-slate-50 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-base font-semibold">Need a shortlist based on your profile?</div>
              <div className="mt-1 text-sm text-slate-600">
                Ranking + budget + course fit.
                <br />
                We’ll suggest best options.
              </div>
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
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
          © {new Date().getFullYear()} Rankings
        </div>
      </footer>
    </main>
  );
}
