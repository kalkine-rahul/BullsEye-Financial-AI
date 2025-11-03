




export default function DailyWrap() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Daily Wrap
          </h1>
          <p className="text-xl text-gray-600">{today}</p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tasks Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              Today's Tasks
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <input type="checkbox" className="mr-3 h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Complete project proposal</span>
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-3 h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Team meeting at 2 PM</span>
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-3 h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Review weekly metrics</span>
              </li>
            </ul>
          </div>

          {/* Notes Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Notes</h2>
            <textarea 
              className="w-full h-40 border border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="What's on your mind today?"
            ></textarea>
          </div>

          {/* Weather/Stats Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Today's Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Focus Time</span>
                <span className="font-semibold">4h 23m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tasks Completed</span>
                <span className="font-semibold">8/12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Water Intake</span>
                <span className="font-semibold">1.8L</span>
              </div>
            </div>
          </div>

          {/* Highlights Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Daily Highlights</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-yellow-500 mr-2">★</span>
                <span className="text-gray-700">Finished the quarterly report ahead of schedule</span>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-500 mr-2">★</span>
                <span className="text-gray-700">Received positive feedback from client</span>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Quote */}
        <div className="mt-8 text-center">
          <blockquote className="text-gray-600 italic">
            "The only way to do great work is to love what you do."
          </blockquote>
        </div>
      </div>
    </div>
  );
}