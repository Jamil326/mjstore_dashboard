
// src/components/Sidebar.jsx
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="bg-light vh-100 p-3 border-end" style={{ width: '240px' }}>
      <h4 className="mb-4">Admin Panel</h4>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/admins">Admins</Nav.Link>
        <Nav.Link as={Link} to="/products">Products</Nav.Link>
        <Nav.Link as={Link} to="/users">Users</Nav.Link>
        <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
        <Nav.Link as={Link} to="/assets">Assets</Nav.Link>
        <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
      </Nav>
    </div>
  );
}
