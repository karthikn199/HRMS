import React, { useState } from "react";
import { FaCrown, FaGem, FaFileDownload, FaFileUpload, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  FiCalendar,
  FiDollarSign,
  FiHeart,
  FiMail,
  FiMapPin,
  FiPhone,
  FiPlus,
  FiShoppingBag,
  FiUser,
  FiX,
} from "react-icons/fi";

const CustomerForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  currentCustomer,
  onClose,
  handleBulkUpload,
  handleFileChange,
  fileInputRef,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "Basic Info", icon: <FiUser size={14} /> },
    { title: "Contact", icon: <FiPhone size={14} /> },
    { title: "Address", icon: <FiMapPin size={14} /> },
    { title: "Preferences", icon: <FaGem size={14} /> },
    { title: "Additional", icon: <FiShoppingBag size={14} /> },
  ];

  const nextStep = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {currentCustomer ? "Edit Customer" : "Add New Customer"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">
          {/* Stepper */}
          <div className="mb-6">
            <div className="flex justify-between relative">
              {/* Progress line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-amber-500 -z-10 transition-all duration-300"
                style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              ></div>

              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <button
                    onClick={() => setActiveStep(index)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index <= activeStep
                        ? "bg-amber-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step.icon}
                  </button>
                  <span
                    className={`text-xs mt-1 ${
                      index === activeStep ? "font-medium text-amber-600" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bulk upload section - only on first step */}
          {activeStep === 0 && (
            <div className="flex gap-2 mb-4">
              <label className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-sm cursor-pointer hover:bg-blue-100">
                <FaFileUpload size={14} />
                Bulk Upload
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".csv, .xlsx"
                  className="hidden"
                />
              </label>
              <button
                onClick={handleBulkUpload}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md text-sm hover:bg-gray-100"
              >
                <FaFileDownload size={14} />
                Download Sample
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {activeStep === 0 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Full Name*
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-2 py-1.5 border border-gray-200 rounded text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Birth Date
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className="w-full pl-8 pr-2 py-1.5 border border-gray-200 rounded text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Anniversary
                    </label>
                    <div className="relative">
                      <FiHeart className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="date"
                        name="anniversaryDate"
                        value={formData.anniversaryDate}
                        onChange={handleInputChange}
                        className="w-full pl-8 pr-2 py-1.5 border border-gray-200 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {activeStep === 1 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-2 py-1.5 border border-gray-200 rounded text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Phone Number*
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-2 py-1.5 border border-gray-200 rounded text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Alternate Phone
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="tel"
                      name="alternatePhone"
                      value={formData.alternatePhone}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-2 py-1.5 border border-gray-200 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Address Information */}
            {activeStep === 2 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Street Address
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-2 py-1.5 border border-gray-200 rounded text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Preferences */}
            {activeStep === 3 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Preferred Metal
                  </label>
                  <select
                    name="preferredMetal"
                    value={formData.preferredMetal}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm"
                  >
                    <option value="">Select Metal</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Platinum">Platinum</option>
                    <option value="Diamond">Diamond</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Preferred Categories
                  </label>
                  <select
                    name="preferredCategories"
                    value={formData.preferredCategories}
                    onChange={handleInputChange}
                    multiple
                    className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm h-auto"
                  >
                    <option value="Necklace">Necklace</option>
                    <option value="Ring">Ring</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Bracelet">Bracelet</option>
                    <option value="Bangle">Bangle</option>
                    <option value="Pendant">Pendant</option>
                    <option value="Chain">Chain</option>
                    <option value="Bridal">Bridal Sets</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Loyalty Tier
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      name="loyaltyTier"
                      value={formData.loyaltyTier}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm"
                    >
                      <option value="New">New</option>
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Platinum">Platinum</option>
                    </select>
                    {formData.loyaltyTier === "Platinum" && (
                      <FaCrown className="text-yellow-600 text-sm" />
                    )}
                    {formData.loyaltyTier === "Gold" && (
                      <FaGem className="text-yellow-400 text-sm" />
                    )}
                    {formData.loyaltyTier === "Silver" && (
                      <FaGem className="text-gray-400 text-sm" />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Additional Information */}
            {activeStep === 4 && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Total Purchases
                    </label>
                    <div className="relative">
                      <FiShoppingBag className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="number"
                        name="totalPurchases"
                        value={formData.totalPurchases}
                        onChange={handleInputChange}
                        className="w-full pl-8 pr-2 py-1.5 border border-gray-200 rounded text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Total Spent (₹)
                    </label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="number"
                        name="totalSpent"
                        value={formData.totalSpent}
                        onChange={handleInputChange}
                        className="w-full pl-8 pr-2 py-1.5 border border-gray-200 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Last Purchase Date
                  </label>
                  <div className="relative">
                    <FiCalendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="date"
                      name="lastPurchase"
                      value={formData.lastPurchase}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-2 py-1.5 border border-gray-200 rounded text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Special Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm"
                    rows="2"
                    placeholder="Allergies, special requests, gifting preferences..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    How did they hear about us?
                  </label>
                  <select
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm"
                  >
                    <option value="">Select Source</option>
                    <option value="Walk-in">Walk-in</option>
                    <option value="Referral">Customer Referral</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Advertisement">Advertisement</option>
                    <option value="Website">Website</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t mt-6">
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={activeStep === 0}
                  className={`px-3 py-1.5 flex items-center gap-1 rounded text-sm ${
                    activeStep === 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FaChevronLeft size={14} />
                  Previous
                </button>

                {activeStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-3 py-1.5 bg-amber-600 text-white rounded text-sm hover:bg-amber-700 flex items-center gap-1"
                  >
                    Next
                    <FaChevronRight size={14} />
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-amber-600 text-white rounded text-sm hover:bg-amber-700 flex items-center gap-1"
                    >
                      <FiPlus size={14} />
                      {currentCustomer ? "Update" : "Add Customer"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;