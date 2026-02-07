"use client";

import React, { useMemo, useState } from "react";

type RoomType = "Any" | "Shared" | "Private" | "Studio" | "Residence Hall";
type Distance = "Any" | "0-2 km" | "2-5 km" | "5-10 km" | "10+ km";

type Property = {
  id: string;
  name: string;
  city: string;
  universityNearby: string;
  roomType: Exclude<RoomType, "Any">;
  pricePerWeek: number;
  distanceKm: number;
  moveIn: string; // YYYY-MM-DD
  verified: boolean;
  rating: number; // 1-5
  perks: string[];
};

const PROPERTIES: Property[] = [
  {
    id: "p1",
    name: "Campus View Studios",
    city: "London",
    universityNearby: "University of London",
    roomType: "Studio",
    pricePerWeek: 285,
    distanceKm: 1.2,
    moveIn: "2026-03-01",
    verified: true,
    rating: 4.7,
    perks: ["Bills Included", "Wi-Fi", "Gym"],
  },
  {
    id: "p2",
    name: "Rivergate Student Rooms",
    city: "Manchester",
    universityNearby: "University of Manchester",
    roomType: "Private",
    pricePerWeek: 190,
    distanceKm: 2.8,
    moveIn: "2026-02-15",
    verified: true,
    rating: 4.4,
    perks: ["Study Room", "24/7 Security", "Laundry"],
  },
  {
    id: "p3",
    name: "CityShare Apartments",
    city: "Birmingham",
    universityNearby: "University of Birmingham",
    roomType: "Shared",
    pricePerWeek: 135,
    distanceKm: 3.4,
    moveIn: "2026-02-20",
    verified: false,
    rating: 4.1,
    perks: ["Shared Kitchen", "Wi-Fi", "Near Bus Stop"],
  },
  {
    id: "p4",
    name: "Hall Life Residence",
    city: "Leeds",
    universityNearby: "University of Leeds",
    roomType: "Residence Hall",
    pricePerWeek: 160,
    distanceKm: 0.6,
    moveIn: "2026-09-01",
    verified: true,
    rating: 4.5,
    perks: ["Meal Plan", "On-site Staff", "Common Lounge"],
  },
  {
    id: "p5",
    name: "Metro Private Rooms",
    city: "London",
    universityNearby: "King's College London",
    roomType: "Private",
    pricePerWeek: 230,
    distanceKm: 4.9,
    moveIn: "2026-03-10",
    verified: true,
    rating: 4.3,
    perks: ["Bills Included", "Wi-Fi", "Maintenance"],
  },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function formatMoney(n: number) {
  return `£${n}/wk`;
}

function distanceLabel(km: number) {
  if (km <= 2) return "0-2 km";
  if (km <= 5) return "2-5 km";
  if (km <= 10) return "5-10 km";
  return "10+ km";
}

export default function AccommodationPage() {
  const [query, setQuery] = useState("");
  const [roomType, setRoomType] = useState<RoomType>("Any");
  const [distance, setDistance] = useState<Distance>("Any");
  const [moveIn, setMoveIn] = useState<string>("");
  const [budget, setBudget] = useState<number>(250);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    return PROPERTIES.filter((p) => {
      const matchesQuery =
        !q ||
        p.city.toLowerCase().includes(q) ||
        p.universityNearby.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q);

      const matchesRoomType = roomType === "Any" ? true : p.roomType === roomType;

      const matchesBudget = p.pricePerWeek <= budget;

      const matchesDistance =
        distance === "Any" ? true : distanceLabel(p.distanceKm) === distance;

      const matchesMoveIn =
        !moveIn ? true : new Date(p.moveIn) <= new Date(moveIn);

      return (
        matchesQuery &&
        matchesRoomType &&
        matchesBudget &&
        matchesDistance &&
        matchesMoveIn
      );
    }).sort((a, b) => {
      // verified first, then rating, then cheaper
      if (a.verified !== b.verified) return a.verified ? -1 : 1;
      if (b.rating !== a.rating) return b.rating - a.rating;
      return a.pricePerWeek - b.pricePerWeek;
    });
  }, [query, roomType, distance, moveIn, budget]);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Verified stays near campus
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Find Student Accommodation Fast
              </h1>

              <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
                Search by city or university. Compare verified properties, prices,
                and move-in dates.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm">
                  Get Free Shortlist
                </button>
                <button className="rounded-xl border px-5 py-3 text-sm font-medium">
                  Talk to Expert
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  No hidden charges
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  Trusted listings
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  Free support
                </span>
              </div>
            </div>

            <div className="w-full md:w-[420px]">
              <div className="rounded-2xl border bg-slate-50 p-5 shadow-sm">
                <div className="text-sm font-medium">Quick Search</div>
                <p className="mt-1 text-sm text-slate-600">
                  City or university name
                </p>

                <div className="mt-4 flex gap-2">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. London, University of Manchester"
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
                    <label className="text-xs text-slate-600">Room type</label>
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value as RoomType)}
                      className="rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      {["Any", "Shared", "Private", "Studio", "Residence Hall"].map(
                        (t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-600">Distance</label>
                    <select
                      value={distance}
                      onChange={(e) => setDistance(e.target.value as Distance)}
                      className="rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      {["Any", "0-2 km", "2-5 km", "5-10 km", "10+ km"].map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-600">Move-in by</label>
                    <input
                      value={moveIn}
                      onChange={(e) => setMoveIn(e.target.value)}
                      type="date"
                      className="rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-600">
                      Budget (max)
                    </label>
                    <div className="rounded-xl border bg-white px-3 py-3 text-sm">
                      {formatMoney(budget)}
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <input
                    type="range"
                    min={80}
                    max={400}
                    value={budget}
                    onChange={(e) => setBudget(clamp(Number(e.target.value), 80, 400))}
                    className="w-full"
                  />
                  <div className="mt-1 flex justify-between text-xs text-slate-500">
                    <span>£80</span>
                    <span>£400</span>
                  </div>
                </div>

                <button className="mt-4 w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white">
                  Get Free Shortlist
                </button>
                <p className="mt-2 text-center text-xs text-slate-500">
                  We’ll send options that match your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-xl font-semibold">Why book with us</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {[
            { t: "Verified Properties", d: "Trusted listings only." },
            { t: "Near Top Universities", d: "Stay close to campus." },
            { t: "Flexible Options", d: "Room types for all budgets." },
            { t: "Free Expert Support", d: "From shortlist to move-in." },
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
            <h2 className="text-xl font-semibold">Available stays</h2>
            <p className="text-sm text-slate-600">
              Showing {results.length} result{results.length === 1 ? "" : "s"}{" "}
              (sorted by verified, rating, then price)
            </p>
          </div>

          <div className="text-sm text-slate-600">
            Tip: search “city” or “university”
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {results.map((p) => (
            <article
              key={p.id}
              className="rounded-2xl border p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-slate-500">{p.city}</div>
                  <h3 className="mt-1 text-base font-semibold">{p.name}</h3>
                </div>
                {p.verified ? (
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
                  <div className="text-xs text-slate-500">Room type</div>
                  <div className="mt-1 font-medium">{p.roomType}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Price</div>
                  <div className="mt-1 font-medium">{formatMoney(p.pricePerWeek)}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Distance</div>
                  <div className="mt-1 font-medium">{p.distanceKm.toFixed(1)} km</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Move-in</div>
                  <div className="mt-1 font-medium">{p.moveIn}</div>
                </div>
              </div>

              <div className="mt-3 text-sm text-slate-600">
                Near: <span className="font-medium">{p.universityNearby}</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {p.perks.slice(0, 3).map((perk) => (
                  <span
                    key={perk}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                  >
                    {perk}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Rating: <span className="font-medium">{p.rating.toFixed(1)}</span>
                </div>
                <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                  View Details
                </button>
              </div>
            </article>
          ))}
        </div>

        {results.length === 0 && (
          <div className="mt-8 rounded-2xl border bg-slate-50 p-6">
            <div className="text-sm font-medium">No matches found</div>
            <div className="mt-1 text-sm text-slate-600">
              Try changing city/university, increasing budget, or removing filters.
            </div>
          </div>
        )}
      </section>

      {/* TYPES + HOW IT WORKS */}
      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-6">
              <h2 className="text-lg font-semibold">Popular accommodation types</h2>
              <div className="mt-4 grid gap-3">
                {[
                  { t: "Shared Room", d: "Low budget students" },
                  { t: "Private Room", d: "More privacy" },
                  { t: "Studio Apartment", d: "Independent living" },
                  { t: "Residence Hall", d: "Campus life" },
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
                  { s: "1", t: "Tell us your city & university", d: "Share your preferences." },
                  { s: "2", t: "Get a personalized shortlist", d: "Handpicked options." },
                  { s: "3", t: "Compare & choose", d: "Prices, distance, perks." },
                  { s: "4", t: "Book safely online", d: "Support till move-in." },
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
                <h3 className="text-lg font-semibold">
                  Ready to find your student home?
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Get a free shortlist made for your budget and move-in date.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white">
                  Get Free Accommodation Help
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
          © {new Date().getFullYear()} Student Accommodation. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
