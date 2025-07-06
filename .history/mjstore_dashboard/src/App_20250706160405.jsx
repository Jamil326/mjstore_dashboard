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
import { Container, Row, Col } from "react-bootstrap";

export default function App() {
  const [user, setUser] = useState(null);

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
      <Container fluid className="min-vh-100 d-flex flex-column p-0">
        <Row className="flex-nowrap g-0 flex-grow-1">
          <Col xs="auto" className="bg-light border-end">
            <Sidebar />
          </Col>
          <Col className="d-flex flex-column">
            <Header setUser={setUser} />
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
          </Col>
        </Row>
      </Container>
    </Router>
  );
}
