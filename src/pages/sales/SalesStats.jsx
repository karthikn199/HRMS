import React from 'react';
import { FiDollarSign, FiShoppingBag, FiUsers, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const SalesStats = ({ filter }) => {
  // Sample data - in a real app, this would come from your API
  const stats = [
    {
      title: "Total Sales",
      value: "₹1,84,920",
      change: "+18%",
      icon: <FiDollarSign className="text-amber-600" size={20} />,
      trend: "up"
    },
    {
      title: "Transactions",
      value: "24",
      change: "+5%",
      icon: <FiShoppingBag className="text-blue-600" size={20} />,
      trend: "up"
    },
    {
      title: "New Customers",
      value: "8",
      change: "-2%",
      icon: <FiUsers className="text-green-600" size={20} />,
      trend: "down"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
              {stat.icon}
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              stat.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {stat.change}
            </span>
          </div>
          <h3 className="text-sm text-gray-500 mt-2">{stat.title}</h3>
          <p className="text-xl font-bold mt-1">{stat.value}</p>
          <div className="mt-2 text-xs text-gray-500">
            {stat.trend === "up" ? (
              <span className="flex items-center text-green-600">
                <FiTrendingUp className="mr-1" /> Increased from last {filter}
              </span>
            ) : (
              <span className="flex items-center text-red-600">
                <FiTrendingDown className="mr-1" /> Decreased from last {filter}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SalesStats;