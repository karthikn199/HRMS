import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export const DistrictPieChart = () => {
  // Data from your image
  const districtData = {
    labels: ['Kalburgi', 'Reichur', 'Bagalkote', 'Haveri', 'Vijayapura', 'Tumkur', 'Bellary', 'Belagavi', 'Shivamoga', 'Others'],
    datasets: [
      {
        data: [259, 244, 232, 238, 208, 0, 0, 0, 0, 0], // Only first 5 have values in your data
        backgroundColor: [
          '#3B82F6', // blue-500
          '#6366F1', // indigo-500
          '#8B5CF6', // violet-500
          '#EC4899', // pink-500
          '#F59E0B', // amber-500
          '#10B981', // emerald-500
          '#EF4444', // red-500
          '#64748B', // slate-500
          '#14B8A6', // teal-500
          '#F97316'  // orange-500
        ],
        borderColor: '#FFFFFF',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mt-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">District Distribution</h2>
      <div className="h-64 md:h-80">
        <Pie data={districtData} options={options} />
      </div>
      <div className="mt-3 text-sm text-gray-500 text-center">
        Total: {districtData.datasets[0].data.reduce((a, b) => a + b, 0)}
      </div>
    </div>
  );
};