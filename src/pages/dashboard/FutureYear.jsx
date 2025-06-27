export const FutureYears = () => {
  // In a real implementation, you might fetch this data or paginate it
  const generateYears = () => {
    const years = [];
    for (let i = 2025; i <= 2085; i++) {
      years.push(i);
    }
    return years;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Future Projections</h2>
      <div className="max-h-60 overflow-y-auto">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
          {generateYears().map((year) => (
            <div key={year} className="bg-gray-50 p-2 rounded text-center">
              <span className="text-gray-700 text-sm">{year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};