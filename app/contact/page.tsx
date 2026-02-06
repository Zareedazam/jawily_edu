export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-14">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          Contact Jawily
        </h1>
        <p className="mt-3 text-black/70 max-w-2xl">
          Send a message. We’ll reply within 24 hours.
        </p>

        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="rounded-2xl border border-black/10 p-6 md:p-8 bg-white">
            <h2 className="text-xl font-black">Message us</h2>
            <p className="text-sm text-black/60 mt-2">
              Fill the form. Our team will contact you.
            </p>

            <form className="mt-6 space-y-4">
              <Field label="Full Name">
                <input
                  className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black/30"
                  placeholder="Your name"
                />
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black/30"
                  placeholder="you@example.com"
                />
              </Field>

              <Field label="Phone (optional)">
                <input
                  className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black/30"
                  placeholder="+92 300 0000000"
                />
              </Field>

              <Field label="Topic">
                <select className="w-full rounded-xl border border-black/15 px-4 py-3 bg-white outline-none focus:border-black/30">
                  <option>General</option>
                  <option>Free Consultation</option>
                  <option>Universities</option>
                  <option>Courses</option>
                  <option>Visa Guidance</option>
                </select>
              </Field>

              <Field label="Message">
                <textarea
                  className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black/30 min-h-[140px]"
                  placeholder="Write your message..."
                />
              </Field>

              <div className="flex items-start gap-3 pt-1">
                <input type="checkbox" className="mt-1 h-4 w-4" />
                <p className="text-xs text-black/60 leading-relaxed">
                  I agree to be contacted by Jawily. I can opt out anytime.
                </p>
              </div>

              <button
                type="button"
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-black text-white font-semibold hover:opacity-90"
              >
                Send Message
              </button>

              <p className="text-xs text-black/50 mt-2">
                *UI only. Backend later connect hoga.
              </p>
            </form>
          </div>

          {/* Info */}
          <div className="rounded-2xl border border-black/10 p-6 md:p-8 bg-neutral-50">
            <h2 className="text-xl font-black">Reach us</h2>

            <div className="mt-6 space-y-4 text-sm">
              <InfoRow title="Phone" value="027-7287-7040" />
              <InfoRow title="Email" value="support@jawily.com" />
              <InfoRow title="Office Hours" value="Mon–Sat, 10am–7pm" />
              <InfoRow title="Location" value="Your city, Your country" />
            </div>

            <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6">
              <p className="font-black">Quick actions</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="/apply"
                  className="px-5 py-2 rounded-full bg-black text-white font-semibold hover:opacity-90"
                >
                  Book Consultation
                </a>
                <a
                  href="/"
                  className="px-5 py-2 rounded-full border border-black/15 font-semibold hover:border-black/30"
                >
                  Back to Home
                </a>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-black/10 bg-white h-[220px] flex items-center justify-center text-black/50">
              Map Placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-black/80 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function InfoRow({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-3">
      <span className="text-black/60">{title}</span>
      <span className="font-semibold text-black">{value}</span>
    </div>
  );
}
