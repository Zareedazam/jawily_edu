export default function CoursesPage() {
  const courses = [
    { title: "MBA", level: "Masters", duration: "1–2 years", tag: "Business" },
    { title: "Computer Science", level: "Bachelors", duration: "3–4 years", tag: "STEM" },
    { title: "Data Science", level: "Masters", duration: "1–2 years", tag: "STEM" },
    { title: "Mechanical Engineering", level: "Bachelors", duration: "3–4 years", tag: "Engineering" },
    { title: "Law (LLM)", level: "Masters", duration: "1 year", tag: "Law" },
    { title: "Public Health", level: "Masters", duration: "1–2 years", tag: "Health" },
    { title: "Finance", level: "Masters", duration: "1 year", tag: "Business" },
    { title: "Civil Engineering", level: "Bachelors", duration: "3–4 years", tag: "Engineering" },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Courses
            </h1>
            <p className="mt-3 text-black/70 max-w-2xl">
              Browse popular courses. Shortlist and apply in a clean flow.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <a
              href="/apply"
              className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:opacity-90"
            >
              Book Consultation
            </a>
            <a
              href="/"
              className="px-6 py-3 rounded-full border border-black/15 font-semibold hover:border-black/30"
            >
              Back to Home
            </a>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-10 rounded-2xl border border-black/10 p-5 md:p-6">
          <div className="grid md:grid-cols-4 gap-3">
            <input
              className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black/30"
              placeholder="Search course (e.g., MBA)"
            />

            <select className="w-full rounded-xl border border-black/15 px-4 py-3 bg-white outline-none focus:border-black/30">
              <option>Level</option>
              <option>Bachelors</option>
              <option>Masters</option>
              <option>PhD</option>
            </select>

            <select className="w-full rounded-xl border border-black/15 px-4 py-3 bg-white outline-none focus:border-black/30">
              <option>Category</option>
              <option>Business</option>
              <option>STEM</option>
              <option>Engineering</option>
              <option>Law</option>
              <option>Health</option>
            </select>

            <button className="w-full rounded-xl bg-black text-white font-semibold py-3 hover:opacity-90">
              Apply Filters
            </button>
          </div>

          <p className="text-xs text-black/50 mt-3">
            *UI only. Backend search later.
          </p>
        </div>

        {/* Results */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-black/60">
            Showing <span className="font-semibold text-black">{courses.length}</span>{" "}
            courses
          </p>

          <select className="rounded-xl border border-black/15 px-4 py-2 bg-white text-sm font-semibold outline-none">
            <option>Sort: Popular</option>
            <option>Sort: Duration</option>
            <option>Sort: Level</option>
          </select>
        </div>

        {/* Cards */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((c) => (
            <CourseCard
              key={c.title}
              title={c.title}
              level={c.level}
              duration={c.duration}
              tag={c.tag}
            />
          ))}
        </div>

        {/* Pagination (UI) */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <button className="px-4 py-2 rounded-full border border-black/15 font-semibold hover:border-black/30">
            Prev
          </button>
          <button className="px-4 py-2 rounded-full bg-black text-white font-semibold">
            1
          </button>
          <button className="px-4 py-2 rounded-full border border-black/15 font-semibold hover:border-black/30">
            2
          </button>
          <button className="px-4 py-2 rounded-full border border-black/15 font-semibold hover:border-black/30">
            3
          </button>
          <button className="px-4 py-2 rounded-full border border-black/15 font-semibold hover:border-black/30">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function CourseCard({
  title,
  level,
  duration,
  tag,
}: {
  title: string;
  level: string;
  duration: string;
  tag: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 hover:border-black/25 transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-black tracking-tight">{title}</h3>
          <p className="text-sm text-black/60 mt-1">
            {level} • {duration}
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-semibold border border-black/15 text-black/70">
          {tag}
        </span>
      </div>

      <div className="mt-5 flex gap-2 flex-wrap">
        <a
          href="/apply"
          className="px-4 py-2 rounded-full bg-black text-white text-sm font-semibold hover:opacity-90"
        >
          Apply
        </a>
        <a
          href="#"
          className="px-4 py-2 rounded-full border border-black/15 text-sm font-semibold hover:border-black/30"
        >
          View Details
        </a>
        <button className="px-4 py-2 rounded-full border border-black/15 text-sm font-semibold hover:border-black/30">
          Shortlist
        </button>
      </div>
    </div>
  );
}
