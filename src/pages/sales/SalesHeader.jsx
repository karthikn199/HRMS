import React from 'react';
import { FiPlus, FiFilter, FiDownload } from 'react-icons/fi';

const SalesHeader = ({ onNewSale, filter, setFilter }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Sales Management</h2>
        <p className="text-gray-600">Track and manage all jewelry sales</p>
      </div>
      
      <div className="flex gap-3 w-full md:w-auto">
        <div className="relative flex-1 md:w-48">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
          <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <button 
          className="flex items-center bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 gap-2"
        >
          <FiDownload /> Export
        </button>
        
        <button 
          onClick={onNewSale}
          className="flex items-center bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 gap-2"
        >
          <FiPlus /> New Sale
        </button>
      </div>
    </div>
  );
};

export default SalesHeader;