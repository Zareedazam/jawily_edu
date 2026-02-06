export default function UniversitiesPage() {
  const universities = [
    { name: "University of London", country: "UK", ranking: "#Top 50", tag: "Popular" },
    { name: "University of Manchester", country: "UK", ranking: "#Top 100", tag: "STEM" },
    { name: "University of Toronto", country: "Canada", ranking: "#Top 50", tag: "Top" },
    { name: "University of British Columbia", country: "Canada", ranking: "#Top 100", tag: "Research" },
    { name: "University of Melbourne", country: "Australia", ranking: "#Top 50", tag: "Top" },
    { name: "Monash University", country: "Australia", ranking: "#Top 100", tag: "Popular" },
    { name: "Harvard University", country: "USA", ranking: "#Top 10", tag: "Elite" },
    { name: "University of California", country: "USA", ranking: "#Top 50", tag: "Top" },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Universities
            </h1>
            <p className="mt-3 text-black/70 max-w-2xl">
              Browse universities and explore entry requirements, fees and scholarships.
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
              placeholder="Search university (e.g., Toronto)"
            />

            <select className="w-full rounded-xl border border-black/15 px-4 py-3 bg-white outline-none focus:border-black/30">
              <option>Country</option>
              <option>UK</option>
              <option>Canada</option>
              <option>Australia</option>
              <option>USA</option>
            </select>

            <select className="w-full rounded-xl border border-black/15 px-4 py-3 bg-white outline-none focus:border-black/30">
              <option>Type</option>
              <option>Public</option>
              <option>Private</option>
              <option>Research</option>
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
            Showing <span className="font-semibold text-black">{universities.length}</span>{" "}
            universities
          </p>

          <select className="rounded-xl border border-black/15 px-4 py-2 bg-white text-sm font-semibold outline-none">
            <option>Sort: Popular</option>
            <option>Sort: Ranking</option>
            <option>Sort: Country</option>
          </select>
        </div>

        {/* Cards */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {universities.map((u) => (
            <UniversityCard
              key={u.name}
              name={u.name}
              country={u.country}
              ranking={u.ranking}
              tag={u.tag}
            />
          ))}
        </div>

        {/* Pagination UI */}
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

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function UniversityCard({
  name,
  country,
  ranking,
  tag,
}: {
  name: string;
  country: string;
  ranking: string;
  tag: string;
}) {
  const slug = slugify(name);

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 hover:border-black/25 transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-black tracking-tight">{name}</h3>
          <p className="text-sm text-black/60 mt-1">
            {country} • {ranking}
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-semibold border border-black/15 text-black/70">
          {tag}
        </span>
      </div>

      <div className="mt-5 flex gap-2 flex-wrap">
        <a
          href={`/universities/${slug}`}
          className="px-4 py-2 rounded-full bg-black text-white text-sm font-semibold hover:opacity-90"
        >
          View Details
        </a>
        <a
          href="/apply"
          className="px-4 py-2 rounded-full border border-black/15 text-sm font-semibold hover:border-black/30"
        >
          Apply
        </a>
        <button className="px-4 py-2 rounded-full border border-black/15 text-sm font-semibold hover:border-black/30">
          Shortlist
        </button>
      </div>
    </div>
  );
}
