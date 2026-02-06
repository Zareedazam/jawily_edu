export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-black">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-black">Student Dashboard</h1>
        <p className="text-black/60 mt-2">
          Track your application progress
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-10">
          <Card title="Application Status" value="Under Review" />
          <Card title="Documents" value="3 / 5 Uploaded" />
          <Card title="Counsellor" value="Assigned" />
        </div>

        <div className="mt-10 border border-black/15 rounded-2xl p-6 bg-white">
          <h2 className="text-xl font-black">Next Steps</h2>
          <ul className="mt-4 space-y-3 text-black/70">
            <li>• Upload remaining documents</li>
            <li>• Shortlist universities</li>
            <li>• Schedule counselling call</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/15 bg-white p-6">
      <p className="text-sm text-black/60">{title}</p>
      <p className="text-2xl font-black mt-2">{value}</p>
    </div>
  );
}
