export default function EcommercePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">E-commerce Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Total Sales</h3>
          <p className="text-3xl font-bold">$24,563</p>
          <p className="text-sm text-green-500 mt-2">+12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Orders</h3>
          <p className="text-3xl font-bold">1,234</p>
          <p className="text-sm text-green-500 mt-2">+5% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Customers</h3>
          <p className="text-3xl font-bold">3,456</p>
          <p className="text-sm text-green-500 mt-2">+8% from last month</p>
        </div>
      </div>
    </div>
  );
}
