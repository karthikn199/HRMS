import React, { useState } from 'react';
import SalesHeader from './SalesHeader';
import SalesStats from './SalesStats';
import RecentTransactions from './RecentTransactions';
import SalesChart from './SalesChart';
import NewSaleModal from './NewSaleModal';

const SalesDashboard = () => {
  const [showNewSaleModal, setShowNewSaleModal] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [filter, setFilter] = useState('today');

  // Sample sales data
  const sampleData = [
    {
      id: 'SALE001',
      date: '2023-11-20',
      customer: 'Priya Sharma',
      items: [
        { name: '22K Gold Necklace', weight: '8.5g', price: '₹68,000' },
        { name: 'Diamond Earrings', weight: '1.2ct', price: '₹42,500' }
      ],
      total: '₹1,10,500',
      paymentMethod: 'Credit Card',
      status: 'completed'
    },
    // More sample data...
  ];

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <SalesHeader 
        onNewSale={() => setShowNewSaleModal(true)} 
        filter={filter}
        setFilter={setFilter}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <SalesStats filter={filter} />
          <SalesChart salesData={sampleData} />
        </div>
        <div className="lg:col-span-1">
          <RecentTransactions transactions={sampleData} />
        </div>
      </div>

      {showNewSaleModal && (
        <NewSaleModal 
          onClose={() => setShowNewSaleModal(false)}
          onSave={(newSale) => {
            setSalesData([...salesData, newSale]);
            setShowNewSaleModal(false);
          }}
        />
      )}
    </div>
  );
};

export default SalesDashboard;