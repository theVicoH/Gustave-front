export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics dashboard</h1>
        <button className="text-sm bg-white px-4 py-2 rounded-md border flex items-center gap-2">
          Pick a date
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-sm text-gray-500 mb-4">All User</h3>
          <p className="text-2xl font-semibold">10,234</p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-sm text-gray-500 mb-4">Event Count</h3>
          <p className="text-2xl font-semibold text-orange-500">536</p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-sm text-gray-500 mb-4">Conversations</h3>
          <p className="text-2xl font-semibold text-green-500">21</p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-sm text-gray-500 mb-4">New User</h3>
          <p className="text-2xl font-semibold text-black-500">3321</p>
        </div>
      </div>
    </div>
  );
}
