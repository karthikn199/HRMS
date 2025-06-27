import React, { useState } from 'react';
import { FiX, FiSearch, FiPlus, FiMinus } from 'react-icons/fi';
import { GiGoldBar, GiDiamondRing } from 'react-icons/gi';

const NewSaleModal = ({ onClose, onSave }) => {
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState('');
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    type: 'gold',
    description: '',
    weight: '',
    makingCharge: 15,
    wastage: 2,
    price: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // Sample inventory items
  const inventoryItems = [
    { id: 1, name: '22K Gold Necklace', type: 'gold', weight: '8.5g', price: '₹68,000' },
    { id: 2, name: 'Diamond Engagement Ring', type: 'diamond', weight: '1.5ct', price: '₹1,20,000' },
    { id: 3, name: 'Silver Chain Bracelet', type: 'silver', weight: '15.8g', price: '₹12,500' },
  ];

  const addItem = () => {
    if (currentItem.description && currentItem.price) {
      setItems([...items, currentItem]);
      setCurrentItem({
        type: 'gold',
        description: '',
        weight: '',
        makingCharge: 15,
        wastage: 2,
        price: ''
      });
    }
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
    }, 0);
  };

  const handleSubmit = () => {
    const newSale = {
      id: `SALE${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      customer,
      items,
      total: `₹${calculateTotal().toLocaleString()}`,
      paymentMethod,
      status: 'completed'
    };
    onSave(newSale);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mt-10">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h3 className="text-lg font-bold">New Jewelry Sale</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Customer Information</h4>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search customer..."
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Or <button className="text-amber-600 hover:underline">add new customer</button>
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Add Items</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Item Type</label>
                    <select
                      value={currentItem.type}
                      onChange={(e) => setCurrentItem({...currentItem, type: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="gold">Gold</option>
                      <option value="diamond">Diamond</option>
                      <option value="silver">Silver</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Description</label>
                    <input
                      type="text"
                      placeholder="Item description"
                      value={currentItem.description}
                      onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Weight</label>
                    <input
                      type="text"
                      placeholder="e.g. 8.5g or 1.5ct"
                      value={currentItem.weight}
                      onChange={(e) => setCurrentItem({...currentItem, weight: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Making Charge (%)</label>
                    <input
                      type="number"
                      value={currentItem.makingCharge}
                      onChange={(e) => setCurrentItem({...currentItem, makingCharge: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Wastage (%)</label>
                    <input
                      type="number"
                      value={currentItem.wastage}
                      onChange={(e) => setCurrentItem({...currentItem, wastage: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Price (₹)</label>
                    <input
                      type="text"
                      placeholder="0.00"
                      value={currentItem.price}
                      onChange={(e) => setCurrentItem({...currentItem, price: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                
                <button
                  onClick={addItem}
                  className="flex items-center bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 gap-2"
                >
                  <FiPlus /> Add Item
                </button>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Quick Add from Inventory</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {inventoryItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setCurrentItem({
                          type: item.type,
                          description: item.name,
                          weight: item.weight,
                          price: item.price.replace('₹', ''),
                          makingCharge: 15,
                          wastage: 2
                        });
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {item.type === 'gold' && <GiGoldBar className="text-yellow-500" />}
                        {item.type === 'diamond' && <GiDiamondRing className="text-blue-500" />}
                        {item.type === 'silver'}
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{item.weight}</div>
                      <div className="text-sm font-bold mt-1">{item.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Selected Items</h4>
                {items.length === 0 ? (
                  <p className="text-gray-500">No items added yet</p>
                ) : (
                  <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                    {items.map((item, index) => (
                      <div key={index} className="p-3 flex justify-between items-center">
                        <div>
                          <div className="font-medium">{item.description}</div>
                          <div className="text-sm text-gray-500">
                            {item.weight} • Making: {item.makingCharge}% • Wastage: {item.wastage}%
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold">₹{item.price}</span>
                          <button 
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiMinus />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Payment Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="cash">Cash</option>
                      <option value="credit_card">Credit Card</option>
                      <option value="debit_card">Debit Card</option>
                      <option value="upi">UPI</option>
                      <option value="emi">EMI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Total Amount</label>
                    <div className="p-2 border border-gray-300 rounded-lg bg-gray-50 font-bold text-lg">
                      ₹{calculateTotal().toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
            {step === 1 ? (
              <button 
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            ) : (
              <button 
                onClick={() => setStep(1)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
            )}
            
            {step === 1 ? (
              <button 
                onClick={() => setStep(2)}
                disabled={items.length === 0}
                className={`px-4 py-2 rounded-lg text-white ${items.length === 0 ? 'bg-gray-400' : 'bg-amber-600 hover:bg-amber-700'}`}
              >
                Continue to Payment
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Complete Sale
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSaleModal;