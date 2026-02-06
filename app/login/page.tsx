export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-6">
      <div className="w-full max-w-md border border-black/15 rounded-2xl p-8">
        <h1 className="text-3xl font-black">Login</h1>
        <p className="text-black/60 mt-2">
          Access your Jawily dashboard
        </p>

        <div className="mt-8 space-y-4">
          <input
            className="w-full rounded-xl border border-black/15 px-4 py-3"
            placeholder="Email"
          />
          <input
            type="password"
            className="w-full rounded-xl border border-black/15 px-4 py-3"
            placeholder="Password"
          />

          <button className="w-full rounded-full bg-black text-white py-3 font-semibold hover:opacity-90">
            Login
          </button>
        </div>

        <p className="text-sm text-black/60 mt-6 text-center">
          Don’t have an account? <span className="underline">Apply now</span>
        </p>
      </div>
    </div>
  );
}
