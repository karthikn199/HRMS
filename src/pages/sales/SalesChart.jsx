import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = ({ salesData }) => {
  // Sample chart data - in a real app, this would be derived from your sales data
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Gold Sales',
        data: [120000, 190000, 150000, 180000, 210000, 190000, 230000],
        backgroundColor: 'rgba(245, 158, 11, 0.7)',
      },
      {
        label: 'Diamond Sales',
        data: [80000, 110000, 90000, 120000, 150000, 130000, 170000],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
      {
        label: 'Silver Sales',
        data: [40000, 50000, 45000, 60000, 70000, 65000, 80000],
        backgroundColor: 'rgba(156, 163, 175, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales Breakdown',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + value.toLocaleString();
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <Bar options={options} data={data} />
    </div>
  );
};

export default SalesChart;