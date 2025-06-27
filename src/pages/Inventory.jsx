import React, { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiDownload,
  FiEdit2,
  FiFilter,
  FiPlus,
  FiPrinter,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";
import {
  GiDiamondRing,
  GiGemNecklace,
  GiGoldBar,
  GiRing,
} from "react-icons/gi";

const InventoryPage = () => {
  // Sample inventory data
  const [inventory, setInventory] = useState([
    {
      id: "JWL001",
      name: "22K Gold Necklace",
      category: "Necklace",
      metalType: "Gold",
      purity: "22K",
      weight: 8.5,
      stoneType: "Diamond",
      stoneWeight: 0.75,
      stoneCount: 12,
      makingCharge: 15,
      wastage: 2,
      barcode: "123456789012",
      costPrice: 52000,
      sellingPrice: 68000,
      stock: 3,
      image: "/jewelry/necklace1.jpg",
      lastUpdated: "2023-11-15",
      tags: ["Best Seller", "New Arrival"],
    },
    {
      id: "JWL002",
      name: "Diamond Engagement Ring",
      category: "Ring",
      metalType: "Gold",
      purity: "18K",
      weight: 3.2,
      stoneType: "Diamond",
      stoneWeight: 1.5,
      stoneCount: 1,
      makingCharge: 20,
      wastage: 3,
      barcode: "123456789013",
      costPrice: 85000,
      sellingPrice: 120000,
      stock: 2,
      image: "/jewelry/ring1.jpg",
      lastUpdated: "2023-11-10",
      tags: ["Engagement", "Premium"],
    },
    {
      id: "JWL003",
      name: "Silver Chain Bracelet",
      category: "Bracelet",
      metalType: "Silver",
      purity: "925",
      weight: 15.8,
      stoneType: "",
      stoneWeight: 0,
      stoneCount: 0,
      makingCharge: 10,
      wastage: 1,
      barcode: "123456789014",
      costPrice: 8500,
      sellingPrice: 12500,
      stock: 7,
      image: "/jewelry/bracelet1.jpg",
      lastUpdated: "2023-11-05",
      tags: ["Trending"],
    },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    metalType: "Gold",
    purity: "22K",
    weight: "",
    stoneType: "",
    stoneWeight: "",
    stoneCount: "",
    makingCharge: 15,
    wastage: 2,
    costPrice: "",
    sellingPrice: "",
    stock: 1,
    description: "",
    tags: [],
  });

  // UI state
  const [showForm, setShowForm] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [newTag, setNewTag] = useState("");

  // Filter inventory based on search and active tab
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode.includes(searchTerm);

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "low-stock") return matchesSearch && item.stock < 5;
    if (activeTab === "gold") return matchesSearch && item.metalType === "Gold";
    if (activeTab === "silver")
      return matchesSearch && item.metalType === "Silver";
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

    if (currentItem) {
      // Update existing item
      const updatedInventory = inventory.map((item) =>
        item.id === currentItem.id ? { ...formData, id: currentItem.id } : item
      );
      setInventory(updatedInventory);
    } else {
      // Add new item
      const newItem = {
        ...formData,
        id: `JWL${Math.floor(1000 + Math.random() * 9000)}`,
        barcode: Math.floor(
          100000000000 + Math.random() * 900000000000
        ).toString(),
        lastUpdated: new Date().toISOString().split("T")[0],
        image: "/jewelry/default.jpg",
      };
      setInventory([...inventory, newItem]);
    }

    // Reset form
    setShowForm(false);
    setFormData({
      name: "",
      category: "",
      metalType: "Gold",
      purity: "22K",
      weight: "",
      stoneType: "",
      stoneWeight: "",
      stoneCount: "",
      makingCharge: 15,
      wastage: 2,
      costPrice: "",
      sellingPrice: "",
      stock: 1,
      description: "",
      tags: [],
    });
    setCurrentItem(null);
  };

  // Edit item
  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      metalType: item.metalType,
      purity: item.purity,
      weight: item.weight,
      stoneType: item.stoneType,
      stoneWeight: item.stoneWeight,
      stoneCount: item.stoneCount,
      makingCharge: item.makingCharge,
      wastage: item.wastage,
      costPrice: item.costPrice,
      sellingPrice: item.sellingPrice,
      stock: item.stock,
      description: item.description || "",
      tags: item.tags || [],
    });
    setShowForm(true);
  };

  // Delete item
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setInventory(inventory.filter((item) => item.id !== id));
    }
  };

  // Toggle row expansion
  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Toggle item selection
  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    if (action === "delete") {
      if (window.confirm(`Delete ${selectedItems.length} items?`)) {
        setInventory(
          inventory.filter((item) => !selectedItems.includes(item.id))
        );
        setSelectedItems([]);
      }
    } else if (action === "export") {
      alert(`Exporting ${selectedItems.length} items`);
      // In a real app, you would implement actual export functionality
    }
  };

  // Add tag to form
  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  // Remove tag from form
  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  // Get icon for category
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Necklace":
        return <GiGemNecklace className="text-amber-500" />;
      case "Ring":
        return <GiDiamondRing className="text-amber-500" />;
      case "Bracelet":
        return <GiRing className="text-amber-500" />;
      default:
        return <GiGoldBar className="text-amber-500" />;
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header with tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4 mt-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Jewelry Inventory
            </h1>
            <p className="text-gray-600">Manage your stock with precision</p>
          </div>

          <div className="flex gap-2">
            <button
              className="flex items-center bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 gap-2"
              onClick={() => setShowForm(true)}
            >
              <FiPlus size={18} /> Add Item
            </button>
            {selectedItems.length > 0 && (
              <div className="flex gap-2">
                <button
                  className="flex items-center bg-white text-gray-700 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 gap-2"
                  onClick={() => handleBulkAction("export")}
                >
                  <FiDownload size={16} /> Export
                </button>
                <button
                  className="flex items-center bg-white text-red-600 px-3 py-2 rounded-lg border border-gray-200 hover:bg-red-50 gap-2"
                  onClick={() => handleBulkAction("delete")}
                >
                  <FiTrash2 size={16} /> Delete
                </button>
              </div>
            )}
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
            All Items
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "low-stock"
                ? "text-amber-600 border-b-2 border-amber-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("low-stock")}
          >
            Low Stock
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "gold"
                ? "text-amber-600 border-b-2 border-amber-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("gold")}
          >
            Gold
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "silver"
                ? "text-amber-600 border-b-2 border-amber-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("silver")}
          >
            Silver
          </button>
        </div>

        {/* Search and filters */}
        <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                className="pl-10 w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 gap-2">
              <FiFilter /> Advanced
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {currentItem ? "Edit Jewelry Item" : "Add New Jewelry Item"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700 border-b pb-2">
                    Basic Information
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Name*
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
                      Category*
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Necklace">Necklace</option>
                      <option value="Ring">Ring</option>
                      <option value="Bangle">Bangle</option>
                      <option value="Earring">Earring</option>
                      <option value="Pendant">Pendant</option>
                      <option value="Bracelet">Bracelet</option>
                      <option value="Chain">Chain</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      rows="2"
                    />
                  </div>
                </div>

                {/* Metal Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700 border-b pb-2">
                    Metal Information
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Metal Type*
                    </label>
                    <select
                      name="metalType"
                      value={formData.metalType}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      required
                    >
                      <option value="Gold">Gold</option>
                      <option value="Silver">Silver</option>
                      <option value="Platinum">Platinum</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Purity*
                    </label>
                    <select
                      name="purity"
                      value={formData.purity}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      required
                    >
                      <option value="24K">24K (99.9%)</option>
                      <option value="22K">22K (91.6%)</option>
                      <option value="18K">18K (75%)</option>
                      <option value="14K">14K (58.3%)</option>
                      <option value="925">Silver (92.5%)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (grams)*
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      required
                    />
                  </div>
                </div>

                {/* Stone Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700 border-b pb-2">
                    Stone Information
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stone Type
                    </label>
                    <select
                      name="stoneType"
                      value={formData.stoneType}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-lg"
                    >
                      <option value="">None</option>
                      <option value="Diamond">Diamond</option>
                      <option value="Ruby">Ruby</option>
                      <option value="Emerald">Emerald</option>
                      <option value="Sapphire">Sapphire</option>
                      <option value="Pearl">Pearl</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {formData.stoneType && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Stone Weight (carats)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          name="stoneWeight"
                          value={formData.stoneWeight}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Stone Count
                        </label>
                        <input
                          type="number"
                          name="stoneCount"
                          value={formData.stoneCount}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Pricing */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700 border-b pb-2">
                    Pricing
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Making Charge (%)*
                    </label>
                    <input
                      type="number"
                      name="makingCharge"
                      value={formData.makingCharge}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Wastage (%)*
                    </label>
                    <input
                      type="number"
                      name="wastage"
                      value={formData.wastage}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cost Price (₹)*
                    </label>
                    <input
                      type="number"
                      name="costPrice"
                      value={formData.costPrice}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Selling Price (₹)*
                    </label>
                    <input
                      type="number"
                      name="sellingPrice"
                      value={formData.sellingPrice}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      required
                    />
                  </div>
                </div>

                {/* Stock */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700 border-b pb-2">
                    Stock
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity in Stock*
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className="flex-1 p-2 border border-gray-200 rounded-lg"
                        placeholder="Add tag"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {formData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-amber-600 hover:text-amber-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setShowForm(false);
                    setCurrentItem(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  {currentItem ? "Update Item" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Modern compact table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-8 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="rounded text-amber-600 focus:ring-amber-500"
                      checked={
                        selectedItems.length === filteredInventory.length &&
                        filteredInventory.length > 0
                      }
                      onChange={() => {
                        if (selectedItems.length === filteredInventory.length) {
                          setSelectedItems([]);
                        } else {
                          setSelectedItems(
                            filteredInventory.map((item) => item.id)
                          );
                        }
                      }}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Metal
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weight
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInventory.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr
                      className={`hover:bg-gray-50 ${
                        expandedRow === item.id ? "bg-gray-50" : ""
                      }`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="rounded text-amber-600 focus:ring-amber-500"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleSelect(item.id)}
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            {getCategoryIcon(item.category)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          {item.metalType === "Gold" && (
                            <GiGoldBar className="text-amber-400" />
                          )}
                          {item.purity}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {item.weight}g
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ₹{item.sellingPrice.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          Cost: ₹{item.costPrice.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.stock > 5
                              ? "bg-green-100 text-green-800"
                              : item.stock > 0
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.stock} pcs
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="text-amber-600 hover:text-amber-800 p-1 rounded-full hover:bg-amber-50"
                            onClick={() => toggleExpand(item.id)}
                          >
                            {expandedRow === item.id ? (
                              <FiChevronUp />
                            ) : (
                              <FiChevronDown />
                            )}
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100"
                            onClick={() => handleEdit(item)}
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded row details */}
                    {expandedRow === item.id && (
                      <tr>
                        <td colSpan="7" className="px-4 py-3 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                Details
                              </h4>
                              <div className="space-y-1 text-sm">
                                <p>
                                  <span className="font-medium">Category:</span>{" "}
                                  {item.category}
                                </p>
                                {item.stoneType && (
                                  <p>
                                    <span className="font-medium">Stones:</span>{" "}
                                    {item.stoneType} ({item.stoneWeight}ct,{" "}
                                    {item.stoneCount}pcs)
                                  </p>
                                )}
                                <p>
                                  <span className="font-medium">Making:</span>{" "}
                                  {item.makingCharge}% + {item.wastage}% wastage
                                </p>
                                <p>
                                  <span className="font-medium">
                                    Last Updated:
                                  </span>{" "}
                                  {item.lastUpdated}
                                </p>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                Tags
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {item.tags?.map((tag) => (
                                  <span
                                    key={tag}
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {(!item.tags || item.tags.length === 0) && (
                                  <span className="text-xs text-gray-400">
                                    No tags
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-end justify-end gap-2">
                              <button
                                className="flex items-center text-gray-600 hover:text-gray-800 text-sm gap-1"
                                onClick={() =>
                                  alert(`Print barcode for ${item.id}`)
                                }
                              >
                                <FiPrinter size={14} /> Print Barcode
                              </button>
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
        {filteredInventory.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <GiDiamondRing className="mx-auto h-10 w-10 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No items found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm
                ? "Try adjusting your search"
                : "Get started by adding your first item"}
            </p>
            <div className="mt-4">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none"
              >
                <FiPlus className="-ml-0.5 mr-1.5 h-4 w-4" />
                Add Item
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryPage;
