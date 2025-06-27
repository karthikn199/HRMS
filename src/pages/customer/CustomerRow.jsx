import React from "react";
import { FaCrown, FaGem } from "react-icons/fa";
import {
  FiChevronDown,
  FiChevronUp,
  FiDollarSign,
  FiEdit2,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShoppingBag,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

const CustomerRow = ({
  customer,
  expandedRow,
  toggleExpand,
  handleEdit,
  handleDelete,
  getLoyaltyBadge,
}) => {
  return (
    <React.Fragment key={customer.id}>
      <tr className={`hover:bg-gray-50 ${expandedRow === customer.id ? "bg-gray-50" : ""}`}>
        <td className="px-4 py-3 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
              <FiUser className="text-amber-600" />
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">
                {customer.name}
              </div>
              <div className="text-xs text-gray-500">
                Joined: {customer.joinDate}
              </div>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            {customer.email || "-"}
          </div>
          <div className="text-xs text-gray-500">
            {customer.phone}
          </div>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <div className="flex items-center gap-1">
            <FiShoppingBag className="text-gray-400" />
            <span className="text-sm font-medium">
              {customer.totalPurchases}
            </span>
            <span className="text-xs text-gray-500 ml-1">
              ({customer.lastPurchase || "Never"})
            </span>
          </div>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <div className="flex items-center gap-1">
            <FiDollarSign className="text-green-500" />
            <span className="text-sm font-medium">
              ₹{customer.totalSpent.toLocaleString()}
            </span>
          </div>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          {getLoyaltyBadge(customer.loyaltyTier)}
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex items-center justify-end gap-2">
            <button
              className="text-amber-600 hover:text-amber-800 p-1 rounded-full hover:bg-amber-50"
              onClick={() => toggleExpand(customer.id)}
            >
              {expandedRow === customer.id ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </button>
            <button
              className="text-gray-600 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100"
              onClick={() => handleEdit(customer)}
            >
              <FiEdit2 />
            </button>
            <button
              className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
              onClick={() => handleDelete(customer.id)}
            >
              <FiTrash2 />
            </button>
          </div>
        </td>
      </tr>

      {/* Expanded row details */}
      {expandedRow === customer.id && (
        <tr>
          <td colSpan="6" className="px-4 py-3 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Contact Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <FiMail className="text-gray-400" />
                    <span>
                      {customer.email || "No email provided"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone className="text-gray-400" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiMapPin className="text-gray-400 mt-0.5" />
                    <span>
                      {customer.address || "No address provided"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Purchase History
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Total Purchases:
                    </span>
                    <span className="font-medium">
                      {customer.totalPurchases}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Total Value:
                    </span>
                    <span className="font-medium">
                      ₹{customer.totalSpent.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Last Purchase:
                    </span>
                    <span>
                      {customer.lastPurchase || "Never"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Notes
                </h4>
                <p className="text-sm text-gray-700 bg-gray-100 p-2 rounded">
                  {customer.notes || "No notes available"}
                </p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default CustomerRow;