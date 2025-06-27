import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const YearlyPostChart = () => {
  // Sample data - replace with your actual values
  const chartData = {
    labels: ['2004-05', '2005-06', '2006-07', '2007-08', '2016-17', '2017-18', '2018-19'],
    datasets: [
      {
        label: 'Number of Posts',
        data: [120, 180, 150, 200, 250, 300, 460], // Replace with your actual data
        backgroundColor: '#3B82F6',
        borderRadius: 6,
        borderSkipped: false,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Posts: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
        ticks: {
          stepSize: 50,
        }
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Posts by Year</h2>
        <div className="flex items-center text-sm text-gray-500">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          Number of Posts
        </div>
      </div>
      
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
      
      <div className="mt-4 text-sm text-gray-500 text-center">
        Fiscal year data showing post allocations
      </div>
    </div>
  );
};