export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-14">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          Book your Free Consultation
        </h1>
        <p className="mt-3 text-black/70 max-w-3xl">
          Our team will contact you within 24 hours to arrange your initial
          consultation with an education expert.
        </p>

        {/* Form Card */}
        <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6 md:p-8">
          <form className="space-y-8">
            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="First Name">
                <input
                  className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black/30"
                  placeholder="Enter first name"
                />
              </Field>

              <Field label="Family Name">
                <input
                  className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black/30"
                  placeholder="Enter family name"
                />
              </Field>
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Mobile Contact">
                <input
                  className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black/30"
                  placeholder="e.g., +92 300 0000000"
                />
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black/30"
                  placeholder="Enter email"
                />
              </Field>
            </div>

            {/* Row 3 (3 dropdowns) */}
            <div className="grid md:grid-cols-3 gap-5">
              <Field label="Nationality">
                <select className="w-full rounded-xl border border-black/15 px-4 py-3 bg-white outline-none focus:border-black/30">
                  <option>-- Please select --</option>
                  <option>Pakistan</option>
                  <option>India</option>
                  <option>UAE</option>
                  <option>Bangladesh</option>
                  <option>Other</option>
                </select>
              </Field>

              <Field label="Type of Study">
                <select className="w-full rounded-xl border border-black/15 px-4 py-3 bg-white outline-none focus:border-black/30">
                  <option>-- Please select --</option>
                  <option>Undergraduate</option>
                  <option>Postgraduate</option>
                  <option>PhD / Research</option>
                  <option>Foundation</option>
                </select>
              </Field>

              <Field label="Year of Study">
                <select className="w-full rounded-xl border border-black/15 px-4 py-3 bg-white outline-none focus:border-black/30">
                  <option>-- Please select --</option>
                  <option>2026</option>
                  <option>2027</option>
                  <option>2028</option>
                </select>
              </Field>
            </div>

            {/* Row 4 (2 dropdowns) */}
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Subject Interested">
                <select className="w-full rounded-xl border border-black/15 px-4 py-3 bg-white outline-none focus:border-black/30">
                  <option>-- Please select --</option>
                  <option>Business</option>
                  <option>Engineering</option>
                  <option>Law</option>
                  <option>Computer Science</option>
                  <option>Medicine</option>
                </select>
              </Field>

              <Field label="Where did you hear about Jawily?">
                <select className="w-full rounded-xl border border-black/15 px-4 py-3 bg-white outline-none focus:border-black/30">
                  <option>-- Please select --</option>
                  <option>Google</option>
                  <option>Facebook</option>
                  <option>Instagram</option>
                  <option>Friend / Referral</option>
                  <option>Other</option>
                </select>
              </Field>
            </div>

            {/* Radio */}
            <div>
              <p className="text-sm font-semibold text-black/80">
                Are you currently living in the UK?
              </p>
              <div className="mt-3 flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="inuk" className="h-4 w-4" />
                  Yes
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="inuk" className="h-4 w-4" />
                  No
                </label>
              </div>
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 h-4 w-4" />
              <p className="text-sm text-black/70 leading-relaxed">
                I consent to receive digital communications regarding university
                application services. I understand I may change preferences or opt
                out anytime. <span className="underline">View Privacy Policy</span>.
              </p>
            </div>

            {/* Submit Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
              <p className="text-xs text-black/50">
                *This is UI only. Backend later connect hoga.
              </p>

              <button
                type="button"
                className="w-full sm:w-auto px-10 py-3 rounded-full bg-black text-white font-semibold hover:opacity-90"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Optional small note */}
        <p className="mt-6 text-xs text-black/50">
          By submitting, you agree to our terms and privacy policy.
        </p>
      </div>
    </div>
  );
}

/* Small helper */
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
