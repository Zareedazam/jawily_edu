"use client";

import React, { useMemo, useState } from "react";

type LoanType = "Any" | "Secured" | "Unsecured";
type Country = "Any" | "UK" | "USA" | "Canada" | "Australia" | "Germany" | "Ireland";

type BankOffer = {
  id: string;
  lender: string;
  loanType: Exclude<LoanType, "Any">;
  maxAmountGBP: number;
  aprFrom: number; // indicative
  tenureYears: number;
  processingFee: string;
  moratorium: string;
  countries: Exclude<Country, "Any">[];
  highlights: string[];
};

const OFFERS: BankOffer[] = [
  {
    id: "l1",
    lender: "EduFinance Partner",
    loanType: "Unsecured",
    maxAmountGBP: 45000,
    aprFrom: 10.9,
    tenureYears: 7,
    processingFee: "From 1%",
    moratorium: "Course + 6 months",
    countries: ["UK", "USA", "Canada", "Australia", "Ireland"],
    highlights: ["Fast approval", "No collateral", "Online process"],
  },
  {
    id: "l2",
    lender: "Global Study Loans",
    loanType: "Secured",
    maxAmountGBP: 120000,
    aprFrom: 8.4,
    tenureYears: 12,
    processingFee: "Up to 1%",
    moratorium: "Course + 12 months",
    countries: ["UK", "USA", "Canada", "Australia", "Germany", "Ireland"],
    highlights: ["Lower rates", "Higher amount", "Longer tenure"],
  },
  {
    id: "l3",
    lender: "Campus Credit Assist",
    loanType: "Unsecured",
    maxAmountGBP: 30000,
    aprFrom: 11.7,
    tenureYears: 5,
    processingFee: "Zero on select cases",
    moratorium: "Course + 3 months",
    countries: ["UK", "USA"],
    highlights: ["Quick eligibility", "Minimal documents", "Student support"],
  },
  {
    id: "l4",
    lender: "SecureBank Education",
    loanType: "Secured",
    maxAmountGBP: 90000,
    aprFrom: 8.9,
    tenureYears: 10,
    processingFee: "From 0.75%",
    moratorium: "Course + 12 months",
    countries: ["UK", "Canada", "Australia", "Germany"],
    highlights: ["Collateral-backed", "Better APR", "Flexible tenure"],
  },
];

function moneyGBP(n: number) {
  return `£${n.toLocaleString("en-GB")}`;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function EducationLoanPage() {
  const [loanType, setLoanType] = useState<LoanType>("Any");
  const [country, setCountry] = useState<Country>("Any");
  const [amount, setAmount] = useState<number>(40000);
  const [tenure, setTenure] = useState<number>(7);
  const [collateral, setCollateral] = useState<"Any" | "Yes" | "No">("Any");
  const [hasCoApplicant, setHasCoApplicant] = useState<"Any" | "Yes" | "No">(
    "Any"
  );

  const hero = useMemo(
    () => ({
      badge: "Quick eligibility check",
      title: "Education Loan Made Simple",
      desc: "Check eligibility, compare options, and get expert help—end to end.",
      primary: "Check Eligibility",
      secondary: "Talk to Expert",
    }),
    []
  );

  const filtered = useMemo(() => {
    return OFFERS.filter((o) => {
      const matchesLoanType = loanType === "Any" ? true : o.loanType === loanType;
      const matchesCountry = country === "Any" ? true : o.countries.includes(country);
      const matchesAmount = o.maxAmountGBP >= amount;

      // Soft filters:
      const matchesTenure = o.tenureYears >= tenure;
      const matchesCollateral =
        collateral === "Any"
          ? true
          : collateral === "Yes"
          ? o.loanType === "Secured"
          : o.loanType === "Unsecured";

      // Co-applicant usually helps unsecured; keep as soft rule
      const matchesCoApplicant =
        hasCoApplicant === "Any"
          ? true
          : hasCoApplicant === "Yes"
          ? true
          : o.loanType === "Secured";

      return (
        matchesLoanType &&
        matchesCountry &&
        matchesAmount &&
        matchesTenure &&
        matchesCollateral &&
        matchesCoApplicant
      );
    }).sort((a, b) => a.aprFrom - b.aprFrom);
  }, [loanType, country, amount, tenure, collateral, hasCoApplicant]);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                {hero.badge}
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                {hero.title}
              </h1>

              <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
                {hero.desc}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm">
                  {hero.primary}
                </button>
                <button className="rounded-xl border px-5 py-3 text-sm font-medium">
                  {hero.secondary}
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  Minimal paperwork
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  Fast support
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  Compare offers
                </span>
              </div>
            </div>

            {/* ELIGIBILITY CARD */}
            <div className="w-full md:w-[440px]">
              <div className="rounded-2xl border bg-slate-50 p-5 shadow-sm">
                <div className="text-sm font-medium">Eligibility Check</div>
                <p className="mt-1 text-sm text-slate-600">
                  Select your needs. We’ll show matching options.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-600">Country</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value as Country)}
                      className="rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      {["Any", "UK", "USA", "Canada", "Australia", "Germany", "Ireland"].map(
                        (c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-600">Loan type</label>
                    <select
                      value={loanType}
                      onChange={(e) => setLoanType(e.target.value as LoanType)}
                      className="rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      {["Any", "Secured", "Unsecured"].map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-600">Collateral</label>
                    <select
                      value={collateral}
                      onChange={(e) =>
                        setCollateral(e.target.value as "Any" | "Yes" | "No")
                      }
                      className="rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      {["Any", "Yes", "No"].map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-600">Co-applicant</label>
                    <select
                      value={hasCoApplicant}
                      onChange={(e) =>
                        setHasCoApplicant(e.target.value as "Any" | "Yes" | "No")
                      }
                      className="rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      {["Any", "Yes", "No"].map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-600">
                      Amount needed
                    </label>
                    <div className="rounded-xl border bg-white px-3 py-3 text-sm">
                      {moneyGBP(amount)}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-600">
                      Tenure (years)
                    </label>
                    <div className="rounded-xl border bg-white px-3 py-3 text-sm">
                      {tenure} yrs
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="text-xs text-slate-600">Adjust amount</label>
                  <input
                    type="range"
                    min={5000}
                    max={120000}
                    step={1000}
                    value={amount}
                    onChange={(e) =>
                      setAmount(clamp(Number(e.target.value), 5000, 120000))
                    }
                    className="w-full"
                  />
                  <div className="mt-1 flex justify-between text-xs text-slate-500">
                    <span>£5k</span>
                    <span>£120k</span>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="text-xs text-slate-600">Adjust tenure</label>
                  <input
                    type="range"
                    min={3}
                    max={15}
                    step={1}
                    value={tenure}
                    onChange={(e) => setTenure(clamp(Number(e.target.value), 3, 15))}
                    className="w-full"
                  />
                  <div className="mt-1 flex justify-between text-xs text-slate-500">
                    <span>3 yrs</span>
                    <span>15 yrs</span>
                  </div>
                </div>

                <button className="mt-4 w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white">
                  Check Eligibility
                </button>
                <p className="mt-2 text-center text-xs text-slate-500">
                  Indicative results. Final offer depends on documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-xl font-semibold">Why choose our loan help</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {[
            { t: "Compare options", d: "Secured + unsecured choices." },
            { t: "Quick guidance", d: "Free expert help." },
            { t: "Transparent info", d: "APR, fees, moratorium." },
            { t: "End-to-end support", d: "Till disbursal & beyond." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border p-5">
              <div className="text-sm font-medium">{x.t}</div>
              <div className="mt-1 text-sm text-slate-600">{x.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OFFERS */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Matching offers</h2>
            <p className="text-sm text-slate-600">
              Showing {filtered.length} option{filtered.length === 1 ? "" : "s"}{" "}
              (sorted by APR)
            </p>
          </div>
          <div className="text-sm text-slate-600">
            Adjust filters to see more matches.
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {filtered.map((o) => (
            <article
              key={o.id}
              className="rounded-2xl border p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-slate-500">
                    {o.loanType} loan
                  </div>
                  <h3 className="mt-1 text-base font-semibold">{o.lender}</h3>
                </div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                  APR from {o.aprFrom.toFixed(1)}%
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Max amount</div>
                  <div className="mt-1 font-medium">{moneyGBP(o.maxAmountGBP)}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Tenure</div>
                  <div className="mt-1 font-medium">{o.tenureYears} yrs</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Processing fee</div>
                  <div className="mt-1 font-medium">{o.processingFee}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Moratorium</div>
                  <div className="mt-1 font-medium">{o.moratorium}</div>
                </div>
              </div>

              <div className="mt-3">
                <div className="text-xs text-slate-500">Supported countries</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {o.countries.slice(0, 4).map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                    >
                      {c}
                    </span>
                  ))}
                  {o.countries.length > 4 && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                      +{o.countries.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {o.highlights.slice(0, 3).map((h) => (
                  <span
                    key={h}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                  >
                    {h}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <button className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                  Apply / Get Call
                </button>
                <button className="rounded-xl border px-4 py-2 text-sm font-medium">
                  Details
                </button>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Note: Rates and eligibility depend on profile, university, and documents.
              </p>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-8 rounded-2xl border bg-slate-50 p-6">
            <div className="text-sm font-medium">No matches found</div>
            <div className="mt-1 text-sm text-slate-600">
              Try increasing amount limit, changing country, or set loan type to “Any”.
            </div>
          </div>
        )}
      </section>

      {/* PROCESS + FAQ */}
      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-6">
              <h2 className="text-lg font-semibold">How it works</h2>
              <div className="mt-4 grid gap-3">
                {[
                  { s: "1", t: "Check eligibility", d: "Share amount, country, profile." },
                  { s: "2", t: "Get shortlist", d: "Best options for your case." },
                  { s: "3", t: "Submit documents", d: "We help with checklist." },
                  { s: "4", t: "Sanction & disbursal", d: "Guidance till funds release." },
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

            <div className="rounded-2xl border bg-white p-6">
              <h2 className="text-lg font-semibold">FAQs</h2>
              <div className="mt-4 space-y-3">
                {[
                  {
                    q: "Secured vs Unsecured?",
                    a: "Secured needs collateral. Unsecured usually needs strong profile/co-applicant.",
                  },
                  {
                    q: "What is moratorium?",
                    a: "You may start repayment after course completion + grace period.",
                  },
                  {
                    q: "What documents are needed?",
                    a: "KYC, admission letter, fee structure, income proof, bank statements, and more.",
                  },
                  {
                    q: "How long does approval take?",
                    a: "Depends on lender and documents. We try to speed it up.",
                  },
                ].map((x) => (
                  <div key={x.q} className="rounded-xl bg-slate-50 p-4">
                    <div className="text-sm font-medium">{x.q}</div>
                    <div className="mt-1 text-sm text-slate-600">{x.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 rounded-2xl border bg-white p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Need help choosing the right loan?</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Share your details and we’ll guide you with the best route.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white">
                  Talk to Expert
                </button>
                <button className="rounded-xl border px-5 py-3 text-sm font-medium">
                  Request Call Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
          © {new Date().getFullYear()} Education Loans. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
