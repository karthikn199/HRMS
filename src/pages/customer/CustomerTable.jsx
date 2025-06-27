import React from "react";
import CustomerRow from "./CustomerRow";

const CustomersTable = ({
  customers,
  expandedRow,
  toggleExpand,
  handleEdit,
  handleDelete,
  getLoyaltyBadge,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Purchases
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loyalty
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                expandedRow={expandedRow}
                toggleExpand={toggleExpand}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                getLoyaltyBadge={getLoyaltyBadge}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersTable;