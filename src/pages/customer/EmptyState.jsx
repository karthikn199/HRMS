import React from "react";
import { FiPlus, FiUser } from "react-icons/fi";

const EmptyState = ({ searchTerm, setShowForm }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <FiUser className="mx-auto h-10 w-10 text-gray-300" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        No customers found
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        {searchTerm
          ? "Try adjusting your search"
          : "Get started by adding your first customer"}
      </p>
      <div className="mt-4">
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none"
        >
          <FiPlus className="-ml-0.5 mr-1.5 h-4 w-4" />
          Add Customer
        </button>
      </div>
    </div>
  );
};

export default EmptyState;