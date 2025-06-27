import React, { useRef, useState } from "react";
import { FaCrown, FaGem } from "react-icons/fa";
import { FiPlus, FiSearch } from "react-icons/fi";
import CustomerForm from "./CustomerForm";
import CustomersTable from "./CustomerTable";
import EmptyState from "./EmptyState";

const CustomersPage = () => {
  // Sample customer data
  const [customers, setCustomers] = useState([
    {
      id: "CUST1001",
      name: "Priya Sharma",
      email: "priya.s@gmail.com",
      phone: "+91 9876543210",
      joinDate: "2023-01-15",
      address: "12, Marine Drive, Mumbai, Maharashtra - 400020",
      totalPurchases: 5,
      totalSpent: 325000,
      lastPurchase: "2023-11-20",
      loyaltyTier: "Gold",
      notes:
        "Prefers diamond jewelry, anniversary in June. Good potential for upsell.",
      purchaseHistory: [
        {
          id: "SALE2101",
          date: "2023-11-20",
          items: ["22K Gold Necklace (8.5g)", "Diamond Stud Earrings (0.5ct)"],
          amount: "₹1,10,500",
          status: "completed",
        },
        {
          id: "SALE1982",
          date: "2023-08-15",
          items: ["Custom Engagement Ring (1.2ct)"],
          amount: "₹95,000",
          status: "completed",
        },
      ],
      preferredCategories: ["Necklace", "Earrings"],
      preferredMetal: "Gold",
      birthDate: "1990-06-15",
      anniversaryDate: "2020-12-10",
    },
    {
      id: "CUST1002",
      name: "Rahul Patel",
      email: "rahul.patel@outlook.com",
      phone: "+91 8765432109",
      joinDate: "2022-08-22",
      address: "45, CG Road, Ahmedabad, Gujarat - 380009",
      totalPurchases: 12,
      totalSpent: 875000,
      lastPurchase: "2023-11-15",
      loyaltyTier: "Platinum",
      notes: "Bulk buyer for weddings. Prefers traditional 22k gold designs.",
      purchaseHistory: [
        {
          id: "SALE2105",
          date: "2023-11-15",
          items: [
            "Bridal Set (Necklace + Earrings + Bangles)",
            "Mens Gold Chain",
          ],
          amount: "₹2,45,000",
          status: "completed",
        },
      ],
      preferredCategories: ["Bridal Sets", "Chains"],
      preferredMetal: "Gold",
      birthDate: "1985-11-22",
    },
    {
      id: "CUST1003",
      name: "Ananya Reddy",
      email: "ananya.r@gmail.com",
      phone: "+91 7654321098",
      joinDate: "2023-05-10",
      address: "78, Jubilee Hills, Hyderabad, Telangana - 500033",
      totalPurchases: 2,
      totalSpent: 125000,
      lastPurchase: "2023-10-05",
      loyaltyTier: "Silver",
      notes:
        "New customer interested in silver jewelry. Potential for gold conversion.",
      purchaseHistory: [
        {
          id: "SALE2091",
          date: "2023-10-05",
          items: ["Silver Oxidized Necklace", "Silver Anklet"],
          amount: "₹32,500",
          status: "completed",
        },
      ],
      preferredCategories: ["Silver Jewelry"],
      preferredMetal: "Silver",
      birthDate: "1995-03-08",
    },
    {
      id: "CUST1004",
      name: "Vikram Mehta",
      email: "vikram.m@yahoo.com",
      phone: "+91 6543210987",
      joinDate: "2021-03-18",
      address: "23, Richmond Road, Bangalore, Karnataka - 560025",
      totalPurchases: 8,
      totalSpent: 420000,
      lastPurchase: "2023-09-12",
      loyaltyTier: "Gold",
      notes: "Collects antique jewelry. Interested in estate pieces.",
      purchaseHistory: [
        {
          id: "SALE2072",
          date: "2023-09-12",
          items: ["Antique Gold Pendant", "Vintage Ruby Ring"],
          amount: "₹1,75,000",
          status: "completed",
        },
      ],
      preferredCategories: ["Antique", "Vintage"],
      preferredMetal: "Gold",
      birthDate: "1978-12-03",
    },
    {
      id: "CUST1005",
      name: "Neha Kapoor",
      email: "neha.kapoor@icloud.com",
      phone: "+91 9432109876",
      joinDate: "2023-02-28",
      address: "56, Golf Links, New Delhi - 110003",
      totalPurchases: 3,
      totalSpent: 185000,
      lastPurchase: "2023-11-10",
      loyaltyTier: "Silver",
      notes: "Prefers modern minimalist designs. Follows jewelry trends.",
      purchaseHistory: [
        {
          id: "SALE2103",
          date: "2023-11-10",
          items: ["Diamond Solitaire Pendant", "Minimalist Gold Bangle"],
          amount: "₹92,500",
          status: "completed",
        },
      ],
      preferredCategories: ["Minimalist", "Contemporary"],
      preferredMetal: "Gold",
      birthDate: "1992-07-19",
      anniversaryDate: "2021-04-22",
    },
    {
      id: "CUST1006",
      name: "Arjun Singh",
      email: "arjun.singh@hotmail.com",
      phone: "+91 8321098765",
      joinDate: "2020-11-05",
      address: "34, Park Street, Kolkata, West Bengal - 700016",
      totalPurchases: 15,
      totalSpent: 1200000,
      lastPurchase: "2023-11-18",
      loyaltyTier: "Platinum",
      notes:
        "High-value customer. Buys jewelry as investments. Requires VIP treatment.",
      purchaseHistory: [
        {
          id: "SALE2110",
          date: "2023-11-18",
          items: ["5ct Diamond Ring", "Platinum Bracelet"],
          amount: "₹5,75,000",
          status: "completed",
        },
      ],
      preferredCategories: ["High-Value", "Investment Pieces"],
      preferredMetal: "Platinum",
      birthDate: "1975-09-30",
    },
    {
      id: "CUST1007",
      name: "Sunita Gupta",
      email: "sunitag@gmail.com",
      phone: "+91 7210987654",
      joinDate: "2022-06-14",
      address: "89, MG Road, Pune, Maharashtra - 411001",
      totalPurchases: 6,
      totalSpent: 275000,
      lastPurchase: "2023-10-28",
      loyaltyTier: "Gold",
      notes:
        "Prefers lightweight daily-wear jewelry. Interested in EMI options.",
      purchaseHistory: [
        {
          id: "SALE2098",
          date: "2023-10-28",
          items: ["Lightweight Gold Chain", "Small Diamond Studs"],
          amount: "₹68,000",
          status: "completed",
        },
      ],
      preferredCategories: ["Daily Wear", "Lightweight"],
      preferredMetal: "Gold",
      birthDate: "1988-04-12",
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
  const [showModal, setShowModal] = useState(false);
const fileInputRef = useRef();

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

  const handleBulkUpload = () => {
    // Generate and download sample file
    const sampleData = [
      ["Name", "Phone", "Email", "Address", "Preferred Metal", "Loyalty Tier"],
      // Add more sample rows as needed
    ];
    const csvContent = sampleData.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "customer_sample.csv";
    link.click();
  };

  // Delete customer
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((customer) => customer.id !== id));
    }
  };

  // Toggle row expansion
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center  mt-10 mb-4 gap-4">
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
              onClick={() => setShowModal(true)}
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
            <span className="flex items-center gap-2">
              All Customers
             {activeTab === "all" && <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-amber-500 rounded-full">
                {customers.length}
              </span>}
            </span>
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "high-value"
                ? "text-amber-600 border-b-2 border-amber-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("high-value")}
          >
            <span className="flex items-center gap-2">
              {" "}
              High Value
              {activeTab === "high-value" && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-amber-500 rounded-full">
                  {filteredCustomers.length}
                </span>
              )}
            </span>
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "recent"
                ? "text-amber-600 border-b-2 border-amber-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("recent")}
          >
            <span className="flex items-center gap-2">
              {" "}
              Recent Buyers
              {activeTab === "recent" && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-amber-500 rounded-full">
                  {filteredCustomers.length}
                </span>
              )}
            </span>
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
        {/* {showForm && (
          <CustomerForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            currentCustomer={currentCustomer}
            setShowForm={setShowForm}
          />
        )} */}

        {/* Customers Table or Empty State */}
        {filteredCustomers.length > 0 ? (
          <CustomersTable
            customers={filteredCustomers}
            expandedRow={expandedRow}
            toggleExpand={toggleExpand}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            getLoyaltyBadge={getLoyaltyBadge}
          />
        ) : (
          <EmptyState searchTerm={searchTerm} setShowForm={setShowForm} />
        )}
      </div>
      {showModal && (
  <CustomerForm
    formData={formData}
    handleInputChange={handleInputChange}
    handleSubmit={handleSubmit}
    currentCustomer={currentCustomer}
    onClose={() => setShowModal(false)}
    handleBulkUpload={handleBulkUpload}
    // handleFileChange={handleFileChange}
    fileInputRef={fileInputRef}
  />
)}
    </div>
  );
};

export default CustomersPage;
