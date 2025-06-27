export const PostStats = () => {
  const postData = [
    { category: 'School', count: 4915, color: 'bg-blue-100 text-blue-800' },
    { category: 'Hostel', count: 2640, color: 'bg-indigo-100 text-indigo-800' },
    { category: 'DOM', count: 1296, color: 'bg-violet-100 text-violet-800' },
    { category: 'District Office', count: 322, color: 'bg-pink-100 text-pink-800' }
  ];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-medium text-gray-800 mb-3">Post Distribution</h2>
      
      <div className="grid grid-cols-2 gap-2">
        {postData.map((item, index) => (
          <div key={index} className={`${item.color} px-3 py-2 rounded-lg`}>
            <div className="font-medium">{item.category}</div>
            <div className="text-lg font-bold">{item.count.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Year: 2021 • Total: {postData.reduce((sum, item) => sum + item.count, 0).toLocaleString()}
      </div>
    </div>
  );
};