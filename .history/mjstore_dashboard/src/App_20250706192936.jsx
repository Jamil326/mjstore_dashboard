import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SignupPage from './pages/SignupPage';
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SearchPage from './pages/SearchPage';
import AdminListPage from "./pages/AdminListPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import OrdersPage from "./pages/OrdersPage";
import ProductUpload from './pages/ProductUpload';
import UploadAssetsPage from "./pages/UploadAssetsPage";
import ProfileSettings from "./pages/ProfileSettings";
import axios from "axios";
import { Container } from "react-bootstrap";
import './App.css'; // optional, if needed for responsive tweaks

export default function App() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser({ token });
    }
  }, []);

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header user={user} setUser={setUser} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="d-flex flex-grow-1">
          {/* Sidebar */}
          <div className={`sidebar-wrapper ${sidebarOpen ? 'open' : ''}`}>
            <Sidebar closeSidebar={() => setSidebarOpen(false)} />
          </div>

          {/* Main Content */}
          <main className="flex-grow-1 p-3 bg-body">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/admins" element={<AdminListPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/assets" element={<ProductUpload />} />
              <Route path="/settings" element={<ProfileSettings />} />
              <Route path="/searchpage" element={<SearchPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
