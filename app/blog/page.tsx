export default function BlogPage() {
  const posts = [
    {
      title: "Choosing the Right Course for Your Future",
      date: "5 Aug",
      tag: "Guide",
      excerpt:
        "A simple checklist to pick the right course based on goals, budget and career outcomes.",
      slug: "choosing-the-right-course",
    },
    {
      title: "Top Universities: What Really Matters?",
      date: "2 Aug",
      tag: "Universities",
      excerpt:
        "Rankings, scholarships, and entry requirements—how to evaluate them the smart way.",
      slug: "top-universities-what-matters",
    },
    {
      title: "Scholarships: How to Improve Your Chances",
      date: "29 Jul",
      tag: "Scholarship",
      excerpt:
        "Practical steps to strengthen your profile, SOP and references for funding opportunities.",
      slug: "scholarships-improve-chances",
    },
    {
      title: "SOP Mistakes That Reject Your Application",
      date: "21 Jul",
      tag: "SOP",
      excerpt:
        "Common errors students make and how to write a clean, strong statement of purpose.",
      slug: "sop-mistakes",
    },
    {
      title: "IELTS vs Duolingo: Which One Should You Take?",
      date: "12 Jul",
      tag: "English Test",
      excerpt:
        "Quick comparison to decide faster—time, difficulty, acceptance and cost.",
      slug: "ielts-vs-duolingo",
    },
    {
      title: "Visa Basics: Documents You Must Prepare",
      date: "4 Jul",
      tag: "Visa",
      excerpt:
        "A simple document checklist for smooth visa filing and fewer delays.",
      slug: "visa-basics-documents",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Blog & News
            </h1>
            <p className="mt-3 text-black/70 max-w-2xl">
              Short, practical guides to help you decide faster.
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

        {/* Filters (UI) */}
        <div className="mt-10 rounded-2xl border border-black/10 p-5 md:p-6">
          <div className="grid md:grid-cols-4 gap-3">
            <input
              className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black/30"
              placeholder="Search articles"
            />

            <select className="w-full rounded-xl border border-black/15 px-4 py-3 bg-white outline-none focus:border-black/30">
              <option>Category</option>
              <option>Guide</option>
              <option>Universities</option>
              <option>Scholarship</option>
              <option>Visa</option>
              <option>SOP</option>
              <option>English Test</option>
            </select>

            <select className="w-full rounded-xl border border-black/15 px-4 py-3 bg-white outline-none focus:border-black/30">
              <option>Sort</option>
              <option>Newest</option>
              <option>Oldest</option>
              <option>Most Popular</option>
            </select>

            <button className="w-full rounded-xl bg-black text-white font-semibold py-3 hover:opacity-90">
              Apply
            </button>
          </div>

          <p className="text-xs text-black/50 mt-3">
            *UI only. Backend blog later.
          </p>
        </div>

        {/* Posts */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
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

function PostCard({
  post,
}: {
  post: {
    title: string;
    date: string;
    tag: string;
    excerpt: string;
    slug: string;
  };
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white overflow-hidden hover:border-black/25 transition">
      <div className="h-40 bg-neutral-200" />

      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-black/50">{post.date}</span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold border border-black/15 text-black/70">
            {post.tag}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-black tracking-tight">
          {post.title}
        </h3>

        <p className="mt-2 text-sm text-black/70 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="mt-5 flex gap-2 flex-wrap">
          <a
            href={`/blog/${post.slug}`}
            className="px-4 py-2 rounded-full bg-black text-white text-sm font-semibold hover:opacity-90"
          >
            Read
          </a>
          <button className="px-4 py-2 rounded-full border border-black/15 text-sm font-semibold hover:border-black/30">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
