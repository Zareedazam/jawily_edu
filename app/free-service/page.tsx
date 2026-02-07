"use client";

import React, { useMemo, useState } from "react";

type ServiceType =
  | "Accommodation Shortlist"
  | "Education Loan Guidance"
  | "University / Course Help"
  | "Scholarship Support"
  | "Visa Guidance";

type StudyCountry = "UK" | "USA" | "Canada" | "Australia" | "Germany" | "Ireland" | "Other";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  serviceType: ServiceType;
  studyCountry: StudyCountry;
  intake: string;
  budget: string;
  message: string;
  consent: boolean;
};

const DEFAULT_FORM: FormState = {
  fullName: "",
  phone: "",
  email: "",
  serviceType: "Accommodation Shortlist",
  studyCountry: "UK",
  intake: "",
  budget: "",
  message: "",
  consent: true,
};

function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};

  if (!form.fullName.trim()) errors.fullName = "Name is required";
  if (!form.phone.trim()) errors.phone = "Phone is required";
  if (!form.email.trim() || !form.email.includes("@")) errors.email = "Valid email is required";
  if (!form.consent) errors.consent = "Please accept the consent";

  return errors;
}

export default function FreeServicePage() {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const benefits = useMemo(
    () => [
      { t: "100% Free Help", d: "No charges. No hidden fees." },
      { t: "Verified Options", d: "Trusted guidance and listings." },
      { t: "Fast Response", d: "We call you back quickly." },
      { t: "End-to-End Support", d: "From shortlist to decision." },
    ],
    []
  );

  const steps = useMemo(
    () => [
      { s: "1", t: "Tell us your requirement", d: "Pick service and share basics." },
      { s: "2", t: "Get a free shortlist", d: "Curated options in your budget." },
      { s: "3", t: "Talk to an expert", d: "Clear answers. No confusion." },
      { s: "4", t: "Finalize with support", d: "Help till the final step." },
    ],
    []
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);

    if (Object.keys(v).length > 0) return;

    // TODO: Replace with real API call
    // await fetch("/api/free-service", { method: "POST", body: JSON.stringify(form) })

    setSubmitted(true);
  }

  function resetForm() {
    setForm(DEFAULT_FORM);
    setErrors({});
    setSubmitted(false);
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                100% Free Support Service
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Get Free Help for Your Study Journey
              </h1>

              <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
                Accommodation, education loan, course help, scholarships —
                sab kuch. Free guidance with real experts.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#free-form" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm">
                  Get Free Support
                </a>
                <button
                  onClick={() => update("serviceType", "Accommodation Shortlist")}
                  className="rounded-xl border px-5 py-3 text-sm font-medium"
                >
                  Explore Services
                </button>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {benefits.map((b) => (
                  <div key={b.t} className="rounded-2xl border p-5">
                    <div className="text-sm font-medium">{b.t}</div>
                    <div className="mt-1 text-sm text-slate-600">{b.d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* FORM CARD */}
            <div id="free-form" className="w-full md:w-[460px]">
              <div className="rounded-2xl border bg-slate-50 p-5 shadow-sm">
                <div className="text-sm font-medium">Request a Free Callback</div>
                <p className="mt-1 text-sm text-slate-600">
                  Fill details. We’ll contact you.
                </p>

                {submitted ? (
                  <div className="mt-4 rounded-2xl border bg-white p-5">
                    <div className="text-sm font-medium">Submitted ✅</div>
                    <p className="mt-1 text-sm text-slate-600">
                      Thanks! Our team will reach out soon.
                    </p>

                    <div className="mt-4 grid gap-2 text-sm text-slate-700">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <div className="text-xs text-slate-500">Service</div>
                        <div className="mt-1 font-medium">{form.serviceType}</div>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3">
                        <div className="text-xs text-slate-500">Country</div>
                        <div className="mt-1 font-medium">{form.studyCountry}</div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={resetForm}
                        className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                      >
                        Submit Another
                      </button>
                      <a
                        href="/"
                        className="w-full rounded-xl border px-4 py-2 text-center text-sm font-medium"
                      >
                        Go Home
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-slate-600">Full name</label>
                        <input
                          value={form.fullName}
                          onChange={(e) => update("fullName", e.target.value)}
                          placeholder="Your name"
                          className="rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                        />
                        {errors.fullName && (
                          <span className="text-xs text-red-600">{errors.fullName}</span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-slate-600">Phone</label>
                        <input
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+44..."
                          className="rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                        />
                        {errors.phone && (
                          <span className="text-xs text-red-600">{errors.phone}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-slate-600">Email</label>
                      <input
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@email.com"
                        className="rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                      />
                      {errors.email && (
                        <span className="text-xs text-red-600">{errors.email}</span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-slate-600">Service</label>
                        <select
                          value={form.serviceType}
                          onChange={(e) => update("serviceType", e.target.value as ServiceType)}
                          className="rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                        >
                          {[
                            "Accommodation Shortlist",
                            "Education Loan Guidance",
                            "University / Course Help",
                            "Scholarship Support",
                            "Visa Guidance",
                          ].map((x) => (
                            <option key={x} value={x}>
                              {x}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-slate-600">Study country</label>
                        <select
                          value={form.studyCountry}
                          onChange={(e) => update("studyCountry", e.target.value as StudyCountry)}
                          className="rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                        >
                          {["UK", "USA", "Canada", "Australia", "Germany", "Ireland", "Other"].map(
                            (x) => (
                              <option key={x} value={x}>
                                {x}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-slate-600">Intake</label>
                        <input
                          value={form.intake}
                          onChange={(e) => update("intake", e.target.value)}
                          placeholder="e.g. Sep 2026"
                          className="rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-slate-600">Budget (optional)</label>
                        <input
                          value={form.budget}
                          onChange={(e) => update("budget", e.target.value)}
                          placeholder="e.g. £200/wk"
                          className="rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-slate-600">Message (optional)</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Tell us what you need..."
                        rows={3}
                        className="rounded-xl border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                      />
                    </div>

                    <label className="flex items-start gap-2 rounded-xl bg-white p-3 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => update("consent", e.target.checked)}
                        className="mt-1"
                      />
                      <span>
                        I agree to be contacted via call/WhatsApp/email for support.
                        {errors.consent && (
                          <span className="block text-xs text-red-600 mt-1">
                            {errors.consent}
                          </span>
                        )}
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white"
                    >
                      Get Free Callback
                    </button>

                    <p className="text-center text-xs text-slate-500">
                      We don’t spam. We only contact for your request.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Free services we provide</h2>
            <p className="text-sm text-slate-600">
              Choose what you need. We’ll guide you.
            </p>
          </div>
          <a href="#free-form" className="text-sm font-medium underline underline-offset-4">
            Request callback →
          </a>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              t: "Accommodation Shortlist",
              d: "Verified stays near your university.",
              chips: ["Budget match", "Move-in help", "Verified listings"],
            },
            {
              t: "Education Loan Guidance",
              d: "Secured/unsecured options explained.",
              chips: ["Eligibility", "Docs checklist", "Offer compare"],
            },
            {
              t: "University / Course Help",
              d: "Pick the right course and university.",
              chips: ["Shortlist", "Intake planning", "Profile fit"],
            },
            {
              t: "Scholarship Support",
              d: "Find scholarships that match you.",
              chips: ["Best matches", "Deadlines", "Application tips"],
            },
            {
              t: "Visa Guidance",
              d: "Basics + checklist for your journey.",
              chips: ["Checklist", "Timelines", "Common mistakes"],
            },
            {
              t: "Free Consultation",
              d: "One-to-one call with an expert.",
              chips: ["Clear plan", "Next steps", "Personal support"],
            },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border p-5">
              <div className="text-sm font-medium">{x.t}</div>
              <div className="mt-1 text-sm text-slate-600">{x.d}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {x.chips.map((c) => (
                  <span key={c} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                    {c}
                  </span>
                ))}
              </div>
              <button
                onClick={() => {
                  update("serviceType", x.t as ServiceType);
                  document.getElementById("free-form")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
              >
                Get Help
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl font-semibold">How it works</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {steps.map((x) => (
              <div key={x.s} className="rounded-2xl border bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-slate-50 text-sm font-semibold">
                    {x.s}
                  </div>
                  <div className="text-sm font-medium">{x.t}</div>
                </div>
                <div className="mt-2 text-sm text-slate-600">{x.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border bg-white p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Start with a free call</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Share your goal. We’ll guide your next steps.
                </p>
              </div>
              <a
                href="#free-form"
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white text-center"
              >
                Get Free Callback
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
          © {new Date().getFullYear()} Free Service. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
