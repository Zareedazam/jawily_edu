import Link from "next/link";
export default function Page() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* SINGLE HEADER */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-6">
          {/* Left */}
          <div className="text-2xl font-black tracking-tight">Jawily</div>

          {/* Center */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-black/70">
            <a className="hover:text-black" href="/courses">Courses</a>
            <a className="hover:text-black" href="/universities">Universities</a>
            <a className="hover:text-black" href="/services">Services</a>
            <a className="hover:text-black" href="/stories">Stories</a>
            <a className="hover:text-black" href="/contact">Contact</a>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <span className="hidden lg:block text-sm font-semibold text-black/60">
              Call us: +91-75188-38702
            </span>

       {/* Equip Now → APPLY */}
            <Link
              href="/apply"
              className="px-4 py-2 rounded-full border border-black/15 hover:border-black/30 text-sm font-semibold"
            >
              Equip Now
            </Link>

            {/* Login → LOGIN */}
            <Link
              href="/login"
              className="px-4 py-2 rounded-full border border-black/15 hover:border-black/30 text-sm font-semibold"
            >
              Login
            </Link>

            {/* Apply Now → APPLY */}
            <Link
              href="/apply"
              className="px-4 py-2 rounded-full bg-black text-white hover:opacity-90 text-sm font-semibold"
            >
              Apply Now
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.08),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(0,0,0,0.06),transparent_45%)]" />
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20 relative">
          {/* top pills + badge */}
          <div className="flex items-start justify-between gap-6">
            <div className="flex flex-wrap gap-3">
              {["Courses", "Scholarship", "Universities", "Website Search"].map(
                (t) => (
                  <button
                    key={t}
                    className="bg-white border border-black/15 text-black px-5 py-2 rounded-full hover:border-black/30 text-sm font-semibold"
                  >
                    {t}
                  </button>
                )
              )}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="text-6xl font-black leading-none">17</div>
              <div className="leading-tight">
                <div className="text-lg font-black">YEARS</div>
                <div className="text-xs text-black/60 uppercase tracking-wide">
                  of service excellence
                </div>
              </div>
            </div>
          </div>

          {/* search row */}
          <div className="mt-7 flex flex-col lg:flex-row items-stretch gap-3">
            <div className="bg-white border border-black/15 rounded-2xl overflow-hidden flex flex-col md:flex-row w-full">
              <select className="w-full md:w-[260px] px-4 py-3 outline-none bg-transparent text-sm font-semibold">
                <option>Normal</option>
                <option>UK</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>USA</option>
              </select>

              <div className="hidden md:block w-px bg-black/10" />

              <select className="w-full md:w-[320px] px-4 py-3 outline-none bg-transparent text-sm font-semibold">
                <option>Normal</option>
                <option>Bachelor</option>
                <option>Master</option>
                <option>PhD</option>
              </select>

              <button className="bg-black hover:opacity-90 text-white px-6 py-3 font-semibold">
                Search
              </button>
            </div>

            <button className="bg-black hover:opacity-90 text-white px-7 py-3 rounded-2xl font-semibold whitespace-nowrap">
              Download Guide
            </button>
          </div>

          {/* hero text */}
          <div className="mt-10 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.02]">
              Study Abroad Consultants
            </h1>
            <p className="text-black/70 mt-4 text-base md:text-lg">
              Counselling, shortlisting, applications, documents and visa guidance —
              everything in one place.
            </p>

            <div className="mt-7 flex gap-3 flex-wrap">
              <button className="px-6 py-3 rounded-full bg-black text-white hover:opacity-90 font-semibold">
                Book Free Consultation
              </button>
              <button className="px-6 py-3 rounded-full border border-black/15 hover:border-black/30 bg-white font-semibold">
                View Universities
              </button>
            </div>
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
          <button className="px-6 py-3 rounded-full border border-black/15 hover:border-black/30 font-semibold">
            View All Courses
          </button>
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
            <SmallTile title="SEE ALL UNIVERSITIES" />
            <SmallTile title="PATHWAY" />
            <SmallTile title="LANGUAGE SCHOOL" />
            <SmallTile title="A-LEVEL / BOARDING" />
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
            <button className="px-5 py-2 rounded-full border border-black/15 hover:border-black/30 font-semibold">
              View All Services
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mt-10">
            <ServiceCard title="Free Service" tag="100% Free" />
            <ServiceCard title="Premium Service" tag="Fast Track" />
            <ServiceCard title="Oxbridge Service" tag="Top Guidance" />
            <ServiceCard title="Medicine Service" tag="Specialist" />
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section id="stories" className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-3xl font-black tracking-tight">Student Stories</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Quote name="Ayesha" course="MBA - UK" text="Counselling was smooth and fast. Got shortlist in 2 days." />
          <Quote name="Rahul" course="Engineering - Canada" text="Document tracking made everything clear and simple." />
          <Quote name="Sara" course="Masters - Australia" text="The step-by-step process feels premium and easy." />
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
            <BlogCard title="Choosing the Right Course" />
            <BlogCard title="Top 10 Universities to Apply" />
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
            <button className="px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 font-semibold">
              Book Free Consultation
            </button>
            <button className="px-6 py-3 rounded-full border border-white/25 hover:border-white/50 font-semibold">
              Contact Us
            </button>
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

          <FooterCol title="Services" items={["Free Service", "Premium", "Oxbridge", "Medicine"]} />
          <FooterCol title="Study Options" items={["Foundation", "Undergraduate", "Postgraduate", "PhD"]} />
          <FooterCol title="Info" items={["Rankings", "Scholarships", "Deadlines", "Contact"]} />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-black/50 border-t flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Jawily. All rights reserved.</p>
          <div className="flex gap-4">
            <a className="hover:text-black" href="#">Privacy</a>
            <a className="hover:text-black" href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* components */

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

function SmallTile({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 text-center hover:border-black/25 transition">
      <div className="font-black">{title}</div>
      <p className="text-black/60 text-sm mt-2">View details</p>
    </div>
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

function ServiceCard({ title, tag }: { title: string; tag: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 hover:border-black/25 transition">
      <div className="inline-flex text-xs px-3 py-1 rounded-full border border-black/15 text-black/70 font-semibold">
        {tag}
      </div>
      <h3 className="text-lg font-black mt-4">{title}</h3>
      <p className="text-black/60 text-sm mt-2">Guided support with clear steps.</p>
      <button className="mt-5 text-sm font-semibold underline underline-offset-4">
        View details
      </button>
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
        <button className="text-sm font-semibold underline underline-offset-4">
          View All
        </button>
      </div>
      <div className="mt-5 space-y-4">
        {items.map((t, i) => (
          <div key={i} className="border-b border-black/10 pb-4 last:border-b-0 last:pb-0">
            <div className="text-xs text-black/50 font-semibold">5 Aug</div>
            <div className="font-semibold mt-1">{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogCard({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-black/10 overflow-hidden bg-white hover:border-black/25 transition">
      <div className="h-40 bg-neutral-200" />
      <div className="p-6">
        <h3 className="font-black">{title}</h3>
        <p className="text-black/60 text-sm mt-2">
          Short guide to help you decide faster.
        </p>
        <button className="mt-4 text-sm font-semibold underline underline-offset-4">
          Read more
        </button>
      </div>
    </div>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="font-black">{title}</div>
      <ul className="mt-3 space-y-2 text-black/60">
        {items.map((x) => (
          <li key={x}>
            <a className="hover:text-black" href="#">
              {x}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
