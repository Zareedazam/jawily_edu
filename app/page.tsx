"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

type Tab =
  | "Courses"
  | "Scholarship"
  | "Universities"
  | "Accommodation"
  | "Education Loan";

export default function Page() {
  const tabs: Tab[] = useMemo(
    () => [
      "Courses",
      "Scholarship",
      "Universities",
      "Accommodation",
      "Education Loan",
    ],
    []
  );

  const [activeTab, setActiveTab] = useState<Tab>("Courses");

  const hero = useMemo(() => {
    switch (activeTab) {
      case "Accommodation":
        return {
          badge: "Verified stays near campus",
          title: "Find Student Accommodation Fast",
          desc: "Search by city or university. Compare verified properties, prices, and move-in dates.",
          primary: "Get Free Shortlist",
          secondary: "Talk to Expert",
        };
      case "Education Loan":
        return {
          badge: "Quick eligibility check",
          title: "Education Loan Made Simple",
          desc: "Check eligibility, compare lenders, and get documentation support with expert help.",
          primary: "Check Eligibility",
          secondary: "Request Call Back",
        };
      case "Universities":
        return {
          badge: "Search by name or location",
          title: "Find the Right University",
          desc: "Explore universities by country, city, or name. Get rankings, fees, intakes, and scholarships.",
          primary: "Explore Universities",
          secondary: "Book Consultation",
        };
      case "Scholarship":
        return {
          badge: "Funding opportunities",
          title: "Find Scholarships That Fit You",
          desc: "Search scholarships by country and keyword. Get guidance on eligibility and documents.",
          primary: "Find Scholarships",
          secondary: "Talk to Advisor",
        };
      default:
        return {
          badge: "Study abroad made simple",
          title: "Study Abroad Consultants",
          desc: "Counselling, shortlisting, applications, documents and visa guidance — everything in one place.",
          primary: "Book Free Consultation",
          secondary: "Download Guide",
        };
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* HEADER */}
      <header className="bg-black sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-white">
            Jawily
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white">
            <Link className="hover:opacity-70 transition" href="/courses">
              Courses
            </Link>
            <Link className="hover:opacity-70 transition" href="/universities">
              Universities
            </Link>
            <Link className="hover:opacity-70 transition" href="/accommodation">
              Accommodation
            </Link>
            <Link
              className="hover:opacity-70 transition"
              href="/education-loans"
            >
              Education Loans
            </Link>
            <Link className="hover:opacity-70 transition" href="/services">
              Services
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              className="text-sm text-white hover:opacity-70 transition"
              href="/login"
            >
              Login
            </Link>
            <Link
              href="/apply"
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-gray-200 transition"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.06),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(0,0,0,0.04),transparent_50%)]" />

        <div className="relative mx-auto max-w-6xl px-6 py-12 md:py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-black/15 bg-white px-3 py-1 text-xs font-semibold text-black">
                {hero.badge}
              </div>

              <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight leading-[1.05] text-black">
                {hero.title}
              </h1>

              <p className="mt-4 text-base md:text-lg text-black/70">
                {hero.desc}
              </p>
            </div>

            <div className="flex gap-3 md:mt-1 flex-wrap">
              <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black border border-black/15 hover:border-black/30">
                {hero.secondary}
              </button>
              <button className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white hover:opacity-90">
                {hero.primary}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8 flex flex-wrap gap-3">
            {tabs.map((t) => {
              const isActive = t === activeTab;
              return (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={[
                    "rounded-full px-5 py-2 text-sm font-semibold transition border",
                    isActive
                      ? "border-black bg-black text-white"
                      : "border-black/20 bg-white text-black hover:bg-black/[0.04]",
                  ].join(" ")}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl bg-white border border-black/15 p-4 shadow-sm md:p-5">
            <SearchArea activeTab={activeTab} />
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="mx-auto max-w-6xl px-6 py-14">
        <div className="text-center">
          <p className="text-xs tracking-widest text-black/50 font-semibold">
            BOOK A FREE CONSULTATION
          </p>
          <h2 className="text-3xl font-black mt-2 tracking-tight">
            Popular University Courses
          </h2>
          <p className="text-black/70 mt-3 max-w-2xl mx-auto">
            Explore categories and start your journey with a clear process.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          <IconCard title="LAW" />
          <IconCard title="BUSINESS" />
          <IconCard title="ENGINEERING" />
          <IconCard title="MBA" />
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/courses"
            className="px-6 py-3 rounded-full border border-black/15 hover:border-black/30 font-semibold"
          >
            View All Courses
          </Link>
        </div>
      </section>

      {/* UNIVERSITIES */}
      <section id="universities" className="bg-neutral-50 border-y">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="text-center">
            <p className="text-xs tracking-widest text-black/50 font-semibold">
              BOOK A FREE CONSULTATION
            </p>
            <h2 className="text-3xl font-black mt-2 tracking-tight">
              Institution Profiles
            </h2>
            <p className="text-black/70 mt-3 max-w-2xl mx-auto">
              Rankings, scholarships and course options — all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mt-10">
            <SmallTile title="SEE ALL UNIVERSITIES" href="/universities" />
            <SmallTile title="PATHWAY" href="/pathway" />
            <SmallTile title="LANGUAGE SCHOOL" href="/language-school" />
            <SmallTile title="A-LEVEL / BOARDING" href="/a-level-boarding" />
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="text-center">
          <p className="text-xs tracking-widest text-black/50 font-semibold">
            BOOK A FREE CONSULTATION
          </p>
          <h2 className="text-3xl font-black mt-2 tracking-tight">
            Why Students Choose Jawily
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-10">
          <StatCard big="4.9/5" small="Reviews" />
          <StatCard big="17+" small="Years Experience" />
          <StatCard big="250k+" small="Applications Submitted" />
          <StatCard big="Awarded" small="Counselling Excellence" />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-neutral-50 border-y">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Services</h2>
              <p className="text-black/70 mt-2">
                Choose a plan. Get guided support.
              </p>
            </div>
            <Link
              href="/services"
              className="px-5 py-2 rounded-full border border-black/15 hover:border-black/30 font-semibold"
            >
              View All Services
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mt-10">
            <ServiceCard title="Free Service" tag="100% Free" href="/free-service" />
            <ServiceCard title="Premium Service" tag="Fast Track" href="/premium" />
            <ServiceCard title="Oxbridge Service" tag="Top Guidance" href="/oxbridge" />
            <ServiceCard title="Medicine Service" tag="Specialist" href="/medicine" />
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section id="stories" className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-3xl font-black tracking-tight">Student Stories</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Quote
            name="Ayesha"
            course="MBA - UK"
            text="Counselling was smooth and fast. Got shortlist in 2 days."
          />
          <Quote
            name="Rahul"
            course="Engineering - Canada"
            text="Document tracking made everything clear and simple."
          />
          <Quote
            name="Sara"
            course="Masters - Australia"
            text="The step-by-step process feels premium and easy."
          />
        </div>
      </section>

      {/* NEWS + EVENTS */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="grid lg:grid-cols-2 gap-8">
          <ListBox title="News" />
          <ListBox title="Events" />
        </div>

        <div className="mt-14">
          <h2 className="text-3xl font-black tracking-tight">Studying Abroad</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <BlogCard title="Choosing the Right Course" href="/blog/choosing-the-right-course" />
            <BlogCard title="Top 10 Universities to Apply" href="/blog/top-10-universities" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Ready to Apply?</h2>
            <p className="text-white/70 mt-2">
              Get a free consultation and a clear next step plan.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/consultation"
              className="px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 font-semibold"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full border border-white/25 hover:border-white/50 font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-12 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="text-xl font-black">Jawily</div>
            <p className="text-black/60 mt-2">Study abroad made simple.</p>
          </div>

          <FooterCol
            title="Services"
            items={[
              { label: "Free Service", href: "/free-service" },
              { label: "Premium", href: "/premium" },
              { label: "Oxbridge", href: "/oxbridge" },
              { label: "Medicine", href: "/medicine" },
            ]}
          />
          <FooterCol
            title="Study Options"
            items={[
              { label: "Foundation", href: "/foundation" },
              { label: "Undergraduate", href: "/undergraduate" },
              { label: "Postgraduate", href: "/postgraduate" },
              { label: "PhD", href: "/phd" },
            ]}
          />
          <FooterCol
            title="Info"
            items={[
              { label: "Rankings", href: "/rankings" },
              { label: "Scholarships", href: "/scholarships" },
              { label: "Deadlines", href: "/deadlines" },
              { label: "Contact", href: "/contact" },
            ]}
          />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-black/50 border-t flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Jawily. All rights reserved.</p>
          <div className="flex gap-4">
            <Link className="hover:text-black" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-black" href="/terms">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ===================== HERO SEARCH (DYNAMIC) ===================== */

function SearchArea({ activeTab }: { activeTab: Tab }) {
  const labelCls = "text-xs font-semibold text-black/70";
  const inputCls =
    "mt-1 w-full rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black/40";
  const selectCls =
    "mt-1 w-full rounded-xl border border-black/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-black/40";

  const onSearch = () => {
    alert(`Searching in: ${activeTab}`);
  };

  const GoBtn = () => (
    <button
      onClick={onSearch}
      className="w-full rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
    >
      Go
    </button>
  );

  if (activeTab === "Accommodation") {
    return (
      <div className="grid gap-3 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <div className={labelCls}>City / University</div>
          <input
            className={inputCls}
            placeholder="Search by city, university, or property"
          />
        </div>

        <div className="md:col-span-3">
          <div className={labelCls}>Move-in Month</div>
          <select className={selectCls} defaultValue="Any">
            <option>Any</option>
            <option>Jan</option>
            <option>Feb</option>
            <option>Mar</option>
            <option>Apr</option>
            <option>May</option>
            <option>Jun</option>
            <option>Jul</option>
            <option>Aug</option>
            <option>Sep</option>
            <option>Oct</option>
            <option>Nov</option>
            <option>Dec</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <div className={labelCls}>Budget</div>
          <select className={selectCls} defaultValue="Any">
            <option>Any</option>
            <option>Under £150/week</option>
            <option>£150–£250/week</option>
            <option>£250–£400/week</option>
            <option>£400+/week</option>
          </select>
        </div>

        <div className="md:col-span-1">
          <GoBtn />
        </div>
      </div>
    );
  }

  if (activeTab === "Education Loan") {
    return (
      <div className="grid gap-3 md:grid-cols-12 md:items-end">
        <div className="md:col-span-4">
          <div className={labelCls}>Country</div>
          <select className={selectCls} defaultValue="UK">
            <option>UK</option>
            <option>USA</option>
            <option>Canada</option>
            <option>Australia</option>
            <option>Germany</option>
          </select>
        </div>

        <div className="md:col-span-4">
          <div className={labelCls}>Loan Amount</div>
          <input className={inputCls} placeholder="e.g. 20,00,000" />
        </div>

        <div className="md:col-span-3">
          <div className={labelCls}>Co-applicant</div>
          <select className={selectCls} defaultValue="Yes">
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="md:col-span-1">
          <GoBtn />
        </div>

        <div className="md:col-span-12 mt-2 rounded-xl border border-black/10 bg-black/[0.02] p-3 text-xs text-black/60">
          Tip: Eligibility depends on university, course, collateral, and income.
        </div>
      </div>
    );
  }

  if (activeTab === "Universities") {
    return (
      <div className="grid gap-3 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <div className={labelCls}>University Name / Location</div>
          <input
            className={inputCls}
            placeholder="Search by university name or location"
          />
        </div>

        <div className="md:col-span-3">
          <div className={labelCls}>Level</div>
          <select className={selectCls} defaultValue="Any">
            <option>Any</option>
            <option>Foundation</option>
            <option>Undergraduate</option>
            <option>Postgraduate</option>
            <option>PhD</option>
          </select>
        </div>

        <div className="md:col-span-1">
          <GoBtn />
        </div>
      </div>
    );
  }

  if (activeTab === "Scholarship") {
    return (
      <div className="grid gap-3 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <div className={labelCls}>Country</div>
          <select className={selectCls} defaultValue="UK">
            <option>UK</option>
            <option>USA</option>
            <option>Canada</option>
            <option>Australia</option>
            <option>Germany</option>
          </select>
        </div>

        <div className="md:col-span-6">
          <div className={labelCls}>Keyword</div>
          <input className={inputCls} placeholder="e.g. STEM, MBA, Merit-based" />
        </div>

        <div className="md:col-span-1">
          <GoBtn />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-12 md:items-end">
      <div className="md:col-span-5">
        <div className={labelCls}>Country</div>
        <select className={selectCls} defaultValue="UK">
          <option>UK</option>
          <option>USA</option>
          <option>Canada</option>
          <option>Australia</option>
          <option>Germany</option>
        </select>
      </div>

      <div className="md:col-span-5">
        <div className={labelCls}>Course / Keyword</div>
        <input className={inputCls} placeholder="e.g. Computer Science" />
      </div>

      <div className="md:col-span-1">
        <div className={labelCls}>Level</div>
        <select className={selectCls} defaultValue="Any">
          <option>Any</option>
          <option>Foundation</option>
          <option>Undergraduate</option>
          <option>Postgraduate</option>
          <option>PhD</option>
        </select>
      </div>

      <div className="md:col-span-1">
        <GoBtn />
      </div>
    </div>
  );
}

/* ===================== REST COMPONENTS ===================== */

function IconCard({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-black/10 p-6 bg-white hover:border-black/25 transition text-center">
      <div className="h-14 w-14 rounded-2xl bg-black text-white mx-auto flex items-center justify-center font-black text-lg">
        {title[0]}
      </div>
      <div className="mt-4 font-black">{title}</div>
      <p className="text-black/60 text-sm mt-1">Explore programmes</p>
    </div>
  );
}

function SmallTile({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-black/10 bg-white p-6 text-center hover:border-black/25 transition block"
    >
      <div className="font-black">{title}</div>
      <p className="text-black/60 text-sm mt-2">View details</p>
    </Link>
  );
}

function StatCard({ big, small }: { big: string; small: string }) {
  return (
    <div className="rounded-2xl border border-black/10 p-6 text-center hover:border-black/25 transition">
      <div className="text-3xl font-black">{big}</div>
      <div className="text-black/60 mt-2">{small}</div>
    </div>
  );
}

function ServiceCard({
  title,
  tag,
  href,
}: {
  title: string;
  tag: string;
  href: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 hover:border-black/25 transition">
      <div className="inline-flex text-xs px-3 py-1 rounded-full border border-black/15 text-black/70 font-semibold">
        {tag}
      </div>
      <h3 className="text-lg font-black mt-4">{title}</h3>
      <p className="text-black/60 text-sm mt-2">
        Guided support with clear steps.
      </p>

      <Link
        href={href}
        className="mt-5 inline-block text-sm font-semibold underline underline-offset-4"
      >
        View details
      </Link>
    </div>
  );
}

function Quote({
  name,
  course,
  text,
}: {
  name: string;
  course: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 p-6 bg-neutral-50 hover:border-black/25 transition">
      <p className="text-black">“{text}”</p>
      <div className="mt-4">
        <p className="font-black">{name}</p>
        <p className="text-sm text-black/60">{course}</p>
      </div>
    </div>
  );
}

function ListBox({ title }: { title: string }) {
  const items = [
    "Russul Group university enhancing community across the UK",
    "Scholarship update for 2025 intake",
    "Upcoming student fair registration open",
  ];
  return (
    <div className="rounded-2xl border border-black/10 p-6 hover:border-black/25 transition">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black">{title}</h3>
        <Link
          href="/news"
          className="text-sm font-semibold underline underline-offset-4"
        >
          View All
        </Link>
      </div>
      <div className="mt-5 space-y-4">
        {items.map((t, i) => (
          <div
            key={i}
            className="border-b border-black/10 pb-4 last:border-b-0 last:pb-0"
          >
            <div className="text-xs text-black/50 font-semibold">5 Aug</div>
            <div className="font-semibold mt-1">{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogCard({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-black/10 overflow-hidden bg-white hover:border-black/25 transition block"
    >
      <div className="h-40 bg-neutral-200" />
      <div className="p-6">
        <h3 className="font-black">{title}</h3>
        <p className="text-black/60 text-sm mt-2">
          Short guide to help you decide faster.
        </p>
        <span className="mt-4 inline-block text-sm font-semibold underline underline-offset-4">
          Read more
        </span>
      </div>
    </Link>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <div className="font-black">{title}</div>
      <ul className="mt-3 space-y-2 text-black/60">
        {items.map((x) => (
          <li key={x.href}>
            <Link className="hover:text-black" href={x.href}>
              {x.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
