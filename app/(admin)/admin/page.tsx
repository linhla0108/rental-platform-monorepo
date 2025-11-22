export default function AdminPage() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="rounded-lg border-4 border-dashed border-gray-200 p-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Welcome to Admin Dashboard
        </h2>
        <p className="mb-6 text-gray-600">
          This is the admin panel. You can manage your rental platform from
          here.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Properties
            </h3>
            <p className="text-sm text-gray-600">Manage rental properties</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Bookings
            </h3>
            <p className="text-sm text-gray-600">View and manage bookings</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Users</h3>
            <p className="text-sm text-gray-600">Manage user accounts</p>
          </div>
        </div>
      </div>
    </div>
  )
}
