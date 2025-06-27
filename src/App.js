import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Navbar from "./pages/NavBar";
import InventoryPage from "./pages/Inventory";
import { selectIsAuthenticated } from "./redux/userSlice";
import CustomersPage from "./pages/customer/CustomerPage";
import SalesDashboard from "./pages/sales/SalesDashboard";
import PostDetailsModern from "./pages/PostDetailsModern";
import { Dashboard } from "./pages/dashboard/Dashboard";
import ContactDetailsTable from "./pages/ContactDetails";


const ProtectedLayout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/PostDetails" element={<PostDetailsModern />} />
            <Route path="/ContactDetails" element={<ContactDetailsTable />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/customer" element={<CustomersPage />} />
        <Route path="/sales" element={<SalesDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;