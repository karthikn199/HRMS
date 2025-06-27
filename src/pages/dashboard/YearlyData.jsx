export const YearlyData = () => {
  const years = [
    "2016-17", "2005-06", "2007-08", "2004-05", "2017-18", 
    "2015-16", "2014-15", "2006-07", "2008-09"
  ];
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Yearly Data</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {years.map((year, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg text-center">
            <span className="text-gray-700">{year}</span>
          </div>
        ))}
      </div>
    </div>
  );
};