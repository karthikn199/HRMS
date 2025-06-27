import React, { useState } from "react";
import { FaCrown, FaGem } from "react-icons/fa";
import {
  FiChevronDown,
  FiChevronUp,
  FiDollarSign,
  FiEdit2,
  FiMail,
  FiMapPin,
  FiPhone,
  FiPlus,
  FiSearch,
  FiShoppingBag,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

const CustomersPage = () => {
  // Sample customer data
  const [customers, setCustomers] = useState([
    {
      id: "CUST001",
      name: "Priya Sharma",
      email: "priya.s@gmail.com",
      phone: "+91 9876543210",
      joinDate: "2023-01-15",
      address: "Mumbai, Maharashtra",
      totalPurchases: 5,
      totalSpent: 325000,
      lastPurchase: "2023-11-20",
      loyaltyTier: "Gold",
      notes: "Prefers diamond jewelry, anniversary in June",
    },
    {
      id: "CUST002",
      name: "Rahul Patel",
      email: "rahul.patel@outlook.com",
      phone: "+91 8765432109",
      joinDate: "2022-08-22",
      address: "Ahmedabad, Gujarat",
      totalPurchases: 12,
      totalSpent: 875000,
      lastPurchase: "2023-11-15",
      loyaltyTier: "Platinum",
      notes: "Bulk buyer for weddings, prefers 22k gold",
    },
    {
      id: "CUST003",
      name: "Ananya Reddy",
      email: "ananya.r@gmail.com",
      phone: "+91 7654321098",
      joinDate: "2023-05-10",
      address: "Hyderabad, Telangana",
      totalPurchases: 2,
      totalSpent: 125000,
      lastPurchase: "2023-10-05",
      loyaltyTier: "Silver",
      notes: "New customer, interested in silver jewelry",
    },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  // UI state
  const [showForm, setShowForm] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  // Filter customers
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "high-value")
      return matchesSearch && customer.totalSpent > 300000;
    if (activeTab === "recent")
      return (
        matchesSearch &&
        new Date(customer.lastPurchase) >
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      );
    return matchesSearch;
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentCustomer) {
      // Update existing customer
      const updatedCustomers = customers.map((customer) =>
        customer.id === currentCustomer.id
          ? { ...customer, ...formData }
          : customer
      );
      setCustomers(updatedCustomers);
    } else {
      // Add new customer
      const newCustomer = {
        ...formData,
        id: `CUST${Math.floor(1000 + Math.random() * 9000)}`,
        joinDate: new Date().toISOString().split("T")[0],
        totalPurchases: 0,
        totalSpent: 0,
        lastPurchase: "",
        loyaltyTier: "New",
      };
      setCustomers([...customers, newCustomer]);
    }

    // Reset form
    setShowForm(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
    });
    setCurrentCustomer(null);
  };

  // Edit customer
  const handleEdit = (customer) => {
    setCurrentCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      notes: customer.notes,
    });
    setShowForm(true);
  };

  // Delete customer
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((customer) => customer.id !== id));
    }
  };

  // Add this function to your component, preferably with the other handler functions
const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Get loyalty tier icon and color
  const getLoyaltyBadge = (tier) => {
    switch (tier) {
      case "Platinum":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
            <FaCrown className="mr-1 text-gray-600" /> Platinum
          </span>
        );
      case "Gold":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
            <FaGem className="mr-1 text-amber-600" /> Gold
          </span>
        );
      case "Silver":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
            <FaGem className="mr-1 text-blue-600" /> Silver
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
            New
          </span>
        );
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header with tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Customer Management
            </h1>
            <p className="text-gray-600">
              Manage your valued jewelry customers
            </p>
          </div>

          <div className="flex gap-2">
            <button
              className="flex items-center bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 gap-2"
              onClick={() => setShowForm(true)}
            >
              <FiPlus size={18} /> Add Customer
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "all"
                ? "text-amber-600 border-b-2 border-amber-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Customers
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "high-value"
                ? "text-amber-600 border-b-2 border-amber-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("high-value")}
          >
            High Value
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "recent"
                ? "text-amber-600 border-b-2 border-amber-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("recent")}
          >
            Recent Buyers
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers by name, email or phone..."
              className="pl-10 w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {currentCustomer ? "Edit Customer" : "Add New Customer"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      rows="3"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setShowForm(false);
                    setCurrentCustomer(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  {currentCustomer ? "Update Customer" : "Add Customer"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Customers Table */}
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
                {filteredCustomers.map((customer) => (
                  <React.Fragment key={customer.id}>
                    <tr
                      className={`hover:bg-gray-50 ${
                        expandedRow === customer.id ? "bg-gray-50" : ""
                      }`}
                    >
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty state */}
        {filteredCustomers.length === 0 && (
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
        )}
      </div>
    </div>
  );
};

export default CustomersPage;
