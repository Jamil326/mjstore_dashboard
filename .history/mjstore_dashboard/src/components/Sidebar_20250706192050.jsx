import { Nav } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

export default function Sidebar({ closeSidebar }) {
  return (
    <div className="d-flex flex-column p-3 bg-light h-100">
      <div className="d-flex justify-content-between align-items-center mb-4 d-lg-none">
        <strong>Menu</strong>
        <button className="btn btn-outline-secondary" onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>
      <Nav className="flex-column">
        <Nav.Link href="/">Dashboard</Nav.Link>
        <Nav.Link href="/products">Products</Nav.Link>
        <Nav.Link href="/users">Users</Nav.Link>
        <Nav.Link href="/orders">Orders</Nav.Link>
        <Nav.Link href="/settings">Settings</Nav.Link>
      </Nav>
    </div>
  );
}
