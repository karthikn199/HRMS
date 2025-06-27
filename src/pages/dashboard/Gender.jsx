import { useState } from "react";

export const GenderStats = () => {
  const [timeRange, setTimeRange] = useState("monthly");

  // Sample data for different time ranges
  const data = {
    monthly: {
      female: 3959,
      male: 3959,
      trend: "up",
      change: 2.4,
    },
    quarterly: {
      female: 11877,
      male: 11877,
      trend: "stable",
      change: 0.8,
    },
    yearly: {
      female: 47508,
      male: 47508,
      trend: "up",
      change: 5.2,
    },
  };

  const currentData = data[timeRange];
  const total = currentData.female + currentData.male;
  const femalePercentage = Math.round((currentData.female / total) * 100);
  const malePercentage = 100 - femalePercentage;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Gender Metrics
          </h2>
          <p className="text-sm text-gray-500">
            Employee distribution by gender
          </p>
        </div>

        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            onClick={() => setTimeRange("monthly")}
            className={`px-3 py-1 text-sm font-medium rounded-l-lg ${
              timeRange === "monthly"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeRange("quarterly")}
            className={`px-3 py-1 text-sm font-medium ${
              timeRange === "quarterly"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Quarterly
          </button>
          <button
            onClick={() => setTimeRange("yearly")}
            className={`px-3 py-1 text-sm font-medium rounded-r-lg ${
              timeRange === "yearly"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Female Stats */}
        <div className="bg-pink-50 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Female</span>
              </div>
              <div className="mt-2 text-2xl font-bold text-pink-600">
                {currentData.female.toLocaleString()}
              </div>
            </div>
            <div
              className={`flex items-center text-sm ${
                currentData.trend === "up"
                  ? "text-green-600"
                  : currentData.trend === "down"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {currentData.trend === "up" ? (
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 01-1-1V5.414l-4.293 4.293a1 1 0 01-1.414-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L13 5.414V6a1 1 0 01-1 1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : currentData.trend === "down" ? (
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 13a1 1 0 01-1 1H9a1 1 0 010-2h2a1 1 0 011 1zm-3-7a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1V6z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {currentData.change}%
            </div>
          </div>
          <div className="mt-4 w-full bg-pink-100 rounded-full h-2">
            <div
              className="bg-pink-500 h-2 rounded-full"
              style={{ width: `${femalePercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Male Stats */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Male</span>
              </div>
              <div className="mt-2 text-2xl font-bold text-blue-600">
                {currentData.male.toLocaleString()}
              </div>
            </div>
            <div
              className={`flex items-center text-sm ${
                currentData.trend === "up"
                  ? "text-green-600"
                  : currentData.trend === "down"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {currentData.trend === "up" ? (
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 01-1-1V5.414l-4.293 4.293a1 1 0 01-1.414-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L13 5.414V6a1 1 0 01-1 1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : currentData.trend === "down" ? (
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 13a1 1 0 01-1 1H9a1 1 0 010-2h2a1 1 0 011 1zm-3-7a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1V6z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {currentData.change}%
            </div>
          </div>
          <div className="mt-4 w-full bg-blue-100 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${malePercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Total employees</span>
          <span className="font-medium">{total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-gray-500">Gender ratio</span>
          <span className="font-medium">1:1</span>
        </div>
      </div>
    </div>
  );
};
