"use client";

import React, { useMemo, useState } from "react";

type PlanId = "starter" | "plus" | "pro";

type Plan = {
  id: PlanId;
  name: string;
  price: string;
  sub: string;
  bestFor: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

type AddOn = {
  id: string;
  name: string;
  price: string;
  desc: string;
};

type FAQ = { q: string; a: string };

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "£49",
    sub: "One-time",
    bestFor: "Quick shortlist + basic guidance",
    features: [
      "Accommodation shortlist (up to 8 options)",
      "Budget + area guidance",
      "1 expert call (20 mins)",
      "Email support (3 days)",
    ],
    cta: "Buy Starter",
  },
  {
    id: "plus",
    name: "Plus",
    price: "£99",
    sub: "One-time",
    bestFor: "Shortlist + booking help",
    features: [
      "Accommodation shortlist (up to 15 options)",
      "Move-in & contract guidance",
      "2 expert calls (30 mins each)",
      "Priority support (7 days)",
      "Best value for most students",
    ],
    cta: "Buy Plus",
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "£199",
    sub: "One-time",
    bestFor: "End-to-end premium support",
    features: [
      "Accommodation + loan + visa checklist support",
      "Shortlist (up to 25 options)",
      "Dedicated advisor",
      "Unlimited calls for 14 days",
      "Priority escalation with partners",
      "Document checklist + review",
    ],
    cta: "Buy Pro",
  },
];

const ADDONS: AddOn[] = [
  { id: "a1", name: "Document Review", price: "£29", desc: "Checklist + quick review of key docs." },
  { id: "a2", name: "Loan Eligibility Call", price: "£19", desc: "15 mins call. Clear next steps." },
  { id: "a3", name: "Urgent Shortlist (24h)", price: "£39", desc: "Get options within 24 hours." },
];

const FAQS: FAQ[] = [
  {
    q: "Is this refundable?",
    a: "If we can’t deliver the service as promised, we’ll refund as per policy.",
  },
  {
    q: "Do you guarantee accommodation?",
    a: "We provide verified options and guidance. Final booking depends on availability and your choice.",
  },
  {
    q: "What happens after payment?",
    a: "You get an onboarding form + advisor call. Then we send your shortlist and help you proceed.",
  },
  {
    q: "Can I upgrade later?",
    a: "Yes. You can upgrade by paying the difference (subject to plan rules).",
  },
];

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function PremiumPage() {
  const [selected, setSelected] = useState<PlanId>("plus");
  const [addons, setAddons] = useState<Record<string, boolean>>({
    a1: false,
    a2: false,
    a3: false,
  });

  const selectedPlan = useMemo(
    () => PLANS.find((p) => p.id === selected) ?? PLANS[1],
    [selected]
  );

  const orderSummary = useMemo(() => {
    const chosenAddons = ADDONS.filter((a) => addons[a.id]);
    return { chosenAddons };
  }, [addons]);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Premium Support
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Get Priority Help. Save Time. Avoid Mistakes.
              </h1>

              <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
                Premium plans for students who want faster shortlists, expert calls,
                and end-to-end support till booking.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#plans"
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm"
                >
                  View Plans
                </a>
                <a
                  href="#checkout"
                  className="rounded-xl border px-5 py-3 text-sm font-medium"
                >
                  Go to Checkout
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  Dedicated advisor
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  Priority support
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  Faster shortlists
                </span>
              </div>
            </div>

            {/* MINI VALUE CARD */}
            <div className="w-full md:w-[420px]">
              <div className="rounded-2xl border bg-slate-50 p-5 shadow-sm">
                <div className="text-sm font-medium">What you get</div>
                <p className="mt-1 text-sm text-slate-600">
                  Premium = speed + clarity + support.
                </p>

                <div className="mt-4 grid gap-3">
                  {[
                    { t: "Faster Shortlist", d: "Options curated quickly." },
                    { t: "Expert Calls", d: "Clear next steps." },
                    { t: "Booking Guidance", d: "Avoid hidden issues." },
                    { t: "Priority Support", d: "We respond faster." },
                  ].map((x) => (
                    <div key={x.t} className="rounded-xl bg-white p-4 border">
                      <div className="text-sm font-medium">{x.t}</div>
                      <div className="mt-1 text-sm text-slate-600">{x.d}</div>
                    </div>
                  ))}
                </div>

                <a
                  href="#plans"
                  className="mt-4 block w-full rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-medium text-white"
                >
                  Choose a Plan
                </a>

                <p className="mt-2 text-center text-xs text-slate-500">
                  One-time payment. No subscriptions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Premium Plans</h2>
            <p className="text-sm text-slate-600">
              Select the plan that matches your timeline.
            </p>
          </div>
          <div className="text-sm text-slate-600">
            Tip: Most students choose <span className="font-medium">Plus</span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {PLANS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelected(p.id)}
              className={cx(
                "text-left rounded-2xl border p-5 shadow-sm transition hover:shadow-md",
                selected === p.id && "ring-2 ring-slate-200"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="mt-1 text-2xl font-semibold">{p.price}</div>
                  <div className="text-sm text-slate-600">{p.sub}</div>
                </div>

                {p.popular && (
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                    Most Popular
                  </span>
                )}
              </div>

              <div className="mt-3 text-sm text-slate-600">
                <span className="font-medium">Best for:</span> {p.bestFor}
              </div>

              <div className="mt-4 space-y-2">
                {p.features.slice(0, 4).map((f) => (
                  <div key={f} className="flex gap-2 text-sm">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-slate-900" />
                    <span className="text-slate-700">{f}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
                {selected === p.id ? "Selected" : "Select"}
                <span>→</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CHECKOUT */}
      <section id="checkout" className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2">
            {/* LEFT: Add-ons */}
            <div className="rounded-2xl border bg-white p-6">
              <h3 className="text-lg font-semibold">Add-ons (optional)</h3>
              <p className="mt-1 text-sm text-slate-600">
                Boost your plan with extra help.
              </p>

              <div className="mt-4 space-y-3">
                {ADDONS.map((a) => (
                  <label
                    key={a.id}
                    className="flex items-start gap-3 rounded-xl border bg-slate-50 p-4"
                  >
                    <input
                      type="checkbox"
                      checked={!!addons[a.id]}
                      onChange={(e) =>
                        setAddons((prev) => ({ ...prev, [a.id]: e.target.checked }))
                      }
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-medium">{a.name}</div>
                          <div className="mt-1 text-sm text-slate-600">{a.desc}</div>
                        </div>
                        <div className="text-sm font-semibold">{a.price}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                After payment, you’ll get a short onboarding form.
                <br />
                Then your advisor starts immediately.
              </div>
            </div>

            {/* RIGHT: Summary */}
            <div className="rounded-2xl border bg-white p-6">
              <h3 className="text-lg font-semibold">Order Summary</h3>
              <p className="mt-1 text-sm text-slate-600">
                Review and continue to payment.
              </p>

              <div className="mt-4 rounded-xl border bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium">{selectedPlan.name} Plan</div>
                    <div className="mt-1 text-sm text-slate-600">{selectedPlan.bestFor}</div>
                  </div>
                  <div className="text-sm font-semibold">{selectedPlan.price}</div>
                </div>

                <div className="mt-4">
                  <div className="text-xs font-medium text-slate-500">Included</div>
                  <div className="mt-2 space-y-2">
                    {selectedPlan.features.map((f) => (
                      <div key={f} className="flex gap-2 text-sm">
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-slate-900" />
                        <span className="text-slate-700">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs font-medium text-slate-500">Add-ons</div>
                  <div className="mt-2 space-y-2">
                    {orderSummary.chosenAddons.length === 0 ? (
                      <div className="text-sm text-slate-600">No add-ons selected.</div>
                    ) : (
                      orderSummary.chosenAddons.map((a) => (
                        <div key={a.id} className="flex items-center justify-between text-sm">
                          <span className="text-slate-700">{a.name}</span>
                          <span className="font-medium">{a.price}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert("Connect payment gateway here (Stripe/Razorpay).")}
                className="mt-5 w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white"
              >
                Continue to Payment
              </button>

              <div className="mt-3 rounded-xl border bg-white p-4 text-xs text-slate-500">
                By continuing, you agree to our terms and support policy.
                <br />
                Prices shown are indicative. Add payment integration to finalize.
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-10 rounded-2xl border bg-white p-6">
            <h3 className="text-lg font-semibold">FAQs</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {FAQS.map((f) => (
                <div key={f.q} className="rounded-xl bg-slate-50 p-4">
                  <div className="text-sm font-medium">{f.q}</div>
                  <div className="mt-1 text-sm text-slate-600">{f.a}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border bg-slate-50 p-5">
              <div className="text-sm font-medium">Need custom support?</div>
              <div className="mt-1 text-sm text-slate-600">
                If your case is urgent, we can propose a custom plan.
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white">
                  Talk to Expert
                </button>
                <button className="rounded-xl border px-5 py-3 text-sm font-medium">
                  Request Custom Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
          © {new Date().getFullYear()} Premium Support. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

