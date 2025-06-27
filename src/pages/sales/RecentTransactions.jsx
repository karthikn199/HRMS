import React from "react";
import { FiCheckCircle, FiClock } from "react-icons/fi";

const RecentTransactions = ({ transactions }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 h-full">
      <h3 className="font-bold text-lg mb-4">Recent Transactions</h3>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="border-b border-gray-100 pb-4 last:border-0"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{transaction.customer}</h4>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  transaction.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {transaction.status}
              </span>
            </div>

            <div className="mt-2">
              {transaction.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-medium">{item.price}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center text-sm text-gray-500">
                {transaction.status === "completed" ? (
                  <FiCheckCircle className="text-green-500 mr-1" />
                ) : (
                  <FiClock className="text-yellow-500 mr-1" />
                )}
                {transaction.paymentMethod}
              </div>
              <div className="font-bold">{transaction.total}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 text-sm text-amber-600 hover:text-amber-800 font-medium">
        View All Transactions →
      </button>
    </div>
  );
};

export default RecentTransactions;
