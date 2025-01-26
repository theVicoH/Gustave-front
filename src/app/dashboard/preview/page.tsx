export default function ProjectPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Website Redesign</h3>
          <p className="text-sm text-gray-500 mb-4">
            Complete overhaul of company website
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-purple-600">In Progress</span>
            <span className="text-sm text-gray-500">75%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Mobile App</h3>
          <p className="text-sm text-gray-500 mb-4">
            iOS and Android application development
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-600">Completed</span>
            <span className="text-sm text-gray-500">100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
