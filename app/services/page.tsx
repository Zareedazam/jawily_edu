export default function ServicesPage() {
  const services = [
    {
      title: "Free Counselling",
      tag: "₹0",
      desc: "Initial guidance, profile review and country shortlisting.",
    },
    {
      title: "Premium Application Service",
      tag: "Fast Track",
      desc: "End-to-end support from shortlisting to offer letter.",
    },
    {
      title: "Oxbridge / Ivy Guidance",
      tag: "Expert",
      desc: "Specialised mentoring for top-ranked universities.",
    },
    {
      title: "Medicine & Dentistry",
      tag: "Specialist",
      desc: "Dedicated guidance for competitive medical programs.",
    },
    {
      title: "Visa & Documentation",
      tag: "Support",
      desc: "Visa filing, SOP review and document preparation.",
    },
    {
      title: "Scholarship Assistance",
      tag: "Funding",
      desc: "Identify and apply for scholarships and bursaries.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Services
            </h1>
            <p className="mt-3 text-black/70 max-w-2xl">
              Choose a service that fits your goals. We guide you at every step.
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

        {/* Services grid */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <ServiceCard
              key={s.title}
              title={s.title}
              tag={s.tag}
              desc={s.desc}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl border border-black/10 bg-neutral-50 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black tracking-tight">
              Not sure which service to choose?
            </h2>
            <p className="text-black/70 mt-2">
              Talk to an expert and get a clear roadmap.
            </p>
          </div>
          <a
            href="/apply"
            className="px-8 py-3 rounded-full bg-black text-white font-semibold hover:opacity-90"
          >
            Get Free Advice
          </a>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({
  title,
  tag,
  desc,
}: {
  title: string;
  tag: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 hover:border-black/25 transition">
      <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold border border-black/15 text-black/70">
        {tag}
      </span>

      <h3 className="mt-4 text-lg font-black tracking-tight">{title}</h3>

      <p className="mt-2 text-black/60 text-sm">{desc}</p>

      <div className="mt-5 flex gap-2 flex-wrap">
        <a
          href="/apply"
          className="px-4 py-2 rounded-full bg-black text-white text-sm font-semibold hover:opacity-90"
        >
          Apply
        </a>
        <button className="px-4 py-2 rounded-full border border-black/15 text-sm font-semibold hover:border-black/30">
          View Details
        </button>
      </div>
    </div>
  );
}
