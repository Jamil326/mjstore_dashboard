import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
// optional if you want custom styles

export default function Sidebar({ closeSidebar }) {
  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/products", label: "Products" },
    { to: "/users", label: "Users" },
    { to: "/orders", label: "Orders" },
    { to: "/admins", label: "Admins" },
    { to: "/assets", label: "Upload Assets" },
    { to: "/settings", label: "Settings" },
    { to: "/searchpage", label: "Search" },
  ];

  return (
    <div className="d-flex flex-column p-3 bg-light h-100 sidebar-content">
      {/* Mobile Close Button */}
      <div className="d-flex justify-content-between align-items-center mb-4 d-lg-none">
        <strong>Menu</strong>
        <button className="btn btn-outline-secondary" onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="nav flex-column">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active text-primary fw-bold' : 'text-dark'}`
            }
            onClick={closeSidebar} // auto-close sidebar on mobile
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
